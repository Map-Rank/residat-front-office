/* istanbul ignore file */

import './assets/main.css'
import './assets/base.css'
import './assets/css/global.scss'
import VeeValidatePlugin from './plugins/validation'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useSectorStore from '@/stores/sectorStore.js'
import useAuthStore from '@/stores/auth.js'
import InlineSvg from 'vue-inline-svg'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import router from './router'
import { i18n } from '@/langs/i18nSetup'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { getFcmToken } from '@/firebaseConfig'
import dateFormat from './utils/dateFormat'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import 'leaflet/dist/leaflet.css'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'
import { openDB } from 'idb';

const app = createApp(App)

// Register plugins and components
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.use(i18n)
app.use(VueTheMask)
app.component('inline-svg', InlineSvg)
app.directive('date-format', dateFormat)

const vfm = createVfm()
app.use(vfm)

const toastOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover:
    false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
}
app.use(Toast,
  toastOptions)

const sectorStore = useSectorStore()
const authStore = useAuthStore()
sectorStore.initializeStore()
authStore.initializeAuthState()

// Register Service Worker and Notification Permission
if ('serviceWorker' in navigator && 'Notification' in window) {
  navigator.serviceWorker
    .register('/service-worker.js', { scope: '/' })
    .then((registration) => {
      // console.log('Service Worker registered with scope:', registration.scope)


      // Request notification permission if needed
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          // console.log(`Notification permission: ${permission}`)

        })
      }

      // Send auth token to Service Worker (handle both cases: controller exists and doesn't exist)
      const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
      if (authToken) {
        if (navigator.serviceWorker.controller) {
          // console.log('Sending authToken to Service Worker:', authToken)
          navigator.serviceWorker.controller.postMessage({
            action: 'setAuthToken',
            token: authToken
          })
        } else {
          // Handle the case where the controller is not yet active (e.g., first load)
          // console.log('Service Worker controller not yet active. Waiting...')
          registration.addEventListener('activate', (event) => {
            if (event.target.controller) {
              // console.log('Sending authToken to Service Worker after activation:', authToken)
              event.target.controller.postMessage({
                action: 'setAuthToken',
                token: authToken
              })
            }
          })
        }
      } else {
        // console.log('No authToken found in local storage.')
      }

      // Handle Service Worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { action } = event.data
        if (action === 'showLastNotification') {
          // console.log('Displaying last notification')
          // Implement logic to display the last notification using your UI components
        }
      })

      // Set up periodic notification check every 10 minutes
      setInterval(
        () => {
          navigator.serviceWorker.controller?.postMessage({ action: 'fetchNewNotifications' })
        },
        10 * 60 * 1000
      )
    })
    .catch((error) => console.error('Service Worker registration failed:', error))

  // Listen for push notifications
  navigator.serviceWorker.addEventListener('push', (event) => {
    const { title, content_en } = event.data.json()
    const options = {
      body: content_en,
      icon: '/assets/images/smile.png',
      badge: '/assets/images/smile.png'
    }

    if (Notification.permission === 'granted') {
      event.waitUntil(self.registration.showNotification(title, options))
    }
  })
}

navigator.serviceWorker.register('/service-worker.js')
  .then(registration => {
    // ... autres initialisations ...

    // Attendre que le service worker soit prêt avant d'envoyer le token
    registration.ready.then(registration => {
      const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken);
      registration.active.postMessage({
        action: 'setAuthToken',
        token: authToken
      });
    });
  });

// Initialize Firebase Cloud Messaging (FCM)
getFcmToken().then((token) => {
  // if (token) console.log('FCM token initialized.')
})

async function saveAuthToken() {
  const db = await openDB('authDB', 1, {
    upgrade(db) {
      db.createObjectStore('auth', { keyPath: 'key' });
    },
  });
  await db.put('auth', { key: 'token', value: localStorage.getItem('authToken') });
}

saveAuthToken();

app.mount('#app')

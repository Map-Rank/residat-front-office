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
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
}
app.use(Toast, toastOptions)

const sectorStore = useSectorStore()
const authStore = useAuthStore()
sectorStore.initializeStore()
authStore.initializeAuthState()

const NOTIFICATION_CHECK_INTERVAL = 10 * 60 * 1000 // 10 minutes

class ServiceWorkerManager {
  constructor() {
    this.registration = null
  }

  async init() {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
      console.warn('Service Worker or Notifications not supported')
      return
    }

    try {
      // Register service worker
      this.registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      })

      console.log('Service Worker registered with new scope:', this.registration.scope)

      // Check for updates immediately after registration
      await this.registration.update()

      await this.setupNotifications()
      this.setupAuthToken()
      this.setupMessageHandlers()
      this.setupPeriodicCheck()
      this.setupPushHandlers()

      // Handle service worker updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration.installing
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Notify user of update and reload
            if (confirm('New version available! Would you like to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' })
              window.location.reload()
            }
          }
        })
      })
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }

  async setupNotifications() {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      console.log(`Notification permission: ${permission}`)
    }
  }

  setupAuthToken() {
    const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
    if (authToken && navigator.serviceWorker.controller) {
      console.log('Setting auth token in service worker')
      navigator.serviceWorker.controller.postMessage({
        action: 'setAuthToken',
        token: authToken
      })
    }
  }

  setupMessageHandlers() {
    navigator.serviceWorker.addEventListener('message', (event) => {
      const { action } = event.data
      switch (action) {
        case 'showLastNotification':
          console.log('Displaying last notification')
          break
        // Add other message handlers here
        default:
          console.log('Unknown message action:', action)
      }
    })
  }

  setupPeriodicCheck() {
    setInterval(() => {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          action: 'fetchNewNotifications'
        })
      }
    }, NOTIFICATION_CHECK_INTERVAL)
  }

  setupPushHandlers() {
    navigator.serviceWorker.addEventListener('push', (event) => {
      if (!event.data) return

      try {
        const { title, content_en } = event.data.json()
        const options = {
          body: content_en,
          icon: '/assets/images/smile.png',
          badge: '/assets/images/smile.png',
          timestamp: Date.now()
        }

        if (Notification.permission === 'granted') {
          event.waitUntil(this.registration.showNotification(title, options))
        }
      } catch (error) {
        console.error('Error processing push notification:', error)
      }
    })
  }
}

const swManager = new ServiceWorkerManager()
swManager.init().catch((error) => {
  console.error('Failed to initialize Service Worker Manager:', error)
})

// Register Service Worker and Notification Permission
// if ('serviceWorker' in navigator && 'Notification' in window) {
//   navigator.serviceWorker
//     .register('/service-worker.js', { scope: '/' })
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope)
//       const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
//       console.log('appel set before ' + authToken)

//       // Request notification permission
//       if (Notification.permission === 'default') {
//         Notification.requestPermission().then((permission) => {
//           console.log(`Notification permission: ${permission}`)
//         })
//       }

//       // Send auth token to Service Worker
//       // const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
//       console.log('appel set before ' + authToken)

//       if (authToken && navigator.serviceWorker.controller) {
//         console.log('appel set token ' + authToken)

//         navigator.serviceWorker.controller.postMessage({
//           action: 'setAuthToken',
//           token: authToken
//         })
//       }

//       // Handle Service Worker messages
//       navigator.serviceWorker.addEventListener('message', (event) => {
//         const { action } = event.data
//         if (action === 'showLastNotification') {
//           console.log('Displaying last notification')
//         }
//       })

//       // Set up periodic notification check every 10 minutes
//       setInterval(
//         () => {
//           navigator.serviceWorker.controller?.postMessage({ action: 'fetchNewNotifications' })
//         },
//         10 * 60 * 1000
//       )
//     })
//     .catch((error) => console.error('Service Worker registration failed:', error))

//   // Listen for push notifications
//   navigator.serviceWorker.addEventListener('push', (event) => {
//     const { title, content_en } = event.data.json()
//     const options = {
//       body: content_en,
//       icon: '/assets/images/smile.png',
//       badge: '/assets/images/smile.png'
//     }

//     if (Notification.permission === 'granted') {
//       event.waitUntil(self.registration.showNotification(title, options))
//     }
//   })
// }

// Initialize Firebase Cloud Messaging (FCM)
getFcmToken().then((token) => {
  if (token) console.log('FCM token initialized.')
})

app.mount('#app')

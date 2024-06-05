import './assets/main.css'
import './assets/base.css'
import './assets/css/global.scss'
import VeeValidatePlugin from './plugins/validation'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useSectorStore from '@/stores/sectorStore.js'
import useAuthStore from '@/stores/auth.js'
import InlineSvg from 'vue-inline-svg'
// import useEventStore from './stores/eventStore.js'
import App from './App.vue'
import router from './router'
import { i18n } from '@/langs/i18nSetup'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { app as firebaseApp, analytics } from './firebase/firebaseConfig'; 

const app = createApp(App)

// Register InlineSvg globally
app.component('inline-svg', InlineSvg)
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.use(i18n)


const options = {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

app.use(Toast, options);

const sectorStore = useSectorStore()
sectorStore.initializeStore()

const authStore = useAuthStore()
authStore.initializeAuthState()

app.mount('#app')




  

  

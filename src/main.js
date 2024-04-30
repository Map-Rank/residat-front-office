import './assets/main.css'
import './assets/base.css'
import './assets/css/global.scss'
import VeeValidatePlugin from './plugins/validation'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useSectorStore from '@/stores/sectorStore.js'
import useAuthStore from '@/stores/auth.js'
import InlineSvg from 'vue-inline-svg';
// import useEventStore from './stores/eventStore.js'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Register InlineSvg globally
app.component('inline-svg', InlineSvg);

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)

const sectorStore = useSectorStore()
sectorStore.initializeStore()

const authStore = useAuthStore()
authStore.initializeAuthState()


app.mount('#app')

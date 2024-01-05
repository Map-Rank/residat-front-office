import './assets/main.css'
import './assets/base.css'
import './assets/css/global.scss'
import VeeValidatePlugin from './plugins/validation'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import useSectorStore from '@/stores/sectorStore.js'
import useAuthStore from '@/stores/auth.js'
import useZoneStore from '@/stores/zoneStore.js'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin )

const sectorStore = useSectorStore()
sectorStore.initializeStore()

const zoneStore = useZoneStore()
zoneStore.initializeStore()

const authStore = useAuthStore()
authStore.initializeAuthState()

app.mount('#app')

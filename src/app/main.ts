import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'

import './assets/styles/index.scss'
import { httpPlugin } from '@/shared/http'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(ToastService)

app.use(httpPlugin)

app.mount('#app')

import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import { httpPlugin } from '@/shared/http'

import 'primeicons/primeicons.css'

import './assets/styles/index.scss'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(httpPlugin)

app.mount('#app')

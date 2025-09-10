import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'

import 'primeicons/primeicons.css'

import './assets/styles/main.css'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.mount('#app')

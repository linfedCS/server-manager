import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'

import './assets/styles/index.scss'
import { httpPlugin } from '@/shared/http'

import App from './App.vue'

const app = createApp(App)

app.use(VueQueryPlugin)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(ToastService)

app.use(httpPlugin)

app.mount('#app')

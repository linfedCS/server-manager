import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { Ripple } from 'primevue'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import './assets/styles/index.scss'
import { createApp } from 'vue'

import { router } from '@/modules/router'
import { httpPlugin } from '@/shared/http'

import App from './App.vue'

const app = createApp(App)

app.use(VueQueryPlugin)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.directive('ripple', Ripple)

app.use(ToastService)
app.use(httpPlugin)
app.use(router)

app.mount('#app')

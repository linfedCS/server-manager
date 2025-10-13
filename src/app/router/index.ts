import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/cs-servers',
        name: 'CsServers',
        component: () => import('@/pages/CsServers/ui/index.vue')
    },
    {
        path: '/teamspeak',
        name: 'TeamSpeak',
        component: () => import('@/pages/TeamSpeak/ui/index.vue'),
        alias: '/'
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

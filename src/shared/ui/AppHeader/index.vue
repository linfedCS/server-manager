<template>
    <header class="header">
        <Menubar :model="items">
            <template #item="{ item, props }">
                <RouterLink
                    v-if="item.route"
                    v-slot="{ href, navigate }"
                    :to="{ name: item.route }"
                    custom
                >
                    <a
                        v-ripple
                        :href="href"
                        v-bind="props.action"
                        :class="{ active: item.active }"
                        @click="navigate"
                    >
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </RouterLink>
            </template>
        </Menubar>
    </header>
</template>

<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem'

import { Menubar } from 'primevue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const items = computed<MenuItem[]>(() => {
    return [
        {
            label: 'TeamSpeak',
            icon: 'pi pi-microphone',
            route: 'TeamSpeak'
        },
        {
            label: 'CS сервера',
            icon: 'pi pi-server',
            route: 'CsServers'
        },
        {
            label: 'Crosshair',
            icon: 'pi pi-circle',
            route: 'CrosshairGenerator'
        }
    ].map(r => ({ ...r, active: route.name === r.route }))
})
</script>

<style lang="scss">
.header {
    --p-icon-size: 14px;

    display: flex;
    justify-content: center;
    font-size: 14px;
    padding: 16px;

    .active {
        color: var(--p-menubar-item-focus-color);
        background: var(--p-menubar-item-focus-background);
        border-radius: var(--p-menubar-base-item-border-radius);
    }
}
</style>

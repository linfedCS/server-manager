<template>
    <main class="main">
        <div class="container">
            <AppHeading
                :level="2"
                class="main__heading"
                has-line
                uppercase
            >
                Сервера
            </AppHeading>

            <div class="main__servers">
                <ServerCard
                    v-for="server in servers"
                    :key="server.id"
                    :server="server"
                />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CSServer } from '@/entities/Server'

import { ServerCard } from '@/features/ServerCard'
import { AppHeading } from '@/shared/ui'

const servers = ref<CSServer[]>([
    {
        id: 1,
        name: 'Server 1',
        status: 'enabled',
        ip: '127.0.0.1',
        port: 28012,
        map: 'de_mirage',
        players_current: 10,
        players_max: 16
    },
    {
        id: 2,
        name: 'Server 2',
        status: 'disabled'
    },
    {
        id: 3,
        name: 'Server 3',
        status: 'enabled',
        ip: '127.0.0.1',
        port: 28012,
        map: 'de_mirage',
        players_current: 10,
        players_max: 16
    }
])
</script>

<style lang="scss">
.main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__heading {
        width: 100%;
    }

    &__servers {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 40px;
    }
}
</style>

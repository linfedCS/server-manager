<template>
    <main
        v-if="isFetched"
        class="main"
    >
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

    <Teleport to="body">
        <Toast />
    </Teleport>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import Toast from 'primevue/toast'

import type { CSServer } from '@/entities/Server'

import { useServer } from '@/entities/Server'
import { ServerCard } from '@/features/ServerCard'
import { AppHeading } from '@/shared/ui'

const { getServers } = useServer()

const { isFetched, data: servers } = useQuery<CSServer[]>({
    queryKey: ['servers'],
    queryFn: getServers
})
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

    @include media('<desktop') {
        &__servers {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include media('<tablet') {
        &__servers {
            grid-template-columns: 1fr;
        }
    }
}
</style>

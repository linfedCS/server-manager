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
                    :on-start-server="onStartServer"
                    :on-stop-server="onStopServer"
                    :is-start-loading="isStartLoading"
                    :is-stop-loading="isStopLoading"
                />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useServer } from '@/entities/Server'
import { ServerCard } from '@/features/ServerCard'
import { AppHeading } from '@/shared/ui'

const { servers, onStartServer, onStopServer, isStartLoading, isStopLoading } = useServer(true)
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

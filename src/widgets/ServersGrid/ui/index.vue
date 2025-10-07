<template>
    <div class="servers">
        <AppHeading
            :level="2"
            class="servers__heading"
            has-line
            uppercase
        >
            Сервера
        </AppHeading>

        <div class="servers-grid servers__grid">
            <template v-if="loading">
                <Skeleton
                    v-for="i in 3"
                    :key="i"
                    width="100%"
                    height="350px"
                    border-radius="12px"
                />
            </template>

            <template v-else>
                <ServerCard
                    v-for="server in servers"
                    :key="server.server_id"
                    :server="server"
                />
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Skeleton } from 'primevue'

import type { CSServer } from '@/entities/Server'

import { ServerCard } from '@/features/Server'
import { AppHeading } from '@/shared/ui'

const { servers, loading } = defineProps<{
    servers?: CSServer[]
    loading?: boolean
}>()
</script>

<style lang="scss">
.servers {
    &__heading {
        width: 100%;
    }

    &__grid {
        margin-top: 40px;
    }
}

.servers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @include media('<desktop') {
        grid-template-columns: repeat(2, 1fr);
    }

    @include media('<tablet') {
        grid-template-columns: 1fr;
    }
}
</style>

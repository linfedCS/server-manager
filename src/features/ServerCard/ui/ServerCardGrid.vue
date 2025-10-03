<template>
    <div class="servers-grid">
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
</template>

<script lang="ts" setup>
import { Skeleton } from 'primevue'

import type { CSServer } from '@/entities/Server'

import ServerCard from '@/features/ServerCard/ui/ServerCard.vue'

const { servers, loading } = defineProps<{
    servers?: CSServer[]
    loading?: boolean
}>()
</script>

<style lang="scss">
.servers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;

    @include media('<desktop') {
        grid-template-columns: repeat(2, 1fr);
    }

    @include media('<tablet') {
        grid-template-columns: 1fr;
    }
}
</style>

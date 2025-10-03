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

        <div class="servers__grid">
            <ServerCard
                v-for="server in servers"
                :key="server.server_id"
                :server="server"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'

import type { CSServer } from '@/entities/Server'

import { useServer } from '@/entities/Server'
import ServerCard from '@/features/ServerCard/ui/ServerCard.vue'
import { AppHeading } from '@/shared/ui'

const { getServers } = useServer()

const { data: servers } = useQuery<CSServer[]>({
    queryKey: ['servers'],
    queryFn: getServers
})
</script>

<style lang="scss">
.servers {
    &__heading {
        width: 100%;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 40px;
    }

    @include media('<desktop') {
        &__grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @include media('<tablet') {
        &__grid {
            grid-template-columns: 1fr;
        }
    }
}
</style>

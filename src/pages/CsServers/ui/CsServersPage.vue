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

        <ServersGrid
            :servers
            :loading="isLoading"
        />
    </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'

import type { CSServer } from '@/entities/Server'

import { getServers } from '@/entities/Server'
import { ServersGrid } from '@/features/Server'
import { AppHeading } from '@/shared/ui'

const { data: servers, isLoading } = useQuery<CSServer[]>({
    queryKey: ['servers'],
    queryFn: getServers
})
</script>

<style lang="scss">
.servers {
    &__heading {
        width: 100%;
    }
}
</style>

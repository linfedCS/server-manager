<template>
    <ServersGrid
        :servers
        :loading="isLoading"
    />
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'

import type { CSServer } from '@/entities/Server'

import { getServers } from '@/entities/Server'
import { ServersGrid } from '@/widgets/ServersGrid'

const { data: servers, isLoading } = useQuery<CSServer[]>({
    queryKey: ['servers'],
    queryFn: getServers
})
</script>

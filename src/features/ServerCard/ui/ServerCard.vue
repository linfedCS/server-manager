<template>
    <Card class="server-card">
        <template #header>
            <SkeletonImage
                :src="imageSrc"
                class="server-card__header-image"
            />
        </template>

        <template #title>{{ server.name }}</template>

        <template #content>
            <ServerCardInfo
                v-if="isServerOnline(server)"
                :server
            />
        </template>

        <template #footer>
            <div class="server-card__footer">
                <div class="server-card__actions">
                    <Button
                        v-if="server.status === 'offline'"
                        icon="pi pi-play"
                        size="small"
                        label="Запустить сервер"
                        style="width: 100%"
                        :loading="startServerMutation.isPending.value"
                        @click="startServerMutation.mutate({ server_id: server.server_id })"
                    />

                    <template v-if="isServerOnline(server)">
                        <Button
                            icon="pi pi-cog"
                            size="small"
                            severity="secondary"
                            @click="isSettingsVisible = true"
                        />

                        <Button
                            icon="pi pi-power-off"
                            severity="secondary"
                            size="small"
                            :loading="stopServerMutation.isPending.value"
                            @click="stopServerMutation.mutate({ server_id: server.server_id })"
                        />
                    </template>
                </div>

                <ServerIp
                    v-if="isServerOnline(server)"
                    :ip="server.ip"
                    :port="server.port"
                />
            </div>
        </template>
    </Card>

    <ServerSettings
        v-if="isServerOnline(server)"
        v-model:visible="isSettingsVisible"
        :server
    />
</template>

<script lang="ts" setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { computed, ref } from 'vue'

import type { CSMap } from '@/entities/Map/model/types'
import type { CSServer } from '@/entities/Server'

import { getMaps } from '@/entities/Map/api'
import { isServerOnline } from '@/entities/Server'
import { onStartServer, onStopServer } from '@/entities/Server/api/server'
import ServerCardInfo from '@/features/ServerCard/ui/ServerCardInfo.vue'
import ServerSettings from '@/features/ServerSettings/ui/ServerSettings.vue'
import { ServerIp, SkeletonImage } from '@/shared/ui'

const props = defineProps<{
    server: CSServer
}>()

const isSettingsVisible = ref(false)

const queryClient = useQueryClient()

const { data: maps } = useQuery<CSMap[]>({
    queryKey: ['maps'],
    queryFn: getMaps
})

const startServerMutation = useMutation({
    mutationFn: onStartServer,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['servers'] })
    }
})

const stopServerMutation = useMutation({
    mutationFn: onStopServer,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['servers'] })
    }
})

const imageSrc = computed(() => {
    if (isServerOnline(props.server)) {
        const map_id = props.server.map_id
        return `/images/maps/${maps.value?.find(map => map.map_id === map_id)?.name}.jpg`
    }

    return '/images/maps/placeholder.jpg'
})
</script>

<style lang="scss">
.server-card {
    --p-card-body-gap: 20px;

    overflow: hidden;

    &__header-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__actions {
        display: flex;
        gap: 4px;
        width: 100%;
    }

    .p-card {
        &-body {
            height: 100%;
        }

        &-footer {
            margin-top: auto;
        }

        &-content {
            height: 100%;
        }
    }
}
</style>

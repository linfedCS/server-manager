<template>
    <Card class="server-card">
        <template #header>
            <img
                alt="user header"
                :src="imageSrc"
                class="server-card__header-image"
            />
        </template>

        <template #title>{{ server.name }}</template>

        <template #content>
            <ServerCardInfo
                v-if="server.status === 'online'"
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
                        @click="startServerMutation.mutate(server.id)"
                    />

                    <template v-if="server.status === 'online'">
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
                            @click="stopServerMutation.mutate(server.id)"
                        />
                    </template>
                </div>

                <ServerIp
                    v-if="server.status === 'online'"
                    :ip="server.ip"
                    :port="server.port"
                />
            </div>
        </template>
    </Card>

    <ServerSettings
        v-if="server.status === 'online'"
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

import { useMap } from '@/entities/Map'
import { useServer } from '@/entities/Server'
import ServerCardInfo from '@/features/ServerCard/ui/ServerCardInfo.vue'
import ServerSettings from '@/features/ServerCard/ui/ServerSettings.vue'
import { ServerIp } from '@/shared/ui'

const props = defineProps<{
    server: CSServer
}>()

const isSettingsVisible = ref(false)

const { getMaps } = useMap()

const queryClient = useQueryClient()

const { data: maps } = useQuery<CSMap[]>({
    queryKey: ['maps'],
    queryFn: getMaps
})

const { onStartServer, onStopServer } = useServer()

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
    if (props.server.status === 'offline') {
        return '/images/maps/placeholder.jpg'
    }

    const map_id = props.server.map_id
    return `/images/maps/${maps.value?.find(map => map.id === map_id)?.name}.jpg`
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

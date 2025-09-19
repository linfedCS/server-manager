<template>
    <Card class="server-card">
        <template #header>
            <img
                alt="user header"
                :src="server.status === 'offline' ? '/images/maps/placeholder.jpg' : '/images/maps/de_mirage.jpeg'"
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
                        :loading="isStartLoading"
                        @click="onStartServerHandler"
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
                            :loading="isStopLoading"
                            @click="onStopServerHandler"
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
import Button from 'primevue/button'
import Card from 'primevue/card'
import { ref } from 'vue'

import type { CSServer } from '@/entities/Server'

import { useServer } from '@/entities/Server'
import ServerCardInfo from '@/features/ServerCard/ui/ServerCardInfo.vue'
import ServerSettings from '@/features/ServerCard/ui/ServerSettings.vue'
import { ServerIp } from '@/shared/ui'

const props = defineProps<{
    server: CSServer
}>()

const emit = defineEmits<{
    (e: 'update:server', server: CSServer): void
}>()

const isSettingsVisible = ref(false)

const { onStartServer, onStopServer, isStartLoading, isStopLoading } = useServer()

const onStartServerHandler = async () => {
    const response = await onStartServer(props.server.id)
    emit('update:server', response?.data ?? props.server)
}

const onStopServerHandler = async () => {
    const response = await onStopServer(props.server.id)
    emit('update:server', response?.data ?? props.server)
}
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

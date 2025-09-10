<template>
    <Card class="server-card">
        <template #header>
            <img
                alt="user header"
                src="/images/maps/de_mirage.jpeg"
                class="server-card__header-image"
            />
        </template>

        <template #title>{{ server.name }}</template>

        <template #content>
            <ServerCardInfo
                v-if="server.status === 'enabled'"
                :server
            />
        </template>

        <template #footer>
            <div class="server-card__footer">
                <div class="server-card__actions">
                    <Button
                        v-if="server.status === 'disabled'"
                        icon="pi pi-play"
                        size="small"
                        label="Запустить сервер"
                        style="width: 100%"
                    />

                    <Button
                        v-if="server.status === 'enabled'"
                        icon="pi pi-power-off"
                        severity="secondary"
                        size="small"
                    />
                </div>

                <ServerIp
                    v-if="server.status === 'enabled'"
                    :ip="server.ip"
                    :port="server.port"
                />
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Card from 'primevue/card'

import type { CSServer } from '@/entities/Server'

import ServerCardInfo from '@/features/ServerCard/ServerCardInfo.vue'
import { ServerIp } from '@/shared/ui'

defineProps<{
    server: CSServer
}>()
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

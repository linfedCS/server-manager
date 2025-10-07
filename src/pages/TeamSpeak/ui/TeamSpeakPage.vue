<template>
    <div class="ts">
        <Skeleton
            v-if="!treeNodes.length"
            width="300px"
            height="500px"
            border-radius="6px"
            :style="{ margin: '0 auto' }"
        />

        <template v-else>
            <span class="ts-url">Адрес сервера: linfed.ru</span>

            <Tree
                :value="treeNodes"
                class="ts-tree"
                :expanded-keys="expandedKeys"
            >
                <template #default="{ node }">
                    {{ node.key }}
                </template>
            </Tree>

            <div class="ts-actions">
                <!-- <Button
                    type="button"
                    label="Создать комнату"
                    size="small"
                    class="ts-actions__item"
                /> -->

                <Button
                    type="button"
                    label="Подключиться"
                    size="small"
                    severity="secondary"
                    as="a"
                    href="ts3server://linfed.ru"
                    class="ts-actions__item"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { TreeNode } from 'primevue/treenode'

import { Button, Skeleton, Tree } from 'primevue'
import { computed, onMounted, ref } from 'vue'

import type { TSMonitoringItem } from '@/entities/TeamSpeak/model/types'

import { WSS_API_URL } from '@/shared/http/config'

const treeNodes = ref<TreeNode[]>([])

const expandedKeys = computed(() => {
    return treeNodes.value.reduce<Record<string, boolean>>((acc, item) => {
        acc[item.key] = true
        return acc
    }, {})
})

function connect() {
    const socket = new WebSocket(`${WSS_API_URL}/ts3/monitoring`)

    socket.onclose = () => {
        // eslint-disable-next-line no-console
        console.log('Disconnected. Reconnecting in 3s...')
        setTimeout(connect, 3000)
    }

    socket.onerror = err => console.error('Socket error:', err)

    socket.onmessage = result => {
        const data: TSMonitoringItem[] = JSON.parse(result.data).data

        const newNodes = data.map<TreeNode>(channel => ({
            key: channel.channel_name,
            icon: 'pi pi-globe',
            children: channel.client_nickname.map(client => ({
                key: client,
                icon: 'pi pi-user'
            }))
        }))

        treeNodes.value.splice(0, treeNodes.value.length, ...newNodes)
    }

    return socket
}

onMounted(connect)
</script>

<style lang="scss">
.ts {
    width: fit-content;
    margin: 0 auto;
}

.ts-url {
    display: block;
    text-align: center;
    margin-bottom: 8px;
}

.ts-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;

    &__item {
        width: 100%;
    }
}

.ts-tree {
    --p-icon-size: 14px;

    width: fit-content;
    max-width: 600px;
    min-width: 300px;
    border-radius: var(--p-form-field-border-radius);
    font-size: 14px;

    .p-tree-node-icon {
        margin-right: 4px;
    }
}
</style>

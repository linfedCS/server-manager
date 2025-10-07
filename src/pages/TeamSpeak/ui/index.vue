<template>
    <TeamSpeakMonitoring :nodes="treeNodes" />
</template>

<script lang="ts" setup>
import type { TreeNode } from 'primevue/treenode'

import { onMounted, ref } from 'vue'

import type { TSMonitoringItem } from '@/entities/TeamSpeak/model/types'

import { WSS_API_URL } from '@/shared/http/config'
import { TeamSpeakMonitoring } from '@/widgets/TeamSpeakMonitoring'

const treeNodes = ref<TreeNode[]>([])

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

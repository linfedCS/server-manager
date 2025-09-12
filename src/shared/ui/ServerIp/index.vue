<template>
    <div
        class="server-ip"
        @click="copyToClipboard(`${ip}:${port}`)"
    >
        <span>{{ ip }}:{{ port }}</span>
        <i class="pi pi-copy" />
    </div>
</template>

<script lang="ts" setup>
import { useCopy } from '@/shared/composables/useCopy'

defineProps<{
    ip: string
    port: number
}>()

const { copyToClipboard } = useCopy()
</script>

<style lang="scss">
.server-ip {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}
</style>

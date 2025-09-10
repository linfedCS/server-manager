<template>
    <div class="server-ip">
        <span>{{ ip }}:{{ port }}</span>
        <i class="pi pi-copy" />
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    ip: string
    port: number
}>()
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

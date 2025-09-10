<template>
    <ul class="server-info">
        <li
            v-for="item in data"
            :key="item.title"
            class="server-info__item"
        >
            <span>{{ item.title }}:</span>
            <span>{{ item.value }}</span>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import type { CSServerEnabled } from '@/entities/Server'

const props = defineProps<{
    server: CSServerEnabled
}>()

const data = computed(() => {
    return [
        { title: 'Карта', value: props.server.map },
        { title: 'Онлайн', value: `${props.server.players_current}/${props.server.players_max}` }
    ]
})
</script>

<style lang="scss">
.server-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    margin: 0;
    opacity: 0.5;

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>

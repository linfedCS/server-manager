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
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import type { CSServerEnabled } from '@/entities/Server'

import { useMapStore } from '@/entities/Map'

const props = defineProps<{
    server: CSServerEnabled
}>()

const mapStore = useMapStore()
const { maps } = storeToRefs(mapStore)

const data = computed(() => {
    return [
        { title: 'Карта', value: maps.value.find(map => map.id === props.server.map_id)?.name ?? 'Неизвестно' },
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

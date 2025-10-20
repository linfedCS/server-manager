<template>
    <div class="cg-wrapper">
        <Slider
            v-model="model"
            :min
            :max
            class="cg-wrapper__slider"
            :step="0.1"
        />
        <InputNumber
            v-model="model"
            :min
            :max
            class="cg-wrapper__input"
            size="small"
        />
    </div>
</template>

<script lang="ts" setup>
import { InputNumber, Slider } from 'primevue'

defineProps<{
    min: number
    max: number
}>()

const model = defineModel<number>()
</script>

<style lang="scss">
.cg-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;

    &__slider {
        width: 100%;
    }
}
</style>

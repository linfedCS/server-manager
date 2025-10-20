<template>
    <div class="label-wrapper">
        <label
            class="label-wrapper__text"
            :for="id"
        >
            {{ text }}:
        </label>

        <div
            :id
            class="label-wrapper__el"
            :style="fluidElement && 'width: 100%'"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    id: string
    text: string
    fluidElement?: boolean
}>()
</script>

<style lang="scss">
.label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
        margin-right: 24px;
        flex-shrink: 0;
    }
}
</style>

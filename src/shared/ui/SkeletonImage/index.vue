<template>
    <div class="skeleton-image">
        <Skeleton
            v-if="!loaded"
            width="100%"
            height="100%"
        />

        <img
            v-show="loaded"
            :src="src"
            @load="onLoad"
        />
    </div>
</template>

<script lang="ts" setup>
import { Skeleton } from 'primevue'
import { ref } from 'vue'

const { src } = defineProps<{
    src: string
}>()

const loaded = ref(false)

const onLoad = () => {
    loaded.value = true
}
</script>

<style lang="scss">
.skeleton-image {
    img {
        all: inherit;
    }
}
</style>

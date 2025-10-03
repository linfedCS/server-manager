<template>
    <AppHeader />

    <main class="main">
        <div class="container">
            <RouterView />
        </div>
    </main>

    <Teleport to="body">
        <Toast />
    </Teleport>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'

import { AppHeader } from '@/shared/ui'
</script>

<style lang="scss">
.main {
    margin-top: 32px;
}
</style>

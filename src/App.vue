<template>
    <main class="main">
        <div class="container">
            <AppHeading
                :level="2"
                class="main__heading"
                has-line
                uppercase
            >
                Сервера
            </AppHeading>

            <div class="main__servers">
                <ServerCard />
                <ServerCard />
                <ServerCard />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import ServerCard from './components/ServerCard/index.vue'
import AppHeading from './components/shared/AppHeading.vue'
</script>

<style lang="scss">
.main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__heading {
        width: 100%;
    }

    &__servers {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-top: 40px;
    }
}
</style>

<template>
    <Card class="server-card">
        <template #header>
            <img
                alt="user header"
                src="/images/maps/de_mirage.jpeg"
                class="server-card__header-image"
            />
        </template>

        <template #title>Advanced Card</template>

        <template #content>
            <ul class="server-card__list">
                <li
                    v-for="item in data"
                    :key="item.title"
                    class="server-card__list-item"
                >
                    <span>{{ item.title }}:</span>
                    <span>{{ item.value }}</span>
                </li>
            </ul>
        </template>

        <template #footer>
            <div class="server-card__footer">
                <div class="server-card__actions">
                    <Button
                        icon="pi pi-play"
                        size="small"
                    />
                    <Button
                        icon="pi pi-power-off"
                        severity="secondary"
                        size="small"
                    />
                </div>

                <div class="server-card__ip">
                    <span>linfed.ru:28012</span>
                    <i class="pi pi-copy" />
                </div>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Card from 'primevue/card'

interface ServerData {
    title: string
    value: string | number
}

const data: ServerData[] = [
    { title: 'Карта', value: 'de_mirage' },
    { title: 'Игроков', value: 10 },
    { title: 'Версия', value: '1.0.0' },
    { title: 'Онлайн', value: '13/16' }
]
</script>

<style lang="scss">
.server-card {
    --p-card-body-gap: 20px;

    overflow: hidden;

    &__header-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 0;
        margin: 0;
        opacity: 0.5;
    }

    &__list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__actions {
        display: flex;
        gap: 4px;
    }

    &__ip {
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
    }
}
</style>

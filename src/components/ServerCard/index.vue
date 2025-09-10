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
          class="server-card__list-item"
          v-for="item in data"
          :key="item.title"
        >
          <span>{{ item.title }}:</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="server-card__footer">
        <div class="server-card__actions">
          <Button icon="pi pi-play" size="small" />
          <Button icon="pi pi-power-off" severity="secondary" size="small" />
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
  import Card from "primevue/card";
  import Button from "primevue/button";

  const data: Record<"title" | "value", string | number> = [
    { title: "Карта", value: "de_mirage" },
    { title: "Игроков", value: 10 },
    { title: "Версия", value: "1.0.0" },
    { title: "Онлайн", value: "13/16" },
  ];
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

<!-- <template>
  <div class="server-card">
    <header class="server-card__heading">
      <i class="pi pi-server" style="color: #ff3838; font-size: 20px" />
      <AppHeading :level="4" class="server-card__heading-title">
        Practice 1
      </AppHeading>
    </header>

    <ul class="server-card__list">
      <li class="server-card__list-item" v-for="item in data" :key="item.title">
        <span class="server-card__list-item-title">{{ item.title }}:</span>
        <span class="server-card__list-item-value">{{ item.value }}</span>
      </li>
    </ul>

    <footer class="server-card__footer">
      <div class="server-card__actions">
        <button class="server-card__actions-button">
          <i class="pi pi-play" style="color: #ff3838; font-size: 20px" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import AppHeading from "../shared/AppHeading.vue";

  const data: Record<"title" | "value", string | number> = [
    { title: "Карта", value: "de_mirage" },
    { title: "Игроков", value: 10 },
    { title: "Версия", value: "1.0.0" },
    { title: "Онлайн", value: "13/16" },
  ];
</script>

<style lang="scss">
  .server-card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #3a3a3a;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    }

    &__heading {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    &__heading-title {
      margin: 0;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0;
      margin: 0;
    }

    &__list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
  }
</style> -->

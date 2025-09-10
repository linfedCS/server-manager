<template>
  <component
    :is="`h${level}`"
    class="app-heading"
    :class="[`level-${level}`, { 'has-line': hasLine, uppercase }]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
  const { level, hasLine, uppercase } = defineProps<{
    level: 1 | 2 | 3 | 4 | 5 | 6;
    hasLine?: boolean;
    uppercase?: boolean;
  }>();
</script>

<style lang="scss">
  .app-heading {
    font-weight: 600;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0;

    &.uppercase {
      text-transform: uppercase;
    }

    &.has-line {
      margin-bottom: 20px;

      &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        width: 60px;
        height: 4px;
        background-color: #ff3838;
        margin-left: auto;
        margin-right: auto;
      }
    }

    &.level-1 {
      font-size: 40px;
      letter-spacing: 0.05em;
    }

    &.level-2 {
      font-size: 32px;
      letter-spacing: 0.05em;
    }

    &.level-3 {
      font-size: 24px;
    }

    &.level-4 {
      font-size: 20px;
    }

    &.level-5 {
      font-size: 18px;
    }

    &.level-6 {
      font-size: 16px;
    }
  }
</style>

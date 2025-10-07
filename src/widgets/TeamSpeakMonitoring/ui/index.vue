<template>
    <div class="ts">
        <Skeleton
            v-if="!nodes.length"
            width="300px"
            height="500px"
            border-radius="6px"
            :style="{ margin: '0 auto' }"
        />

        <template v-else>
            <span class="ts-url">Адрес сервера: linfed.ru</span>

            <Tree
                :value="nodes"
                class="ts-tree"
                :expanded-keys="expandedKeys"
            >
                <template #default="{ node }">
                    {{ node.key }}
                </template>
            </Tree>

            <div class="ts-actions">
                <TeamSpeakCreateChannel />

                <Button
                    type="button"
                    label="Подключиться"
                    size="small"
                    severity="secondary"
                    as="a"
                    href="ts3server://linfed.ru"
                    class="ts-actions__item"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { TreeNode } from 'primevue/treenode'

import { Button, Skeleton, Tree } from 'primevue'
import { computed } from 'vue'

import { TeamSpeakCreateChannel } from '@/features/TeamSpeak'

const props = defineProps<{
    nodes: TreeNode[]
}>()

const expandedKeys = computed(() => {
    return props.nodes.reduce<Record<string, boolean>>((acc, item) => {
        acc[item.key] = true
        return acc
    }, {})
})
</script>

<style lang="scss">
.ts {
    width: fit-content;
    margin: 0 auto;
}

.ts-url {
    display: block;
    text-align: center;
    margin-bottom: 8px;
}

.ts-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;

    &__item {
        width: 100%;
    }
}

.ts-tree {
    --p-icon-size: 14px;

    width: fit-content;
    max-width: 600px;
    min-width: 300px;
    border-radius: var(--p-form-field-border-radius);
    font-size: 14px;

    .p-tree-node-icon {
        margin-right: 4px;
    }
}
</style>

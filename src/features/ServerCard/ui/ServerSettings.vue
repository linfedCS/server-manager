<template>
    <Dialog
        v-model:visible="visible"
        modal
        header="Настройки сервера"
        class="server-settings"
    >
        <Select
            v-model="serverSettingsForm.map_id"
            :options="maps"
            option-label="name"
            option-value="id"
            fluid
            placeholder="Карта"
        />

        <div class="server-settings__actions">
            <Button
                type="button"
                label="Закрыть"
                size="small"
                severity="secondary"
                @click="visible = false"
            ></Button>

            <Button
                type="button"
                label="Сохранить"
                size="small"
                @click="visible = false"
            ></Button>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { Select } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

import type { CSMap } from '@/entities/Server'

import { useServerSettings } from '@/entities/Server'

const visible = defineModel<boolean>('visible')

const { serverSettingsForm } = useServerSettings()

const maps = ref<CSMap[]>([
    { id: 0, name: 'de_mirage' },
    { id: 1, name: 'de_overpass' },
    { id: 2, name: 'de_dust2' }
])
</script>

<style lang="scss">
.server-settings {
    width: 100%;
    max-width: 600px;

    &__actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 16px;
    }
}
</style>

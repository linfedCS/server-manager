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
import { storeToRefs } from 'pinia'
import { Select } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

import { useMapStore } from '@/entities/Map'
import { useServerSettings } from '@/entities/Server'

// const props = defineProps<{
//     server: CSServerEnabled
// }>()

const visible = defineModel<boolean>('visible')

const { serverSettingsForm } = useServerSettings()

const mapStore = useMapStore()
const { maps } = storeToRefs(mapStore)
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

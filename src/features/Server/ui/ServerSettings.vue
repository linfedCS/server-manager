<template>
    <Dialog
        v-model:visible="visible"
        modal
        header="Настройки сервера"
        class="server-settings"
    >
        <Select
            v-model="settingsForm.map_id"
            :options="maps"
            option-label="name"
            option-value="map_id"
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
                :loading="serverSettingsMutation.isPending.value"
                @click="serverSettingsMutation.mutate(settingsForm)"
            ></Button>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { Select } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { reactive } from 'vue'

import type { CSServerOnline, CSServerSettings } from '@/entities/Server'

import { getMaps } from '@/entities/Map/api'
import { changeServerSettings } from '@/entities/Server'

const props = defineProps<{
    server: CSServerOnline
}>()

const visible = defineModel<boolean>('visible')

const settingsForm = reactive<CSServerSettings>({
    server_id: props.server.server_id,
    map_id: props.server.map_id
})

const queryClient = useQueryClient()

const serverSettingsMutation = useMutation({
    mutationFn: changeServerSettings,
    onSuccess: () => {
        visible.value = false
        queryClient.invalidateQueries({ queryKey: ['servers'] })
    }
})

const { data: maps } = useQuery({
    queryKey: ['maps'],
    queryFn: getMaps
})
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

<template>
    <Button
        type="button"
        label="Создать комнату"
        size="small"
        class="ts-actions__item"
        @click="visible = true"
    />

    <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        header="Создать комнату"
        class="ts-create-channel"
    >
        <Form @submit="createChannelMutation.mutate(form)">
            <FloatLabel variant="on">
                <InputText
                    id="channel_name"
                    v-model="form.channel_name"
                    fluid
                    required
                />

                <label for="channel_name">Название канала</label>
            </FloatLabel>

            <FloatLabel variant="on">
                <InputText
                    id="channel_pass"
                    v-model="form.channel_pass"
                    fluid
                />

                <label for="channel_pass">Пароль канала (необязательно)</label>
            </FloatLabel>

            <Button
                type="submit"
                label="Создать"
                size="small"
                :loading="createChannelMutation.isPending.value"
            ></Button>
        </Form>
    </Dialog>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms'
import { useMutation } from '@tanstack/vue-query'
import { Button, Dialog, FloatLabel, InputText } from 'primevue'
import { reactive, ref } from 'vue'

import type { TSCreateChannelBody } from '@/entities/TeamSpeak'

import { createChannel } from '@/entities/TeamSpeak'

const visible = ref(false)

const form = reactive<TSCreateChannelBody>({
    channel_name: ''
})

const createChannelMutation = useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
        visible.value = false
        form.channel_name = ''
        form.channel_pass = ''
    }
})
</script>

<style lang="scss">
.ts-create-channel {
    min-width: 500px;

    .p-form {
        padding-top: 4px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}
</style>

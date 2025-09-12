import { useClipboard } from '@vueuse/core'
import { useToast } from 'primevue'

export const useCopy = () => {
    const { copy, isSupported } = useClipboard()
    const toast = useToast()

    const copyToClipboard = async (copiedText: string) => {
        if (!isSupported.value) {
            toast.add({
                severity: 'error',
                summary: 'Ошибка при добавлении в буфер обмена',
                detail: 'Ваш браузер не поддерживает копирование в буфер обмена',
                life: 3000
            })
            return
        }

        await copy(copiedText)

        toast.add({
            severity: 'secondary',
            summary: 'Скопировано в буфер обмена',
            life: 3000
        })
    }

    return {
        copyToClipboard
    }
}

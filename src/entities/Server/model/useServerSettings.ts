import { reactive } from 'vue'

import type { CSServerSettings } from '@/entities/Server/model/types'

export const useServerSettings = () => {
    const serverSettingsForm = reactive<CSServerSettings>({
        map_id: 0
    })

    return {
        serverSettingsForm
    }
}

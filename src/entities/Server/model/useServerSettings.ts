import type { CSServerSettingsUpdate } from '@/entities/Server/model/types'

import { useHttp } from '@/shared/http'

export const useServerSettings = () => {
    const http = useHttp()

    const changeServerSettings = async (form: CSServerSettingsUpdate) => {
        try {
            const response = await http.post('server/settings', {
                json: { ...form }
            })

            return response
        } catch (err) {
            console.error(err)
        }
    }

    return {
        changeServerSettings
    }
}

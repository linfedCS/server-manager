import type { CSServerSettingsUpdate, CSServerSettingsUpdateResponse } from '@/entities/Server'

import http from '@/shared/http'

export const changeServerSettings = async (form: CSServerSettingsUpdate) => {
    try {
        const response = await http.post<CSServerSettingsUpdateResponse>('server/settings', form)
        return response
    } catch (err) {
        console.error(err)
    }
}

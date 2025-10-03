import type { CSMap } from '@/entities/Map/model/types'

import http from '@/shared/http'

export const useMap = () => {
    const getMaps = async () => {
        const response = await http.get<CSMap[]>('maps')
        return response
    }

    return {
        getMaps
    }
}

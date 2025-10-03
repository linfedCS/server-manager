import type { CSMap } from '@/entities/Map/model/types'

import { useHttp } from '@/shared/http'

export const useMap = () => {
    const http = useHttp()

    const getMaps = async () => {
        const response = await http.get<CSMap[]>('maps')
        return response.json()
    }

    return {
        getMaps
    }
}

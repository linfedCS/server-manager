import type { CSMap } from '@/entities/Server'

import http from '@/shared/http'

export const getMaps = async () => {
    const response = await http.get<CSMap[]>('maps')
    return response
}

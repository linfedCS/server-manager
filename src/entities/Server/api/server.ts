import type { CSServer, CSServerStartBody, CSServerStopBody } from '@/entities/Server'

import http from '@/shared/http'

export const getServers = async () => {
    const response = await http.get<CSServer[]>('servers')
    return response
}

export const onStartServer = async (body: CSServerStartBody) => {
    try {
        const response = await http.post<CSServer>(`server-start`, body)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const onStopServer = async (body: CSServerStopBody) => {
    try {
        const response = await http.post<CSServer>(`server-stop`, body)
        return response
    } catch (error) {
        console.error(error)
    }
}

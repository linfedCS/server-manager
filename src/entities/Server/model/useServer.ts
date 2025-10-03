import type { CSServer, CSServerStartBody, CSServerStopBody } from '@/entities/Server/model/types'

import http from '@/shared/http'

export const useServer = () => {
    const getServers = async () => {
        const response = await http.get<CSServer[]>('servers')
        return response
    }

    const onStartServer = async (body: CSServerStartBody) => {
        try {
            const response = await http.post<CSServer>(`server-start`, body)

            return response
        } catch (error) {
            console.error(error)
        }
    }

    const onStopServer = async (body: CSServerStopBody) => {
        try {
            const response = await http.post<CSServer>(`server-stop`, body)
            return response
        } catch (error) {
            console.error(error)
        }
    }

    return {
        getServers,
        onStartServer,
        onStopServer
    }
}

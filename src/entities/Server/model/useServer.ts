import type { CSServer, CSServerStartBody, CSServerStopBody } from '@/entities/Server/model/types'

import { useHttp } from '@/shared/http'

export const useServer = () => {
    const http = useHttp()

    const getServers = async () => {
        const response = await http.get<CSServer[]>('servers')
        return response.json()
    }

    const onStartServer = async (body: CSServerStartBody) => {
        try {
            const response = await http
                .post(`server-start`, {
                    json: body
                })
                .json<CSServer>()

            return response
        } catch (error) {
            console.error(error)
        }
    }

    const onStopServer = async (body: CSServerStopBody) => {
        try {
            const response = await http
                .post(`server-stop`, {
                    json: body
                })
                .json<CSServer>()

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

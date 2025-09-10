import { useHttp } from '@/shared/http'

export const useServer = () => {
    const http = useHttp()

    const getServers = async () => {
        const response = await http.get('servers')
        return response.json()
    }

    return {
        getServers
    }
}

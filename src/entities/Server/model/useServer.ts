import { onMounted, ref } from 'vue'

import type { CSServer } from '@/entities/Server/model/types'

import { useHttp } from '@/shared/http'

export const useServer = (fetchOnMounted = false) => {
    const http = useHttp()
    const servers = ref<CSServer[]>([])

    const isStartLoading = ref(false)
    const isStopLoading = ref(false)

    const getServers = async () => {
        const response = await http.get('servers')
        return response.json<CSServer[]>()
    }

    const onStartServer = async (id: number) => {
        isStartLoading.value = true

        try {
            const response = await http
                .post(`server-start`, {
                    json: { id }
                })
                /** TODO: неверный тип ответа */
                .json<CSServer>()

            return response
        } catch (error) {
            console.error(error)
        } finally {
            isStartLoading.value = false
        }
    }

    const onStopServer = async (id: number) => {
        isStopLoading.value = true

        try {
            const response = await http
                .post(`server-stop`, {
                    json: { id }
                })
                /** TODO: неверный тип ответа */
                .json<CSServer>()

            return response
        } catch (error) {
            console.error(error)
        } finally {
            isStopLoading.value = false
        }
    }

    onMounted(async () => {
        if (fetchOnMounted) {
            servers.value = await getServers()
        }
    })

    return {
        getServers,
        servers,
        onStartServer,
        onStopServer,
        isStartLoading,
        isStopLoading
    }
}

import ky from 'ky'

import type { HttpClient } from '@/shared/http/model'

const api = ky.create({
    retry: {
        limit: 0
    },
    timeout: 15_000,
    prefixUrl: 'https://dev.linfed.ru/api' // TODO: в env переменную
})

const http: HttpClient = {
    get<T>(url: string, options: any) {
        return api.get(url, options).json<T>()
    },
    post<T>(url: string, json?: any, options?: any) {
        return api.post(url, { json, ...options }).json<T>()
    }
}

export default http

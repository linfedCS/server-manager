import type { KyInstance } from 'ky'
import type { FunctionPlugin } from 'vue'

import ky from 'ky'

import { setHttp } from './useHttp'

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: KyInstance
    }
}

export const httpPlugin: FunctionPlugin = app => {
    const httpInstance = ky.extend({
        retry: {
            limit: 0
        },
        timeout: 15_000,
        prefixUrl: 'https://dev.linfed.ru/api' // TODO: в env переменную
    })

    app.config.globalProperties.$http = httpInstance

    setHttp(app, httpInstance)
}

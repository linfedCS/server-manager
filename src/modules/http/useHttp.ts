import type { KyInstance } from 'ky'
import type { App } from 'vue'

import { inject } from 'vue'

const key = Symbol('http')

export function useHttp() {
    return inject<KyInstance>(key)!
}

export function setHttp(app: App, http: KyInstance) {
    app.provide(key, http)
}

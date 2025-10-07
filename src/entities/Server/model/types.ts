import type { components, paths } from '@/shared/openapi'

export type CSMap = components['schemas']['MapItem']
export type CSServerOffline = components['schemas']['ServerOffline']
export type CSServerOnline = components['schemas']['ServerOnline']
export type CSServer = CSServerOnline | CSServerOffline
export type CSServerSettingsUpdate = components['schemas']['ServerSettingsRequest']
export type CSServerSettingsUpdateResponse = paths['/api/server/settings']['post']['responses']['200']['content']['application/json']
export type CSServerSettings = Exclude<CSServerSettingsUpdate, 'map_id'>
export type CSServerStartBody = paths['/api/server-start']['post']['requestBody']['content']['application/json']
export type CSServerStopBody = paths['/api/server-stop']['post']['requestBody']['content']['application/json']

/** Type Guards */
export function isServerOnline(server: CSServer): server is CSServerOnline {
    return server.status === 'online'
}

export function isServerOffline(server: CSServer): server is CSServerOffline {
    return server.status === 'offline'
}

import type { CSMap } from '@/entities/Map/model/types'

interface CSServerBase {
    id: number
    name: CSMap['name']
    status: 'online' | 'offline'
}

export interface CSServerDisabled extends CSServerBase {
    status: 'offline'
}

export interface CSServerEnabled extends CSServerBase {
    status: 'online'
    ip: string
    port: number
    map_id: CSMap['id']
    players_current: number
    players_max: number
}

export type CSServer = CSServerEnabled | CSServerDisabled

export interface CSServerSettings {
    map_id: CSMap['id']
}

export interface CSServerSettingsUpdate extends CSServerSettings {
    id: CSServer['id']
}

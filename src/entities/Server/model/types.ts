interface CSServerBase {
    id: number
    name: string
    status: 'online' | 'offline'
}

export interface CSServerDisabled extends CSServerBase {
    status: 'offline'
}

export interface CSServerEnabled extends CSServerBase {
    status: 'online'
    ip: string
    port: number
    map: string
    players_current: number
    players_max: number
}

export type CSServer = CSServerEnabled | CSServerDisabled

export interface CSMap {
    id: number
    name: string
}

export interface CSServerSettings {
    map_id: CSMap['id']
}

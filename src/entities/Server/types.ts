interface CSServerBase {
    id: number
    name: string
    status: 'enabled' | 'disabled'
}

export interface CSServerDisabled extends CSServerBase {
    status: 'disabled'
}

export interface CSServerEnabled extends CSServerBase {
    status: 'enabled'
    ip: string
    port: number
    map: string
    players_current: number
    players_max: number
}

export type CSServer = CSServerEnabled | CSServerDisabled

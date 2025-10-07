import type { components } from '@/shared/openapi'

export type TSMonitoringItem = components['schemas']['Ts3MonitoringResponse']['data'][number]

export type TSCreateChannelBody = components['schemas']['Ts3NewChannelRequest']
export type TSCreateChannelResponse = components['schemas']['Ts3NewChannelResponse']

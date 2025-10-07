import type { TSCreateChannelBody, TSCreateChannelResponse } from '@/entities/TeamSpeak/model'

import http from '@/shared/http'

export const createChannel = async (body: TSCreateChannelBody) => {
    try {
        const response = await http.post<TSCreateChannelResponse>('ts3/newchannel', body)
        return response
    } catch (err) {
        console.error(err)
    }
}

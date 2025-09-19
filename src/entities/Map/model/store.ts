import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { CSMap } from '@/entities/Map/model/types'

import { useHttp } from '@/shared/http'

export const useMapStore = defineStore('map', () => {
    const maps = ref<CSMap[]>([])

    const http = useHttp()

    const getMaps = async () => {
        const response = await http.get('maps')
        maps.value = await response.json<CSMap[]>()
    }

    return {
        maps,
        getMaps
    }
})

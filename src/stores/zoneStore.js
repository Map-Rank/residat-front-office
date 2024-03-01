import { defineStore } from 'pinia'
import { getZones } from '../services/zoneService'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

export default defineStore('zone', {
  state: () => ({
    zones: null
  }),

  getters: {
    getAllZones(state) {
      return state.zones
    }
  },
  actions: {
    async initializeStore() {
      try {
        let zonesData = localStorage.getItem(LOCAL_STORAGE_KEYS.zone)
        
        if (zonesData) {
          this.zones = JSON.parse(zonesData)
        } else {
            const response = await getZones()
            this.zones = response
            localStorage.setItem(LOCAL_STORAGE_KEYS.zone, JSON.stringify(this.zones))
            console.log('complete zone initialisation')
        }
      } catch (error) {
        console.error("Error initializing zone store:", error)
      }
    }

  }
})

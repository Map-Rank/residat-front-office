import { defineStore } from 'pinia'
import { getSectors } from '../services/sectorService'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

export default defineStore('sector', {
  state: () => ({
    sectors: null
  }),

  getters: {
    getAllSectors(state) {
      return state.sectors
    }
  },
  actions: {
    async initializeStore() {
      try {
        let sectorsData = localStorage.getItem(LOCAL_STORAGE_KEYS.sector)
        
        if (sectorsData) {
          this.sectors = JSON.parse(sectorsData)
        } else {
            const response = await getSectors()
            this.sectors = response
            localStorage.setItem(LOCAL_STORAGE_KEYS.sector, JSON.stringify(this.sectors))
        }
      } catch (error) {
        console.error("Error initializing sector store:", error)
      }
    }

  }
})

// src/stores/dashboard.js
import { defineStore } from 'pinia'
import { GEOSPACIAL_DATA } from '@/constants/geospacialData.js'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    zoneId: 1,
    parentId: null,
    zoneName: '',
    mapSize: '',
    latitude: GEOSPACIAL_DATA.cameroonLatitude, // Default Latitude (e.g., Far North Cameroon)
    longitude: GEOSPACIAL_DATA.cameroonLongitude, // Default Longitude
    zoomIndex: GEOSPACIAL_DATA.cameroonZoomIndex // Default Zoom Level
  }),
  actions: {
    setDashboardParams(params) {
      this.zoneId = params.zoneId !== undefined ? params.zoneId : this.zoneId
      this.parentId = params.parentId !== undefined ? params.parentId : this.parentId
      this.zoneName = params.zoneName || this.zoneName
      this.mapSize = params.mapSize || this.mapSize
      this.latitude = params.latitude !== undefined ? params.latitude : this.latitude
      this.longitude = params.longitude !== undefined ? params.longitude : this.longitude
      this.zoomIndex = params.zoomIndex !== undefined ? params.zoomIndex : this.zoomIndex

      console.log('Dashboard Parameters Updated:', {
        zoneId: this.zoneId,
        parentId: this.parentId,
        zoneName: this.zoneName,
        mapSize: this.mapSize,
        latitude: this.latitude,
        longitude: this.longitude,
        zoomIndex: this.zoomIndex
      })
    },
    resetDashboardParams() {
      this.zoneId = 1
      this.parentId = null
      this.zoneName = ''
      this.mapSize = ''
      this.latitude = 10.0
      this.longitude = 13.0
      this.zoomIndex = 5
    }
  }
})

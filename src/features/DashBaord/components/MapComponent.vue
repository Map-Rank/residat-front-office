<template>
  <div>
    <div id="map" style="height: 100vh"></div>
    <!-- Dynamically show info-box when a region is selected -->
    <div class="info-box" v-if="showInfo">
      <!-- Data binding and event handling -->
    </div>
  </div>
</template>

<script>
import { getZones, getSpecificMapZones } from '@/services/zoneService'
import L from 'leaflet'

export default {
  name: 'MapComponent',

  props: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    zoomIndex: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      map: null,
      showInfo: false,
      selectedRegion: {},
      cameroonLayer: null,
      regionLayer: null,  // To manage individual region layers
      cachedZones: null,
      clickedZone: null
    }
  },

  mounted() {
    this.initializeMap()
  },

  methods: {
    async initializeMap() {
      try {
        // Fetch and cache zones if not already cached
        if (!this.cachedZones) {
          this.cachedZones = await getZones(2, null)
        }

        // Initialize map
        this.map = L.map('map').setView([this.latitude, this.longitude], this.zoomIndex)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map)

        // Load main Cameroon GeoJSON layer on mount
        await this.loadCameroonGeoJson()
      } catch (error) {
        console.error('Error initializing the map:', error)
      }
    },

    async loadCameroonGeoJson() {
      try {
        const response = await fetch('/assets/maps/National_Region.json')
        if (!response.ok) {
          throw new Error('Error loading the Cameroon GeoJSON file.')
        }

        const cameroonGeoJSON = await response.json()

        // Add the GeoJSON layer to the map
        this.cameroonLayer = L.geoJSON(cameroonGeoJSON, {
          style: { color: 'black', fillColor: 'yellow', fillOpacity: 0, weight: 1 },
          onEachFeature: (feature, layer) => {
            layer.on('click', async () => {
              console.log(`Clicked on region: ${feature.properties.name || 'unknown'}`)
              // Fetch and load region-specific GeoJSON
              await this.loadRegionGeoJson(feature.properties.name)
            })

            layer.on('mouseover', () => {
              layer.setStyle({ fillColor: 'blue', fillOpacity: 0.2 })
              layer._path.style.cursor = 'pointer'
              layer.bindTooltip(`<b>${feature.properties.name || 'unknown'}</b>`, {
                permanent: true,
                direction: 'top',
                offset: [0, -10]
              }).openTooltip()
            })

            layer.on('mouseout', () => {
              layer.setStyle({ fillColor: 'yellow', fillOpacity: 0 })
              layer._path.style.cursor = ''
              layer.closeTooltip()
            })
          }
        }).addTo(this.map)

        // Fit the map bounds to the Cameroon layer
        const bounds = this.cameroonLayer.getBounds()
        // this.map.fitBounds(bounds)
      } catch (error) {
        console.error('Failed to load Cameroon GeoJSON:', error)
      }
    },

    async loadRegionGeoJson(regionName) {
      try {
        if (this.regionLayer) {
          this.map.removeLayer(this.regionLayer)  // Remove previous region layer if exists
        }

        // Fetch the GeoJSON for the selected region
        this.clickedZone = await getSpecificMapZones(1, regionName, 1, 1)

        if (this.clickedZone.length == 0 || this.clickedZone[0].geojson == "") {
return
}

        const regionGeoJSON = await fetch(this.clickedZone[0].geojson)
        const regionData = await regionGeoJSON.json()

        // Add the new region layer to the map
        this.regionLayer = L.geoJSON(regionData, {
          style: { color: 'black', fillColor: 'yellow', fillOpacity: 0, weight: 1 },
          onEachFeature: (feature, layer) => {
            layer.on('click', async () => {
              console.log(`Clicked on sub-region: ${feature.properties.name || 'unknown'}`)
              // You can load the subdivision GeoJSON here
          // await this.loadSubRegionGeoJson(feature.properties.name)
            })

            layer.on('mouseover', () => {
              layer.setStyle({ fillColor: 'blue', fillOpacity: 0.2 })
              layer._path.style.cursor = 'pointer'
              layer.bindTooltip(`<b>${feature.properties.name || 'unknown'}</b>`, {
                permanent: true,
                direction: 'top',
                offset: [0, -10]
              }).openTooltip()
            })

            layer.on('mouseout', () => {
              layer.setStyle({ fillColor: 'yellow', fillOpacity: 0 })
              layer._path.style.cursor = ''
              layer.closeTooltip()
            })
          }
        }).addTo(this.map)

        // Adjust the map bounds to the selected region
        const bounds = this.regionLayer.getBounds()
        // this.map.fitBounds(bounds)
      } catch (error) {
        console.error('Failed to load region GeoJSON:', error)
      }
    }
  }
}
</script>

<style scoped>
.info-box {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>

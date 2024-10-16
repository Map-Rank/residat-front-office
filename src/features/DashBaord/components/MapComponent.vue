<template>
  <div>
    <div id="map" style="height: 100vh"></div>
    <!-- Dynamically show info-box when a region is selected -->
    <div class="info-box" v-if="showInfo">
      <!-- Data binding and event handling -->
    </div>
  </div>
  <div class="new-checkbox p-4">
    <h3 class="text-lg font-semibold mb-2">Layers</h3>
    <div class="space-y-2">
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="toggleCameroon"
          @change="toggleLoadCameroonGeoJson"
          class="form-checkbox h-4 w-4 text-blue-600"
        />
        <span class="ml-2 text-sm">Cameroon</span>
      </label>

      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="toggleHydroPolygonGeoJson"
          @change="toggleLoadHydroPolygonGeoJson"
          class="form-checkbox h-4 w-4 text-green-600"
        />
        <span class="ml-2 text-sm">Hydro Polygon Map</span>
      </label>

      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="toggleDisasterMarkers"
          @change="toggleDisasters"
          class="form-checkbox h-4 w-4 text-red-600"
        />
        <span class="ml-2 text-sm">Disaster Markers</span>
      </label>
    </div>
  </div>
</template>

<script>
import { getZones, getSpecificMapZones } from '@/services/zoneService'
import { getDisasters } from '@/services/disastersServices.js'
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
    }
  },

  emits: ['markerClick'],
  inheritAttrs: false,

  data() {
    return {
      map: null,
      showInfo: false,
      selectedRegion: {},
      cameroonLayer: null,
      regionLayer: null, // To manage individual region layers
      cachedZones: null,
      clickedZone: null,
      zoneMarkeds: [],
      // NewgeoJsonLayer: null,
      NewhydroPolygonLayer: null,
      toggleCameroon: false,
      toggleHydroPolygonGeoJson: false,
      allDisasters: null,
      toggleDisasterMarkers: false,
      disasterMarkersLayer: null
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
        this.allDisasters = await getDisasters()
        this.zoneMarkeds = this.cachedZones

        // Initialize map
        this.map = L.map('map').setView([this.latitude, this.longitude], this.zoomIndex)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map)

        // this.addMarkers(this.allDisasters)
      } catch (error) {
        console.error('Error initializing the map:', error)
      }
    },

    clearTooltips() {
      this.map.eachLayer((layer) => {
        if (layer.getTooltip && layer.getTooltip()) {
          layer.closeTooltip()
        }
      })
    },

    toggleDisasters() {
      if (this.toggleDisasterMarkers) {
        this.addDisasterMarkers()
      } else {
        this.removeDisasterMarkers()
      }
    },

    addDisasterMarkers() {
      const onMarkerClick = (zone) => {
        this.$emit('markerClick', zone)
      }
      // Only initialize if not already created
      if (!this.disasterMarkersLayer) {
        this.disasterMarkersLayer = L.layerGroup()

        this.allDisasters.forEach((disaster) => {
          const marker = L.marker([disaster.latitude, disaster.longitude])
          marker.on('click', () => onMarkerClick(disaster))

          marker.bindTooltip(`<b>${disaster.locality}</b><br>${disaster.description}`, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
          })
          marker.addTo(this.disasterMarkersLayer)
        })
      }

      // Add the layer to the map
      this.disasterMarkersLayer.addTo(this.map)
    },

    removeDisasterMarkers() {
      // Check if the disasterMarkersLayer exists and is currently on the map
      if (this.disasterMarkersLayer && this.map.hasLayer(this.disasterMarkersLayer)) {
        this.map.removeLayer(this.disasterMarkersLayer)
        this.disasterMarkersLayer = null // Reset to null after removing
      }
    },

    addMarkers(markers) {
      const onMarkerClick = (zone) => {
        this.$emit('markerClick', zone)
      }

      markers.forEach((zone) => {
        const marker = L.marker([zone.latitude, zone.longitude]).addTo(this.map)
        marker.on('click', () => onMarkerClick(zone))
      })
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

              this.clickedZone = await getSpecificMapZones(null, feature.properties.name)
              this.$emit('markerClick', this.clickedZone)

              if (this.clickedZone.length == 0 || this.clickedZone[0].geojson == '') {
                return
              }
              await this.loadRegionGeoJson(feature.properties.name)
            })

            layer.on('mouseover', () => {
              layer.setStyle({ fillColor: 'blue', fillOpacity: 0.2 })
              layer._path.style.cursor = 'pointer'
              layer
                .bindTooltip(`<b>${feature.properties.name || 'unknown'}</b>`, {
                  permanent: true,
                  direction: 'top',
                  offset: [0, -10]
                })
                .openTooltip()
            })

            layer.on('mouseout', () => {
              layer.setStyle({ fillColor: 'yellow', fillOpacity: 0 })
              layer._path.style.cursor = ''
              layer.closeTooltip()
            })
          }
        }).addTo(this.map)
      } catch (error) {
        console.error('Failed to load Cameroon GeoJSON:', error)
      }
    },

    async loadHydroPolygonGeoJson() {
      try {
        const responseHydro = await fetch('/assets/maps/Hydrography/Hydro_Polygon.geojson')
        if (!responseHydro.ok) {
          throw new Error('Error loading the Hydro_Polygon GeoJSON file.')
        }
        const hydroPolygonGeoJSON = await responseHydro.json()

        this.NewhydroPolygonLayer = L.geoJSON(hydroPolygonGeoJSON, {
          style: {
            color: '#2c82c9',
            fillColor: 'none',
            weight: 2
          }
        }).addTo(this.map)
      } catch (error) {
        console.error('Failed to load Hydro_Polygon GeoJSON:', error)
      }
    },

    toggleLoadHydroPolygonGeoJson() {
      if (this.toggleHydroPolygonGeoJson) {
        this.loadHydroPolygonGeoJson()
      } else {
        this.map.removeLayer(this.NewhydroPolygonLayer)
      }
    },

    toggleLoadCameroonGeoJson() {
      if (this.toggleCameroon) {
        this.loadCameroonGeoJson()
      } else {
        this.map.removeLayer(this.cameroonLayer)
        this.map.removeLayer(this.regionLayer)
      }
    },

    async loadRegionGeoJson(zone) {
      try {
        if (this.regionLayer) {
          this.map.removeLayer(this.regionLayer) // Remove previous region layer if exists
        }

        console.log('this is the geojson path' + this.clickedZone[0].geojson)
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
              layer
                .bindTooltip(`<b>${feature.properties.name || 'unknown'}</b>`, {
                  permanent: true,
                  direction: 'top',
                  offset: [0, -10]
                })
                .openTooltip()
            })

            layer.on('mouseout', () => {
              layer.setStyle({ fillColor: 'yellow', fillOpacity: 0 })
              layer._path.style.cursor = ''
              layer.closeTooltip()
            })

            this.map.on('zoomanim', () => {
              layer.closeTooltip() // Close tooltip on zoom animation to avoid conflicts
            })
          }
        }).addTo(this.map)

        // Adjust the map bounds to the selected region
      } catch (error) {
        console.error('Failed to load region GeoJSON:', error)
      }
    }
  },

  watch: {
    latitude(val) {
      if (this.map) {
        this.clearTooltips() // Clear any active tooltips
        this.map.flyTo([val, this.longitude], this.zoomIndex)
      }
    },
    longitude(val) {
      if (this.map) {
        this.clearTooltips() // Clear any active tooltips
        this.map.flyTo([this.latitude, val], this.zoomIndex)
      }
    },
    zoomIndex(val) {
      if (this.map) {
        this.clearTooltips() // Clear any active tooltips
        this.map.setView([this.latitude, this.longitude], val)
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

.new-checkbox {
  background-color: white;
  position: absolute;
  top: 8%;
  z-index: 1000;
  right: 2%;
}
</style>

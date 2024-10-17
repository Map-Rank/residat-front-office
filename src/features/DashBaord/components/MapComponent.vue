<template>
  <div>
    <div id="map" style="height: 100vh;position: sticky;"></div>
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
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    zoomIndex: {
      type: Number,
      required: true
    }
  },

  emits: ['zoneClick', 'disasterClick'],
  inheritAttrs: false,

  data() {
    return {
      map: null,
      showInfo: false,
      selectedRegion: {},
      cameroonLayer: null,
      regionLayer: null, // To manage individual region layers
      subRegionLayer: null, // To manage individual region layers
      cachedZones: null,
      clickedRegion: null,
      clickedDivision: null,
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
        this.$emit('disasterClick', zone)
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

              this.clickedRegion = await getSpecificMapZones(null, feature.properties.name)
              this.$emit('zoneClick', this.clickedRegion, )

              if (this.clickedRegion.length == 0 || this.clickedRegion[0].geojson == '') {
                return
              }
              await this.loadRegionGeoJson()
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
        this.map.removeLayer(this.subRegionLayer)
      }
    },

    async loadRegionGeoJson(zone) {
      try {
        if (this.regionLayer) {
          this.map.removeLayer(this.regionLayer) // Remove previous region layer if exists
        }

        console.log('this is the geojson path' + this.clickedRegion[0].geojson)
        const regionGeoJSON = await fetch(this.clickedRegion[0].geojson)
        const regionData = await regionGeoJSON.json()

        // Add the new region layer to the map
        this.regionLayer = L.geoJSON(regionData, {
          style: { color: 'black', fillColor: 'yellow', fillOpacity: 0, weight: 1 },
          onEachFeature: (feature, layer) => {
            layer.on('click', async () => {
              console.log(`Clicked on sub-region: ${feature.properties.name || 'unknown'}`)
              this.clickedDivision = await getSpecificMapZones(null, feature.properties.name)
              this.$emit('zoneClick', this.clickedDivision,10)

              if (this.clickedDivision.length == 0 || this.clickedDivision[0].geojson == '') {
                console.log('the division has no geojson')
                return
              }
              await this.loadSubRegionGeoJson()
             
              // You can load the subdivision GeoJSON here
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
    },



    async loadSubRegionGeoJson() {
    try {
      // Clear any existing sub-region layer if already loaded
      if (this.subRegionLayer) {
        this.map.removeLayer(this.subRegionLayer)
      }
  
      // Fetch the GeoJSON data for the specific sub-region
      console.log('this is the geojson path' + this.clickedDivision[0].geojson)
      const subRegionGeoJSON = await fetch(this.clickedDivision[0].geojson)
      if (!subRegionGeoJSON.ok) {
        throw new Error('Error loading the Sub-region GeoJSON file.')
      }
      
      const subRegionData = await subRegionGeoJSON.json()
  
      // Add the new sub-region layer to the map
      this.subRegionLayer = L.geoJSON(subRegionData, {
        style: { color: 'red', fillColor: 'orange', fillOpacity: 0, weight: 1 },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            console.log(`Clicked on a specific area within the sub-region: ${feature.properties.name || 'unknown'}`)
          })
  
          layer.on('mouseover', () => {
            layer.setStyle({ fillColor: 'orange', fillOpacity: 0.4 })
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
            layer.setStyle({ fillColor: 'orange', fillOpacity: 0 })
            layer._path.style.cursor = ''
            layer.closeTooltip()
          })
  
          this.map.on('zoomanim', () => {
            layer.closeTooltip() // Close tooltip on zoom animation to avoid conflicts
          })
        }
      }).addTo(this.map)
  
    } catch (error) {
      console.error('Failed to load sub-region GeoJSON:', error)
    }
  
  
  
  },

  },



  watch: {
 latitude(val) {
   if (this.map) {
     this.clearTooltips(); // Clear any active tooltips
     this.map.flyTo([val, this.longitude], this.zoomIndex, {
       animate: true,
       duration: 5 // Duration in seconds (default is usually 0.25 seconds)
     });
   }
 },
 longitude(val) {
   if (this.map) {
     this.clearTooltips(); // Clear any active tooltips
     this.map.flyTo([this.latitude, val], this.zoomIndex, {
       animate: true,
       duration: 5 // Duration in seconds
     });
   }
 },
 
zoomIndex(val) {
  if (this.map) {
    this.clearTooltips(); // Clear any active tooltips
    this.map.setView([this.latitude, this.longitude], val, {
      animate: true,
      duration: 5 // Less than flyTo to make zoom adjustment quicker but still smooth
    });
  }
}

  }
}
</script>

<style scoped>
.info-box {
  position: sticky;
  top: 20px;
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

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
    </div>
  </div>
</template>

<script>
import { getZones } from '@/services/zoneService'
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
    propGeojson: {
      type: String
      // required: true
    }
  },

  data() {
    return {
      map: null,
      showInfo: false,
      selectedRegion: {},
      zoneMarkeds: [],
      geojson: 'assets/maps/National_region/Far_North.json',
      cachedZones: null,
      NewgeoJsonLayer: null,
      NewhydroPolygonLayer: null,
      toggleCameroon: false,
      toggleHydroPolygonGeoJson: false
    }
  },

  _methods: {
    async initializeMap() {
      try {
        if (!this.cachedZones) {
          this.cachedZones = await getZones(2, null)
        }
        this.zoneMarkeds = this.cachedZones
        this.map = L.map('map').setView([this.latitude, this.longitude], this.zoomIndex)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map)

        this.addZoneMarkers()
        this.loadGeoJsonAndSvg()
      } catch (error) {
        console.error('Error initializing the map:', error)
      }
    },

    addZoneMarkers() {
      const onMarkerClick = (zone) => {
        if (zone.geojson && zone.geojson !== '') {
          this.geojson = zone.geojson
          this.loadZoneGeoJson(this.geojson)
        } else {
          console.log('GeoJSON is empty or null for this zone.')
        }
        this.$emit('markerClick', zone)
      }

      this.zoneMarkeds.forEach((zone) => {
        const marker = L.marker([zone.latitude, zone.longitude]).addTo(this.map)
        marker.on('click', () => onMarkerClick(zone))
      })
    },

    async loadCameroonGeoJson() {
      try {
        const response = await fetch(
          '/assets/maps/OSMB-7f46deeb2b40129c9869873dd7016e2ee5442531.geojson'
        )
        if (!response.ok) {
          throw new Error('Error loading the Cameroon GeoJSON file.')
        }
        const cameroonGeoJSON = await response.json()
        this.NewgeoJsonLayer = L.geoJSON(cameroonGeoJSON, {
          style: { color: 'black', fillColor: 'none', weight: 2 }
        }).addTo(this.map)
        // const bounds = geoJsonLayer.getBounds()
        // L.svgOverlay('<svg></svg>', bounds).addTo(this.map)
      } catch (error) {
        console.error('Failed to load and add Cameroon GeoJSON:', error)
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

        const hydrobounds = hydroPolygonLayer.getBounds()

        // L.svgOverlay('<svg></svg>', hydrobounds).addTo(this.map)

        console.log('Hydro_Polygon GeoJSON layer loaded successfully.')
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
        this.map.removeLayer(this.NewgeoJsonLayer)
      }
    },

    async loadZoneGeoJson(jsonPath) {
      try {
        const response = await fetch(jsonPath)
        if (!response.ok) {
          throw new Error('Failed to fetch Zone geojson')
        }
        const fetchedGeoJson = await response.json()

        const geoJsonLayer = L.geoJSON(fetchedGeoJson, {
          style: { color: 'blue', fillColor: 'none', weight: 3 },
          clickable: true,
          onEachFeature: (feature, layer) => {
            // Click event listener for each division
            layer.on('click', () => {
              console.log(`Clicked on division: ${feature.properties.name || 'unknown'}`)
            })

            // Hover effect for each division
            layer.on('mouseover', () => {
              layer.setStyle({ fillColor: 'blue', fillOpacity: 0.2 })
              layer._path.style.cursor = 'pointer' // Set pointer cursor on hover
            })

            // Reset style and cursor when mouse leaves the division
            layer.on('mouseout', () => {
              layer.setStyle({ fillColor: 'none', fillOpacity: 0 })
              layer._path.style.cursor = '' // Reset cursor style
            })
          }
        }).addTo(this.map)

        const zoneBounds = geoJsonLayer.getBounds()
        this.map.fitBounds(zoneBounds)
      } catch (error) {
        console.error('Failed to load zone GeoJSON:', error)
      }
    },

    loadGeoJsonAndSvg() {
      // this.loadCameroonGeoJson()
      // this.loadHydroPolygonGeoJson()
      console.log('Loaded Cameroon GeoJSON and SVG')
    }
  },
  get methods() {
    return this._methods
  },
  set methods(value) {
    this._methods = value
  },

  watch: {
    latitude(val) {
      this.map && this.map.flyTo([val, this.longitude], this.zoomIndex)
    },
    longitude(val) {
      this.map && this.map.flyTo([this.latitude, val], this.zoomIndex)
    },
    zoomIndex(val) {
      this.map && this.map.setView([this.latitude, this.longitude], val)
    },
    propGeojson(val) {
      // You could add any logic if `propGeojson` changes.
    }
  },

  async mounted() {
    await this.initializeMap()
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}

.info-box {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.leaflet-interactive {
  pointer-events: auto; /* Ensures pointer events are enabled */
}

.new-checkbox {
  background-color: white;
  position: absolute;
  top: 25%;
  z-index: 1000;
  left: 2%;
}
</style>

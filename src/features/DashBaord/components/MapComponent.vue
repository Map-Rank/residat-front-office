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
      cachedZones: null
    }
  },

  methods: {
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
        const geoJsonLayer = L.geoJSON(cameroonGeoJSON, {
          style: { color: 'blue', fillColor: 'none', weight: 2 }
        }).addTo(this.map)
        const bounds = geoJsonLayer.getBounds()
        L.svgOverlay('<svg></svg>', bounds).addTo(this.map)
      } catch (error) {
        console.error('Failed to load and add Cameroon GeoJSON:', error)
      }
    },

     onEachFeature(feature, layer) {
      layer.on({
        mouseover: function (e) {
          var layer = e.target;
          layer.setStyle({
            color: "red" // Change stroke color on hover
          });
        },
        mouseout: function (e) {
          geojson.resetStyle(e.target); // Reset to original style when hover ends
        }
      });
    },
    
        //   function   style(feature) {
        //   return {
        //     color: "blue",    // Stroke color
        //     fillColor: "yellow", // Default fill color
        //     weight: 2,
        //     fillOpacity: 0.7,
        //     interactive: true  // Ensure the fill area is interactive
        //   };
        // }

        async loadZoneGeoJson(jsonPath) {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error('Failed to fetch Zone geojson');
    }
    const fetchedGeoJson = await response.json();

    const geoJsonLayer = L.geoJSON(fetchedGeoJson, {
      style: {
        color: 'blue',
        fillColor: 'yellow',
        fillOpacity: 0,
        weight: 3, // Border weight on initial load
        // interactive: true
      },
      onEachFeature: (feature, layer) => {
        // Click event listener for each division
        layer.on('click', () => {
          console.log(`Clicked on division: ${feature.properties.name || 'unknown'}`);
          // layer.setStyle({ weight: 0 }); // Remove border when clicked
          // layer.setStyle({ weight: 3, color: 'blue', fillOpacity: 0 });
          layer.setStyle({ color: 'blue', weight: 2, fillOpacity: 0 });
        });

        // Hover effect for each division
        layer.on('mouseover', () => {
          layer.setStyle({ fillColor: 'blue', fillOpacity: 0.2 });
          layer._path.style.cursor = 'pointer'; // Set pointer cursor on hover

          // Display tooltip and make it follow the mouse
          layer.openTooltip();
          layer.on('mousemove', (e) => {
            layer.getTooltip().setLatLng(e.latlng);
          });
        });

        // Reset style and cursor when mouse leaves the division
        layer.on('mouseout', () => {
          layer.setStyle({ fillColor: 'yellow', fillOpacity: 0, weight: 3 }); // Reset border weight
          layer._path.style.cursor = ''; // Reset cursor style
          layer.closeTooltip(); // Hide the tooltip
        });

        // Bind a tooltip with permanent: false so it only shows on hover
        layer.bindTooltip(
          `<div><b>${feature.properties.name || 'unknown'}</b></div>`, 
          {
            permanent: false,
            direction: 'top',
            offset: [0, -10] // Adjust offset to better position tooltip
          }
        );
      }
    }).addTo(this.map);

    // Fit the map bounds to the geoJson layer
    const zoneBounds = geoJsonLayer.getBounds();
    this.map.fitBounds(zoneBounds);
  } catch (error) {
    console.error('Failed to load zone GeoJSON:', error);
  }
}
,

    loadGeoJsonAndSvg() {
      this.loadCameroonGeoJson()
      console.log('Loaded Cameroon GeoJSON and SVG')
    }
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
  outline: none;
  pointer-events: auto; /* Ensures pointer events are enabled */
}
</style>

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

import L from 'leaflet';

export default {
  name: 'MapComponent',

  props: {
    latitude: String,
    longitude: String,
    zoomIndex: String,
  },

  data() {
    return {
      map: null,
      showInfo: false,
      selectedRegion: {},
      zoneMarkeds: [],
    };
  },

  methods: {


    async initializeMap() {
      try {
        const zones = await getZones(2, null);
        this.zoneMarkeds = zones;
        this.map = L.map('map').setView([this.latitude, this.longitude], this.zoomIndex);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(this.map);

        this.addZoneMarkers();
        this.loadGeoJsonAndSvg();
      } catch (error) {
        console.error('Error initializing the map:', error);
      }
    },
    addZoneMarkers() {
      this.zoneMarkeds.forEach(zone => {
        const marker = L.marker([zone.latitude, zone.longitude]).addTo(this.map);
        marker.on('click', () => {
          this.$emit('markerClick', zone);
          this.map.flyTo([zone.latitude, zone.longitude], 9, { animate: true, duration: 2 });
        });
      });
    },


    // Load GeoJSON and SVG files and add to map
async loadGeoJsonAndSvg() {
  try {
    const response = await fetch('assets/maps/national.geojson');
    if (!response.ok) {
      throw new Error('Error loading the GeoJSON file.');
    }
    const cameroonGeoJSON = await response.json();

    // Add GeoJSON layer to the map
    const geoJsonLayer = L.geoJSON(cameroonGeoJSON, {
      style: {
        color: 'blue',
        fillColor: 'none',
        weight: 2,
      },
    }).addTo(this.map);

    const bounds = geoJsonLayer.getBounds();

    // Assume SVG content is fetched here and stored in `svgContent`
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.innerHTML = '<path d="..."/>'; // SVG path content goes here
    L.svgOverlay(svgElement, bounds).addTo(this.map);

  } catch (error) {
    console.error('Error loading the GeoJSON or SVG file:', error);
  }
}

  },

  watch: {
    latitude(val) {
      this.map && this.map.flyTo([val, this.longitude], this.zoomIndex);
    },
    longitude(val) {
      this.map && this.map.flyTo([this.latitude, val], this.zoomIndex);
    },
    zoomIndex(val) {
      this.map && this.map.setView([this.latitude, this.longitude], val);
    },
  },
  async mounted() {
    await this.initializeMap();
  },
};


</script>

<style scoped>
/* Styling for the map container and info box */
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
</style>

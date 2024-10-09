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
      type: String,
      // required: true
    },
  },

  data() {
    return {
      map: null,
      showInfo: false,
      selectedRegion: {},
      zoneMarkeds: [],
      geojson:'',
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
        this.geojson = zone.geojson
        console.log(this.geojson)
        const marker = L.marker([zone.latitude, zone.longitude]).addTo(this.map);
        marker.on('click', () => {
          this.$emit('markerClick', zone);


          this.map.flyTo([zone.latitude, zone.longitude], 9, { animate: true, duration: 4 });
        });
      });
    },


    async  loadCameroonGeoJson(map) {
  try {
    const response = await fetch('assets/maps/OSMB-7f46deeb2b40129c9869873dd7016e2ee5442531.geojson');
    if (!response.ok) {
      throw new Error('Error loading the Cameroon GeoJSON file.');
    }
    const cameroonGeoJSON = await response.json();
    L.svgOverlay(cameroonGeoJSON, {
      style: {
        color: 'blue',
        fillColor: 'none',
        weight: 2,
      },
    }).addTo(map);
  } catch (error) {
    console.error('Failed to load and add Cameroon GeoJSON:', error);
  }
},

async  loadZoneGeoJson(map, zonePath) {
  try {
    const response = await fetch(zonePath);
    if (!response.ok) {
      throw new Error('Error loading the Far North GeoJSON file.');
    }
    const farNorthGeoJSON = await response.json();
    L.svgOverlay(farNorthGeoJSON, {
      style: {
        color: 'blue',
        fillColor: 'none',
        weight: 2,
      },
    }).addTo(map);
  } catch (error) {
    console.error('Failed to load and add Far North GeoJSON:', error);
  }
},

async loadGeoJsonAndSvg() {
  this.loadCameroonGeoJson(this.map)
  this.loadZoneGeoJson(this.map, this.geojson)
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
    propGeojson(val) {
      // this.map && this.map.setView([this.latitude, this.longitude], val);
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

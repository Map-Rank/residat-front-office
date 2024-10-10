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
      geojson:"assets/maps/National_region/Far_North.json",
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
          
          
          if (zone.geojson && zone.geojson != '') {
            this.geojson = zone.geojson;
            this.loadZoneGeoJson(this.geojson)
            console.log("geojson is not empty");
          } else {
            this.geojson = '';
              console.log("geojson is empty or null");
          }
          
          // console.log(this.geojson)
          this.$emit('markerClick', zone);
          this.map.flyTo([zone.latitude, zone.longitude], 9, { animate: true, duration: 4 });
        });
      });
    },


    async  loadCameroonGeoJson() {
  try {
    const response = await fetch("/assets/maps/OSMB-7f46deeb2b40129c9869873dd7016e2ee5442531.geojson");
    if (!response.ok) {
      throw new Error('Error loading the Cameroon GeoJSON file.');
    }
    const cameroonGeoJSON = await response.json();

    const geoJsonLayer  =L.geoJSON(cameroonGeoJSON, {
      style: {
        color: 'blue',
        fillColor: 'none',
        weight: 2,
      },
    }).addTo(this.map);


    const bounds = geoJsonLayer.getBounds();
    L.svgOverlay( bounds).addTo(this.map);

  } catch (error) {
    console.error('Failed to load and add Cameroon GeoJSON:', error);
  }
},

async  loadZoneGeoJson(json) {

  console.log(json)
  // const Tjson = this.geojson
  try {
    const response = await fetch(json);
    if (!response.ok) {
      throw new Error('Failed to fetch Zone geojson');
    }
    const fetchedGeoJson = await response.json();

    const geoJsonLayer =L.geoJSON(fetchedGeoJson, {
      style: {
        color: 'blue',
        fillColor: 'none',
        weight: 2,
      },
    }).addTo(this.map);
    const zoneBounds = geoJsonLayer.getBounds();

    L.svgOverlay(zoneBounds).addTo(this.map);
  } catch (error) {
    console.error('Failed to load zone Geojson:', error);
  }
},

async loadGeoJsonAndSvg() {
  this.loadCameroonGeoJson(this.map)
  console.log('this is the geoj' + this.geojson)
  // this.loadZoneGeoJson(this.geojson)
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

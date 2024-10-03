<template>
  <div>
    <!-- Map Container -->
    <div id="map" style="height: 100vh"></div>

    <!-- Info Box shown when a marker is clicked -->
    
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'MapComponent',

  props: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    zoomIndex: {
      type: String,
      required: true,
    },

    zoneMarkeds: {
      type: Array,
      default: () => ([
        {
          id: 1,
          parentId: 3,
          zoneName: 'Centre',
          latitude: "4.4857",
          longitude: "11.7468",
          zoomIndex: 8,
          name: 'Centre',
          info: 'Informations sur Littoral.',
        },
        {
          id: 5,
          parentId: 5,
          zoneName: 'Littoral',
          latitude: "4.0483",
          longitude: "9.7043",
          zoomIndex: 8,
          name: 'Littoral',
          info: 'Informations sur Centre.',
        },
      ]),
    }
  },

  data() {
    return {
      map: null, // Leaflet map instance
      showInfo: false, // Controls the display of the info box
      selectedRegion: {
        name: '',
        info: ''
      }, // Holds the info of the selected region
   
    };
  },

  methods: {
    // Initialize the map and load data
// Initialize the map and load data
initializeMap() {
  this.map = L.map('map').setView([this.latitude, this.longitude], this.zoomIndex);

  // Adding OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.map);

  // Add markers for each region, if zoneMarkeds is defined
  if (this.zoneMarkeds) {
    this.zoneMarkeds.forEach((zoneMarked) => {
      const marker = L.marker([zoneMarked.latitude, zoneMarked.longitude]).addTo(this.map);

      // Display region info and emit event on marker click
      marker.on('click', () => {

        // Emit an event with the clicked marker's zone data
        this.$emit('markerClick', { zoneMarked });
      });
    });
  } else {
    console.log('No zone markers available at initialization.');
  }

  // Fetch and add GeoJSON and SVG layers
  this.loadGeoJsonAndSvg();
}
,




    // Load GeoJSON and SVG files and add to map
    async loadGeoJsonAndSvg() {
      try {
        // Fetch GeoJSON file
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

        // Fetch SVG file
      

        // Parse and overlay the SVG on the map
      

        // Overlay the SVG on the map
        // L.svgOverlay(bounds).addTo(this.map);
      } catch (error) {
        console.error('Error loading the GeoJSON or SVG file:', error);
      }
    }
  },

  watch: {
    // Watch for changes in latitude, longitude, and zoomIndex to update the map
    latitude(newLatitude) {
      if (this.map) {
        this.map.flyTo([newLatitude, this.longitude], this.zoomIndex, {
          animate: true,
          duration: 2, // Animation duration in seconds
        });
      }
    },
    longitude(newLongitude) {
      if (this.map) {
        this.map.flyTo([this.latitude, newLongitude], this.zoomIndex, {
          animate: true,
          duration: 2, // Animation duration in seconds
        });
      }
    },
    zoomIndex(newZoomIndex) {
      if (this.map) {
        this.map.flyTo([this.latitude, this.longitude], newZoomIndex, {
          animate: true,
          duration: 2, // Animation duration in seconds
        });
      }
    }
  },

  mounted() {
    // Initialize the map when the component is mounted
    this.initializeMap();
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

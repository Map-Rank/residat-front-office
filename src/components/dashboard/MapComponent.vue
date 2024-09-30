<template>
  <div id="map" style="height: 100vh;"></div>
</template>

<script>
import { onMounted, watch } from 'vue';
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
  },

  setup(props) {
    let map;

    // Coordinates for the regions (add more if necessary)
    const regions = [
      { name: 'Littoral', lat: 4.05, lng: 9.7 },
      { name: 'Centre', lat: 4.5, lng: 11.5 },
      { name: 'Nord', lat: 9.4, lng: 13.3 },
      { name: 'Ouest', lat: 5.5, lng: 10.4 },
      // Add other regions with their coordinates here
    ];

    // Function to initialize the map
    const initializeMap = () => {
      map = L.map('map').setView([props.latitude, props.longitude], props.zoomIndex);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add static markers for each region
      regions.forEach(region => {
        const marker = L.marker([region.lat, region.lng]).addTo(map);
        marker.bindPopup(`<b>${region.name}</b><br>Some information about ${region.name}.`);
        
        marker.on('click', () => {
          marker.openPopup();
        });
      });
    };

    onMounted(async () => {
      // Initialize the map on component mount
      initializeMap();

      // Fetch and display the GeoJSON and SVG layers (optional, can be kept as is)
      try {
        const response = await fetch('assets/maps/national.geojson');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du fichier GeoJSON.');
        }
        const cameroonGeoJSON = await response.json();

        const geoJsonLayer = L.geoJSON(cameroonGeoJSON, {
          style: {
            color: 'blue',
            fillColor: 'none',
            weight: 2,
          },
        }).addTo(map);

        const bounds = geoJsonLayer.getBounds();

        const svgResponse = await fetch('assets/maps/3BZVgc3vIYjZsZHQuN87fpMP0a73pUPPhfjPovMp.svg');
        if (!svgResponse.ok) {
          throw new Error('Erreur lors du chargement du fichier SVG.');
        }

        const svgText = await svgResponse.text();
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDocument.querySelector('svg');

        // L.svgOverlay(svgElement, bounds).addTo(map);
      } catch (error) {
        console.error('Erreur lors du chargement du GeoJSON :', error);
      }
    });

    // Watch for changes in latitude, longitude, or zoomIndex props and update the map accordingly
    watch(
      [() => props.latitude, () => props.longitude, () => props.zoomIndex],
      ([newLatitude, newLongitude, newZoomIndex]) => {
        if (map) {
          // Use flyTo for smooth camera movement
          map.flyTo([newLatitude, newLongitude], newZoomIndex, {
            animate: true,
            duration: 2, // Duration of the animation in seconds
          });
        }
      }
    );

    return {};
  },
};
</script>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }

  svg [data-name][data-id] {
    pointer-events: auto;
    cursor: pointer;
  }
</style>

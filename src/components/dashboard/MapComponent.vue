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

    // Function to initialize the map
    const initializeMap = () => {
      map = L.map('map').setView([props.latitude, props.longitude], props.zoomIndex);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    };

    onMounted(async () => {
      // Initialize the map on component mount
      initializeMap();

      // Fetch and display the GeoJSON and SVG layers
      try {
        const response = await fetch('assets/maps/OSMB-7f46deeb2b40129c9869873dd7016e2ee5442531.geojson');
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

        // Uncomment the following lines if you want to handle click events on the SVG
        // svgElement.querySelectorAll('[data-name][data-id]').forEach((section) => {
        //   section.addEventListener('click', () => {
        //     const name = section.getAttribute('data-name');
        //     const id = section.getAttribute('data-id');
        //     console.log(name);
        //     alert(`Vous avez cliqué sur la région: ${name} avec l'ID: ${id}`);
        //   });
        // });

        //L.svgOverlay(svgElement, bounds).addTo(map);
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

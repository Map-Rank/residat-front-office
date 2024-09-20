<template>
  <div id="map" style="height: 100vh;"></div>
</template>

<script>
import { onMounted } from 'vue';
import L from 'leaflet';

export default {
  name: 'MapComponent',

  // Accept latitude, longitude, and zoom level as props
  props: {
    latitude: {
      type: String,
      // default: 7.3697, // Default value
    },
    longitude: {
      type: String,
      // default: 12.3547, // Default value
    },
    zoomIndex: {
      type: String,
      // default: '6', // Default zoom level
    },
  },

  setup(props) {
    onMounted(async () => {
      // Use props to set the view for the map

      console.log()
      const map = L.map('map').setView([props.latitude, props.longitude], props.zoomIndex);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

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

        svgElement.querySelectorAll('[data-name][data-id]').forEach((section) => {
          section.addEventListener('click', () => {
            const name = section.getAttribute('data-name');
            const id = section.getAttribute('data-id');
            console.log(name);
            alert(`Vous avez cliqué sur la région: ${name} avec l'ID: ${id}`);
          });
        });

        L.svgOverlay(svgElement, bounds).addTo(map);
      } catch (error) {
        console.error('Erreur lors du chargement du GeoJSON :', error);
      }
    });
  },
};
</script>


<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }

  /* Ajoute ce style si des problèmes de clic persistent */
  svg [data-name][data-id] {
    pointer-events: auto; /* Assure que les événements de clic sont autorisés */
    cursor: pointer; /* Change le curseur sur les sections cliquables */
  }
</style>

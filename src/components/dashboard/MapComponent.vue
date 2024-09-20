<template>
  <div id="map" style="height: 100vh;"></div>
</template>

<script>
import { onMounted } from "vue";
import L from "leaflet";

export default {
  name: "MapComponent",
  setup() {
    onMounted(async () => {
      const map = L.map("map").setView([7.3697, 12.3547], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Charger le fichier GeoJSON dynamiquement
      try {
        const response = await fetch('assets/maps/OSMB-7f46deeb2b40129c9869873dd7016e2ee5442531.geojson');
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier GeoJSON.");
        }
        const cameroonGeoJSON = await response.json();

        // Ajouter la couche GeoJSON pour le Cameroun
        const geoJsonLayer = L.geoJSON(cameroonGeoJSON, {
          style: {
            color: "blue", // Couleur de contour
            fillColor: "none", // Pas de remplissage
            weight: 2
          }
        }).addTo(map);

        // Calculer les limites à partir du GeoJSON (frontière du Cameroun)
        const bounds = geoJsonLayer.getBounds(); // Obtenir les limites de la couche GeoJSON du Cameroun

        // console.log("GeoJSON Bounds:", bounds);

        const svgResponse = await fetch('assets/maps/3BZVgc3vIYjZsZHQuN87fpMP0a73pUPPhfjPovMp.svg');
        if (!svgResponse.ok) {
          throw new Error("Erreur lors du chargement du fichier SVG.");
        }

        const svgText = await svgResponse.text(); // Récupérer le contenu texte du SVG
        const parser = new DOMParser(); // Créer une instance de DOMParser
        const svgDocument = parser.parseFromString(svgText, "image/svg+xml"); // Parser le texte en un document SVG
        const svgElement = svgDocument.querySelector('svg'); // Obtenir l'élément SVG

        // Attacher les événements de clic aux sections avec data-name et data-id
        svgElement.querySelectorAll('[data-name][data-id]').forEach(section => {
          section.addEventListener('click', () => {
            const name = section.getAttribute('data-name');
            const id = section.getAttribute('data-id');
            console.log(name);
            
            // Logique spécifique à chaque section cliquée ici
            alert(`Vous avez cliqué sur la région: ${name} avec l'ID: ${id}`);
          });
        });

        // Ajouter le SVG comme une superposition sur la carte
        L.svgOverlay(svgElement, bounds).addTo(map);

      } catch (error) {
        console.error("Erreur lors du chargement du GeoJSON :", error);
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

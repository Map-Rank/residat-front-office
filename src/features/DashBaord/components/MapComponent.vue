<template>
  <div>
    <div id="map" style="height: 100vh"></div>
    <!-- Div cachée qui sera affichée au clic sur un marqueur -->
    <div v-if="showInfo" class="info-box">
      <h3>{{ selectedRegion.name }}</h3>
      <p>{{ selectedRegion.info }}</p>
      <button @click="closeInfo">Fermer</button>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue'
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
    }
  },

  setup(props) {
    let map
    const showInfo = ref(false) // État pour gérer l'affichage de la div
    const selectedRegion = ref({ name: '', info: '' }) // Informations sur la région sélectionnée

    // Coordonnées des régions
    const zoneMarkeds = [
      {
        zoneId: 1, // Assuming unique ID for Littoral
        parentId: 0, // Assuming it has no parent, root zone
        zoneName: 'Littoral',
        mapSize: 1, // Assuming defaultMapSize is defined elsewhere
        latitude: 4.0511,
        longitude: 9.7679,
        zoomIndex: 5, // Assuming zoomLevelIndex is defined elsewhere
        name: 'Littoral',
        lat: 4.05,
        lng: 9.7,
        info: 'Informations sur Littoral.'
      },
      {
        zoneId: 2, // Assuming unique ID for Centre
        parentId: 0, // Assuming it has no parent, root zone
        zoneName: 'Centre',
        mapSize: 1, // Assuming defaultMapSize is defined elsewhere
        latitude: 4.5,
        longitude: 11.5,
        zoomIndex: 5, // Assuming zoomLevelIndex is defined elsewhere
        name: 'Centre',
        lat: 4.5,
        lng: 11.5,
        info: 'Informations sur Centre.'
      }
    ]

    // Fonction pour initialiser la carte
    const initializeMap = () => {
      map = L.map('map').setView([props.latitude, props.longitude], props.zoomIndex)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      // Ajouter des marqueurs pour chaque région
      zoneMarkeds.forEach((zoneMarked) => {
        const marker = L.marker([zoneMarked.lat, zoneMarked.lng]).addTo(map)

        marker.on(
          'click',
          function () {
            this.$emit('markerClick', { zoneMarked })
            showRegionInfo(zoneMarked)
          }.bind(this)
        )
      })
    }

    // Fonction pour afficher les informations de la région
    const showRegionInfo = (zoneMarked) => {
      selectedRegion.value = zoneMarked // Mettre à jour la région sélectionnée
      showInfo.value = true // Afficher la div
    }

    // Fonction pour fermer la div d'informations
    const closeInfo = () => {
      showInfo.value = false // Cacher la div
    }

    onMounted(async () => {
      // Initialiser la carte lors du montage du composant
      initializeMap()

      // Récupérer et afficher les couches GeoJSON et SVG (facultatif)
      try {
        const response = await fetch('assets/maps/national.geojson')
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du fichier GeoJSON.')
        }
        const cameroonGeoJSON = await response.json()

        const geoJsonLayer = L.geoJSON(cameroonGeoJSON, {
          style: {
            color: 'blue',
            fillColor: 'none',
            weight: 2
          }
        }).addTo(map)

        const bounds = geoJsonLayer.getBounds()

        const svgResponse = await fetch('assets/maps/3BZVgc3vIYjZsZHQuN87fpMP0a73pUPPhfjPovMp.svg')
        if (!svgResponse.ok) {
          throw new Error('Erreur lors du chargement du fichier SVG.')
        }

        const svgText = await svgResponse.text()
        const parser = new DOMParser()
        const svgDocument = parser.parseFromString(svgText, 'image/svg+xml')
        const svgElement = svgDocument.querySelector('svg')

        // L.svgOverlay(svgElement, bounds).addTo(map);
      } catch (error) {
        console.error('Erreur lors du chargement du GeoJSON :', error)
      }
    })

    // Surveiller les changements de latitude, longitude ou zoomIndex
    watch(
      [() => props.latitude, () => props.longitude, () => props.zoomIndex],
      ([newLatitude, newLongitude, newZoomIndex]) => {
        if (map) {
          map.flyTo([newLatitude, newLongitude], newZoomIndex, {
            animate: true,
            duration: 2 // Durée de l'animation en secondes
          })
        }
      }
    )

    return {
      showInfo,
      selectedRegion,
      closeInfo
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}

.info-box {
  position: absolute;
  top: 75%;
  left: 3%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Pour s'assurer qu'elle soit au-dessus de la carte */
}
</style>

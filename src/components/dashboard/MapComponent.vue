<!-- MapComponent.vue -->
<template>
    <div id="map" style="height: 100vh;"></div>
  </template>
  
  <script>
  import { onMounted } from "vue";
  import L from "leaflet";
  
  export default {
    name: "MapComponent",
    setup() {
      onMounted(() => {
        const map = L.map("map").setView([7.3697, 12.3547], 7);
  
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
      });
    },
  };
  </script>
  
<style scoped>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
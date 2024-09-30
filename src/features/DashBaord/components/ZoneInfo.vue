<template>
    <div class="zone-info p-4 border rounded shadow-md bg-white">
      <!-- Zone Banner -->
      <div class="zone-banner mb-4">
        <img :src="zone.banner" alt="Zone Banner" class="w-full h-40 object-cover rounded" />
      </div>
  
      <!-- Zone Details -->
      <div class="zone-details">
        <h2 class="text-2xl font-bold mb-2">{{ zone.name }}</h2>
        <p class="text-gray-600">
          <strong>Latitude:</strong> {{ zone.latitude }}
        </p>
        <p class="text-gray-600">
          <strong>Longitude:</strong> {{ zone.longitude }}
        </p>
  
        <!-- Vector Map -->
        <!-- <div v-if="zone.vector" class="vector-info mt-4">
          <h3 class="text-xl font-semibold mb-2">Vector Map</h3>
          <img :src="zone.vector.path" alt="Vector Image" class="w-full h-32 object-cover rounded" />
  
          
          <div class="mt-2">
            <h4 class="font-semibold mb-1">Keys:</h4>
            <ul>
              <li v-for="key in zone.vector.keys" :key="key.id" class="text-gray-600">
                <strong>{{ key.name }}:</strong> <span :style="{ color: key.value }">{{ key.value }}</span>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ZoneInfo",
    props: {
      zone: {
        type: Object,
        required: true,
      },
    },
    methods: {
    
    },
  };
  </script>
  
  <style scoped>
  .zone-info {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .zone-banner img {
    border-radius: 8px;
  }
  
  .vector-info img {
    border-radius: 4px;
  }
  
  .vector-info ul {
    list-style: none;
    padding: 0;
  }
  
  .vector-info ul li {
    margin-bottom: 4px;
  }
  </style>
  
<template>
  <div class="w-[100%] grid p-4 border rounded shadow-md bg-white">
    <!-- Zone Banner -->
    <div v-if="zone" class="mb-1">
      <img :src="zone.banner" alt="Zone Banner" class="w-full h-[15vh] object-cover rounded" />
    </div>
    <div v-else class="skeleton-banner h-[10vh] mb-4 shimmer"></div>

    <!-- Zone Details -->
    <div v-if="zone" class="zone-details">
      <h2 class="text-[16px] font-bold">{{ zone.name }}</h2>
      <p class="text-gray-600 text-[12px]"><strong>Latitude:</strong> {{ zone.latitude }}</p>
      <p class="text-gray-600 text-[12px]"><strong>Longitude:</strong> {{ zone.longitude }}</p>
      <p class="text-gray-600 text-[12px]">
        <strong>Number of Civils:</strong> {{ zone.longitude }}
      </p>
      <p class="text-gray-600 text-[12px]">
        <strong>Number of Accidents:</strong> {{ zone.longitude }}
      </p>
    </div>
    <div v-else>
      <div class="skeleton-text-wide shimmer mb-1"></div>
      <div class="skeleton-text-narrow shimmer"></div>
      <div class="skeleton-text-narrow shimmer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZoneInfo',
  props: {
    zone: {
      type: Object,
      required: true
    }
  },
  methods: {}
}
</script>

<style scoped>
.skeleton-banner,
.skeleton-text-wide,
.skeleton-text-narrow {
  background-color: #ccc;
  border-radius: 4px;
}

.skeleton-banner {
  height: 10vh;
}

.skeleton-text-wide,
.skeleton-text-narrow {
  height: 16px;
  margin-bottom: 4px;
}

.skeleton-text-wide {
  width: 90%;
}

.skeleton-text-narrow {
  width: 60%;
}

.shimmer {
  animation: shimmer 1.5s infinite linear;
  background: linear-gradient(to right, #ccc 8%, #ddd 18%, #ccc 33%);
  background-size: 800px 104px;
}

@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>

import { getZones } from '@/services/zoneService.js';
<template>
  <div class="flex flex-grow items-center justify-center">
    <div class="relative mx-auto search flex p-2 w-3/4 rounded-lg">
      <!-- <button type="submit" class="absolute left-2 mt-3 mr-5"> -->
        <img src="../../assets/icons/Search.svg" alt="" />
      <!-- </button> -->
      <input
        v-model="searchQuery"
        @input="filterZones()"
        @keyup.enter="searchZone"
        class="border-2 w-full file  bg-transparent h-10 px-2 pr-16 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search your location , user ..."
      />
      <div
        class="absolute z-10 bg-white mt-10 rounded-lg shadow-lg w-full"
        v-show="searchQuery && filteredZones.length"
      >
        <ul class="overflow-y-auto text-gray-700">
          <li
            @click="
              () => {
                this.searchQuery = zone.name
                searchZone(zone.id)
              }
            "
            v-for="zone in filteredZones"
            :key="zone.id"
            class="px-5 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ zone.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getZones } from '@/services/zoneService.js'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchBar',
  async created() {
    try {
      await this.getAllZones()
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    const router = useRouter()
    return {
      router,
      searchQuery: '',
      zones: [],
      filteredZones: []
    }
  },
  methods: {
    async filterZones() {
      if (!this.searchQuery) {
        this.filteredZones = []
        return
      }

      // Replace with API call if needed
      this.filteredZones = this.zones.filter((zone) =>
        zone.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },

    searchZone(id) {
      this.filteredZones = [];
    
      const currentRoute = this.$router.currentRoute;
      if (currentRoute.name === 'search-result') {
        this.$router.replace({ name: 'search-result', params: { idType: 'zone', id: id } });
      } else {
        // Use push if we are on a different page
        this.$router.push({ name: 'search-result', params: { idType: 'zone', id: id } });
      }
    },
    

    async getAllZones() {
      try {
        this.zones = await getZones()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
/* Add any additional styles if required */
.search {
  background-color: var(--primary-light, #e6e8ec);
  border-color: #e6e8ec;
}
</style>

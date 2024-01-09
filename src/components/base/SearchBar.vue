import { getZones } from '@/services/zoneService.js';
<template>
  <div class="flex flex-grow items-center justify-center">
    <div class="relative mx-auto search flex p-2 w-3/4  rounded-lg">
      <button type="submit" class="absolute left-2  mt-3 mr-5 ">
        <img src="../../assets/icons/Search.svg" alt="" />
      </button>
      <input
        v-model="searchQuery"
        @input="filterZones"
        class="border-2 w-full file ml-3  bg-transparent h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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
          @click="()=>{
            this.searchQuery = zone.name
          }"
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

export default {

  name: 'SearchBar',
  async created(){

    try {
      
      await this.getAllZones()
      // await this.getAllZones()
      // console.log(this.zones)
      
    } catch (error) {
      console.log(error)
    }

  },
  data() {
    return {
      searchQuery: '',
      zones:[],
      suggestions: [
        'day & zimmermann · Company · Construction',
        'day trader',
        'day & ross · Company · Truck Transportation',
        'day trader groups',
        'dayforce · Product · Marketplace Platforms'
        // ... more suggestions or fetch from API
      ],
      filteredZones: []
    }
  },
  methods: {
    filterSuggestions() {
      if (!this.searchQuery) {
        this.filteredZones = []
        return
      }

      // Replace with API call if needed
      this.filteredZones = this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
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

     async getAllZones() {
      try {
        this.zones = await getZones()
      } catch (error) {
        console.log(error)
      }
    },
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

<!-- <template>
  <div class="flex flex-grow items-center justify-center">
    <div class="search flex p-2 w-3/4  rounded-lg">
      <img src="../../assets/icons/Search.svg" alt="" />
      <input
        type="search"
        placeholder="Search "
        class="flex-grow bg-transparent ml-3 focus:border-none rounded-md outline-none hover:border-none transition-colors duration-200"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBar'
}
</script>
<style lang="scss" scoped>
.search {
  background-color: var(--primary-light, #e6e8ec);
  border-color: #e6e8ec;
}

header {
  background-color: var(--white-normal, #fff);
}
</style> -->

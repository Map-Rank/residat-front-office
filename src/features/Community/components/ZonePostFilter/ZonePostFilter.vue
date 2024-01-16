<template>
  
  <div class="bg-white px-5 py-3 mt-3 mb-4 rounded-lg">
    <h2 class="title text-primary-normal font-bold">Select Location</h2>
  </div>
  <div class="bg-white md:p-6 rounded-lg">
    <div class="grid w-full ">
      <div class="w-full">
        <label class=" label inline-block mb-2">Choose Your Region</label>
        <div v-if="isLoading" class="flex h-full justify-center">
          <LoadingIndicator />
        </div>
        <BaseDropdown
          v-if="!isLoading"
          :options="regions"
          @selectedOptionId="updateZoneId"
          @functionIdParams="getDivisions"
        />
      </div>
      <div class="w-full">
        <label class=" label inline-block mb-2">Choose Your Division</label>
        <div v-if="isDivisionLoading" class="flex h-full justify-center">
          <LoadingIndicator />
        </div>
        <BaseDropdown
          v-if="!isLoading && !isDivisionLoading"
          @selectedOptionId="updateZoneId"
          :options="divisions"
          @functionIdParams="getSub_divisions"
        />
      </div>
      <div class="w-full">
        <label class="label inline-block mb-2">Choose Your Division</label>
        <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
          <LoadingIndicator />
        </div>
        <BaseDropdown
          v-if="!isLoading && !isSubdivisionLoading"
          @selectedOptionId="updateZoneId"
          :options="sub_divisions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { getZones } from '@/services/zoneService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'



export default {
  // eslint-disable-next-line vue/multi-word-component-names

  name: 'SectorSide',

  async created() {
    try {
      this.isLoading = true

      await this.getRegions()
    } catch (error) {
      console.error('Failed to load :', error)
    } finally {
      this.isLoading = false
    }
  },

  data() {
    return {
      isLoading: false,

      region_id: '1',

      division_id: '1',
      Subdivision_id: '1',
      isDivisionLoading: false,
      isSubdivisionLoading: false,
      regions: [
        {
          id: 0,
          name: 'Choose a region',
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      divisions: [
        {
          id: 0,
          name: 'Choose a division',
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      sub_divisions: [
        {
          id: 0,
          name: 'Choose a sub-division',
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ]
    }
  },
  methods: {
    async getRegions() {
      try {
        this.regions = this.regions.concat(await getZones(2, null))
      } catch (error) {
        console.log(error)
      }
    },

    async getDivisions(parent_id) {
      try {
        this.isDivisionLoading = true
        //delete all element and allow the first only
        this.divisions = this.divisions.length > 0 ? [this.divisions[0]] : [];
        this.divisions = this.divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isDivisionLoading = false
      }
    },
    
    async getSub_divisions(parent_id) {
      this.isSubdivisionLoading = true
      try {
        this.sub_divisions = this.sub_divisions.length > 0 ? [this.sub_divisions[0]] : [];
        this.sub_divisions = this.sub_divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isSubdivisionLoading = false
      }
    },


  },
  props: {
    sectorArray: {
      type: Array,
      required: true
    },
    updatesectorChecked: {}
  },
  components: {
    BaseDropdown,
    LoadingIndicator
  }
}
</script>

<style scoped>
.title {
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

.label {
  color: var(--body-dark, #1b1b1b);
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}
</style>

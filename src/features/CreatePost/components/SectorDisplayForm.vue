<template>
  <div class="mb-4 mx-auto p-6 bg-white rounded-lg shadow">
    <TitleSubtitle label="Sectors" message="Select your the sectors of interest for this post" />
    <div class="grid grid-cols-2 md:grid-cols-5 gap-7 content-between mb-5">
      <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
        <base-checkbox
          :key="sector.name"
          :list="sector"
          @change="updatesectorChecked"
        ></base-checkbox>
      </div>
    </div>

    <TitleSubtitle label="Select Zone" message="Select the zone you will like this post to reach" />

    <div class="flex flex-row space-x-4 justify-between">
      <div class="w-1/2">
        <label class="inline-block mb-2">Choose Your Region</label>
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
      <div class="w-1/2">
        <label class="inline-block mb-2">Choose Your Division</label>
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
      <div class="w-1/2">
        <label class="inline-block mb-2">Choose Your Division</label>
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
    </div>
  </div>
</template>
<script>
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import TitleSubtitle from '@/components/base/TitleSubtitle.vue'
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { getZones } from '@/services/zoneService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'


export default {
  name: 'SectorDisplayForm',

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
        this.sub_divisions = this.sub_divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isSubdivisionLoading = false
      }
    },


  },
  components: { TitleSubtitle, BaseCheckbox, BaseDropdown,LoadingIndicator },
  props: {
    sectors: {},
    updatesectorChecked: {},
    updateZoneId: {}
  }
}
</script>

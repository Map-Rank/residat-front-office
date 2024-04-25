<template>
  <SectionTitle :title="sectionTitle" />
<div>

  <div class=" grid align-middle items-start">
    
    <div class="  bg-white p-2 md:p-3 rounded-lg  " >
      <div class="grid w-full space-y-1">
        <div class="w-full">
          <p class="label inline-block mb-1">Choose Your Region</p>
          <div v-if="isLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <BaseDropdown
            v-model="region_id"
            v-if="!isLoading"
            :options="regions"
            @selectedOptionId="returnZoneId"
            @functionIdParams="getDivisions"
            @input="returnZone"
            
            />
          </div>
          <div class="w-full">
            <p class="label inline-block mb-1">Choose Your Division</p>
            <div v-if="isDivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
            v-model="division_id"
            v-if="!isLoading && !isDivisionLoading"
            @selectedOptionId="returnZoneId"
            :options="divisions"
            @input="returnZone"
            @functionIdParams="getSub_divisions"
            />
          </div>
          <div class="w-full">
            <p class="label inline-block mb-1">Choose Your Sub-division</p>
            <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
            v-model="Subdivision_id"
            v-if="!isLoading && !isSubdivisionLoading"
            @selectedOptionId="returnZoneId"
            @input="returnZone"
            :options="sub_divisions"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { getZones } from '@/services/zoneService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'

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

    this.loadSelectionFromLocalStorage();
  },

  data() {
    return {
      isLoading: false,

      region_id: '',
      sectionTitle: 'Select Location',

      division_id: '',
      Subdivision_id: '',
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
    returnZoneId(id) {
      this.filterPostFunctionWithId(id)
    },

    returnZone(zone){
      this.updateZone(zone);
      localStorage.setItem('selectedSubdivision', zone.id);
      // this.saveSelectionToLocalStorage();
    },

    async getRegions() {
      try {
        this.regions = this.regions.concat(await getZones(2, null))
      } catch (error) {
        console.log(error)
      }
    },

    async getDivisions(parent_id) {
      localStorage.setItem('selectedRegion', parent_id);
      try {
        this.isDivisionLoading = true
        //delete all element and allow the first only
        this.divisions = this.divisions.length > 0 ? [this.divisions[0]] : []
        this.divisions = this.divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isDivisionLoading = false
      }
    },

    async getSub_divisions(parent_id) {
      localStorage.setItem('selectedDivision', parent_id);
      this.isSubdivisionLoading = true
      try {
        this.sub_divisions = this.sub_divisions.length > 0 ? [this.sub_divisions[0]] : []
        this.sub_divisions = this.sub_divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isSubdivisionLoading = false
      }
    },

    loadSelectionFromLocalStorage() {
      var selectedRegion = localStorage.getItem('selectedRegion');
      var selectedDivision = localStorage.getItem('selectedDivision');
      var selectedSubdivision = localStorage.getItem('selectedSubdivision');

      if (selectedRegion) this.region_id = selectedRegion;
      if (selectedDivision) this.division_id = selectedDivision;
      if (selectedSubdivision) this.Subdivision_id = selectedSubdivision;

      console.log(this.region_id);
      console.log(this.division_id);
      console.log(this.Subdivision_id);
    },
  },
  props: {
    filterPostFunctionWithId: {},
    updateZone:{}
  },
  components: {
    BaseDropdown,
    LoadingIndicator,
    SectionTitle
  }
}
</script>

<style scoped>




.label {
  color: var(--body-dark, #1b1b1b);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

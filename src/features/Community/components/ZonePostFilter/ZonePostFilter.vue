5q<template>
  <SectionTitle :title="sectionTitle" />

  <!-- <div class="bg-white md:p-6 rounded-lg h-[250px] grid align-middle items-center" > -->
  <div class="bg-white md:p-6 rounded-lg h-[250px] grid align-middle items-center" >
    <div class="grid w-full">
      <div class="w-full">
        <label class="label inline-block mb-2">Choose Your Region</label>
        <div v-if="isLoading" class="flex h-full justify-center">
          <LoadingIndicator />
        </div>
        <BaseDropdown
          v-if="!isLoading"
          :options="regions"
          @selectedOptionId="returnZoneId"
          @functionIdParams="getDivisions"
          @selectedOptionName="returnZoneName"
          
          />
        </div>
        <div class="w-full">
          <label class="label inline-block mb-2">Choose Your Division</label>
          <div v-if="isDivisionLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <BaseDropdown
          v-if="!isLoading && !isDivisionLoading"
          @selectedOptionId="returnZoneId"
          :options="divisions"
          @selectedOptionName="returnZoneName"
          @functionIdParams="getSub_divisions"
          />
        </div>
        <div class="w-full">
          <label class="label inline-block mb-2">Choose Your Sub-division</label>
          <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <BaseDropdown
          v-if="!isLoading && !isSubdivisionLoading"
          @selectedOptionId="returnZoneId"
          @selectedOptionName="returnZoneName"
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
  },

  data() {
    return {
      isLoading: false,

      region_id: '1',
      sectionTitle: 'Select Location',

      division_id: '',
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
    returnZoneId(id) {
      this.filterPostFunctionWithId(id)
    },


    returnZoneName(name){
this.updateZoneName(name)
    },

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
        this.divisions = this.divisions.length > 0 ? [this.divisions[0]] : []
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
        this.sub_divisions = this.sub_divisions.length > 0 ? [this.sub_divisions[0]] : []
        this.sub_divisions = this.sub_divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isSubdivisionLoading = false
      }
    }
  },
  props: {
    filterPostFunctionWithId: {},
    updateZoneName:{}
  },
  components: {
    BaseDropdown,
    LoadingIndicator,
    SectionTitle
  }
}
</script>

<style scoped>
.title {
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

.label {
  color: var(--body-dark, #1b1b1b);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}
</style>

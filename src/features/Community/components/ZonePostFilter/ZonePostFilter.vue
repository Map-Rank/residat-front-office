<template>
  <SectionTitle :title="sectionTitle" />
  <div>
    <div class="grid align-middle items-start">
      <div class="bg-white p-2 md:p-3 rounded-lg">
        <div class="grid w-full space-y-1">
          <div class="w-full">
            <p class="label inline-block mb-1">{{ $t('choose_your_region') }}</p>
            <div v-if="isLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
              v-if="!isLoading"
              :options="regions"
              @selectedOptionId="returnZoneId"
              @functionIdParams="getDivisions"
              @input="returnZone"
            />
          </div>
          <div class="w-full">
            <p class="label inline-block mb-1">{{ $t('choose_your_division') }}</p>
            <div v-if="isDivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
              v-if="!isLoading && !isDivisionLoading"
              @selectedOptionId="returnZoneId"
              :options="divisions"
              @input="returnZone"
              @functionIdParams="getSub_divisions"
            />
          </div>
          <div class="w-full">
            <p class="label inline-block mb-1">{{ $t('choose_your_subdivision') }} </p>
            <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
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
      if (this.props_regions.length == 1) {
        await this.getRegions()
      }
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
      sectionTitle: this.title || this.$t('select_location_title') ,

      division_id: '',
      Subdivision_id: '1',
      isDivisionLoading: false,
      isSubdivisionLoading: false,
      regions: this.props_regions,
      divisions: this.props_divisions,
      sub_divisions: this.props_sub_divisions
    }
  },
  methods: {
    returnZoneId(id) {
      if(id){
        this.filterPostFunctionWithId(id)
      }
    },

   returnZone(zone) {
    console.log('this is the zone '+ zone);
     if(this.updateZone !== null && zone.id != null) {
       this.updateZone(zone);
       return
     } 
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
        this.sub_divisions = [this.sub_divisions[0]]
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
    updateZone: {
      type:Function
    },
    title:String,
    props_regions: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: 'Choose a region'
        }
      ]
    },
    props_divisions: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: 'Choose a division'
        }
      ]
    },
    props_sub_divisions: {
      type: Array,
      default: () => [
        {
          id: 0,
          name: 'Choose a sub-division'
        }
      ]
    }
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

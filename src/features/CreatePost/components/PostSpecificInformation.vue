<template>
  <div class="mb-4 mx-auto  bg-white rounded-lg ">
    <TitleSubtitle :label="$t('select_zone_title')" :message="$t('select_zone_message')" />
    <div class="flex flex-row space-x-4 mb-5 justify-between">
      <div class="w-1/2">
            <label class="inline-block mb-2">{{ $t('choose_your_region') }}</label>
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
            <label class="inline-block mb-2">{{ $t('choose_your_division') }}</label>
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
          <label class="inline-block mb-2">{{ $t('choose_your_subdivision') }} </label>
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

<TitleSubtitle :label="$t('sectors')" :message="$t('select_sectors_message')" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 content-between">
      <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
        <base-checkbox
          :key="sector.name"
          :list="sector"
          @change="updatesectorChecked"
        ></base-checkbox>
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
  name: 'PostSpecificInformation',

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
          name: this.$t('choose_your_region'),
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      divisions: [
        {
          id: 0,
          name: this.$t('choose_your_division'),
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      sub_divisions: [
        {
          id: 0,
          name: this.$t('choose_your_subdivision'),
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
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
  components: { TitleSubtitle, BaseCheckbox, BaseDropdown, LoadingIndicator },
  props: {
    sectors: {},
    updatesectorChecked: {},
    updateZoneId: {}
  }
}
</script>

<style scoped>
label {
  font-size: 14px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

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
            />
          </div>
          <div class="w-full">
            <p class="label inline-block mb-1">{{ $t('choose_your_division') }}</p>
            <div v-if="isDivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />`
            </div>
            <BaseDropdown
              v-if="!isLoading && !isDivisionLoading"
              @selectedOptionId="returnZoneId"
              :options="divisions"
            />
          </div>
          <div class="w-full">
            <p class="label inline-block mb-1">{{ $t('choose_your_subdivision') }}</p>
            <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
              v-if="!isLoading && !isSubdivisionLoading"
              @selectedOptionId="returnZoneId"
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
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import { checkAuthentication } from '@/utils/authUtils.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names

  name: 'CommunityZoneFilter',

  async created() {
  },

  data() {
    return {
      isLoading: false,

      region_id: '1',
      sectionTitle: this.title || this.$t('select_location_title'),

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

      
      if (!checkAuthentication()) {
        return
      }
      
      if (id) {
    
        this.filterPostFunctionWithId(id)
      }
    },

  },
  props: {
    filterPostFunctionWithId: {},

    title: String,
    props_regions: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: 'Cameroon'
        }
      ]
    },
    props_divisions: {
      type: Array,
      default: () => [
        {
          id: null,
          name: 'Choose a division'
        }
      ]
    },
    props_sub_divisions: {
      type: Array,
      default: () => [
        {
          id: null,
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

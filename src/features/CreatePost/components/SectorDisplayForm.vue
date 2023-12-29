<template>
  <div class="mb-4 mx-auto p-6 bg-white rounded-lg shadow">
    <div class="grid mb-5">
      <label class="inline-block mb-2">Sector</label>
      <span>Select your sector of interest</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-7 content-between">
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

export default {
  name: 'SectorDisplayForm',
  components: { BaseCheckbox },
  props: {
    sectors: {},
    updatesectorChecked: {}
  }
}
</script>
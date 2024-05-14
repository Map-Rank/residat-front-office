<template>
 <section-title
 :title="sectionTitle"
 ></section-title>
  <div class=" bg-white  p-2 md:p-3 rounded-lg">
    <ul class="grid space-y-6">
      <li v-for="sector in sectorArray" :key="sector">
        <base-checkbox
          :key="sector.name"
          :list="sector"
          @change="updatesectorChecked"
        ></base-checkbox>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseCheckbox from '../../../../components/base/BaseCheckbox.vue'
import SectionTitle from '../../../../components/base/SectionTitle.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names

  name: 'SectorSide',
  data() {
    return {
      sectionTitle:this.$t('select_sector_title'),
      sectors: this.sectorArray
    }
  },
  props: {
    sectorArray: {
      type: Array,
      required: true
    },
    updatesectorChecked: {}
  },
  components: {
    BaseCheckbox,
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

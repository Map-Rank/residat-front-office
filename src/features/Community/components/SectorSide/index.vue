<template>
  <div class=" bg-white  p-6 rounded-lg">
    <h2 class="title  text-primary-normal font-bold mb-5">Categories</h2>
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
import BaseCheckbox from '../../../../components/base/BaseCheckbox.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names

  name: 'SectorSide',
  data() {
    return {
      sectors: this.sectorArray // initialize with your set of sectors
    }
  },
  props: {
    sectorArray: {
      type: Array,
      required: true
    },
    updatesectorChecked: {}
  },
  components:{
    BaseCheckbox
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

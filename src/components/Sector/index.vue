<template>
  <div class="bg-gray-200 rounded-lg">
    <h2 class="title font-bold mb-5">Sectors</h2>
    <ul class="grid space-y-6">
      <li v-for="sector in sectorArray" :key="sector">
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            :id="'checkbox-' + sector"
            class="form-checkbox h-6 w-6 border-3 border-transparent rounded bg-transparent checked:bg-blue-500 checked:border-transparent focus:outline-none transition duration-200"
          />
          <span class="label">{{ sector }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sector',
  data() {
    return {
      sectors: this.sectorArray // initialize with your set of sectors
    }
  },
  props: {
    sectorArray: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.title {
  color: var(--primary-normal, #021d40);
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

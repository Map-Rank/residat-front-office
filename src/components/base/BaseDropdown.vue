<template>
  <div class="dropdown-container relative">
    <select
      v-model="selectedOption"
      @change="updateSelectedOption"
      class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:border-primary-normal"
    >
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option.name }}
      </option>
    </select>
    <!-- <button @click="()=>{
      console.log(selectedOption);
    }">click</button> -->
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedOption: this.options.length > 0 ? this.options[0] : null
    }
  },
  methods: {
    updateSelectedOption() {
      if (this.selectedOption) {
        this.$emit('input', this.selectedOption)
        this.$emit('functionIdParams' , this.selectedOption.id)
      } else {
        console.error('No option is selected')
      }
    }
  }
}
</script>

<style scoped>
.dropdown-container {
  width: 100%; /* You can adjust the width as necessary */
}
</style>

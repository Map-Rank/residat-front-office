<template>
    <div class="dropdown-container relative">
      <select
        v-model="selectedOption"
        @change="updateSelectedOption"
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:border-primary-normal"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BaseDropdown',
    props: {
      options: {
        type: Array,
        required: true
      },
      value: [String, Number]
    },
    data() {
      return {
        selectedOption: this.value
      };
    },
    watch: {
      value(newValue) {
        this.selectedOption = newValue;
      }
    },
    methods: {
      updateSelectedOption() {
        this.$emit('input', this.selectedOption);
      }
    }
  };
  </script>
  
  <style scoped>
  .dropdown-container {
    width: 100%; /* You can adjust the width as necessary */
  }
  
  </style>
  
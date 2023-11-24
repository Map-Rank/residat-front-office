<template>
    <div class="flex items-center mb-2">
      <vee-field :name="name" :rules="rules" v-slot="{ field, error }">
        <input
          type="checkbox"
          v-bind="field"
          class="rounded text-primary-normal focus:ring-primary-light"
        />
        <label :for="name" class="ml-2 block text-sm text-body-dark">{{ label }}</label>
      </vee-field>
      <span class="text-danger-normal">{{ error }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      rules: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
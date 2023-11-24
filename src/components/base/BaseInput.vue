<template>
    <div class="mb-6">
      <label :for="name" class="inline-block mb-2">{{ label }}</label>
      <vee-field :name="name" :rules="rules" v-slot="{ field, error }">
        <input
          :id="name"
          :type="type"
          :placeholder="placeholder"
          v-bind="field"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
        <span class="text-danger-normal">{{ error }}</span>
      </vee-field>
    </div>
  </template>
  
  <script>
  export default {
    name:'BaseIput',
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
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
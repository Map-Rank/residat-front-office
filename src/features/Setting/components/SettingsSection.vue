<template>
    <div class="my-4 bg-white shadow-sm rounded-lg py-6">
      <h3 class="font-bold text-xl  md:text-2xl  px-5 mb-6">{{ title }}</h3>
      <div class="">
        <settings-item
          v-for="(item, index) in items"
          :key="index"
          :title="item.name"
          :route="item.route"
        ></settings-item>
      </div>
    </div>
  </template>
  
  <script>
  import SettingsItem from './SettingsItem.vue';
  
  export default {
    name: 'SettingsSection',
    components: {
      SettingsItem
    },
    props: {
      title: String,
      items: Array
    }
  };
  </script>
  
  <style scoped>
  /* Scoped CSS will go here if needed */
  </style>
  
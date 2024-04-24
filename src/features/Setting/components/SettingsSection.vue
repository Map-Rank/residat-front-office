<template>
    <div class="my-4">
      <div class="font-bold text-lg mb-2">{{ title }}</div>
      <div class="bg-white shadow-sm rounded-lg">
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
  
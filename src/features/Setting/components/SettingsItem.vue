<template>
    <div
      class="p-4 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-100"
      @click="navigateTo(route)"
    >
      {{ title }}
      <span class="float-right">→</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SettingsItem',
    props: {
      title: String,
      route: String
    },
    methods: {
      navigateTo(route) {
        // Logic to navigate to the specified route
        // this.$router.push({ name: route });
        console.log('Navigating to:', route);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Scoped CSS will go here if needed */
  </style>
  
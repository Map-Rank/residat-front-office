<template>
    <div
      class=" flex justify-between p-5 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-100"
      @click="navigateTo(route)"
    >
    <p class="text-sm sm:text-base md:text-xl " >{{ title }}</p>
      
      <span class="text-2xl font-bold">→</span>
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
  
<template>
    <div class="grid gap-10 w-full text-center h-full bg-gray-100">
      <h1>fishing</h1>
     <fishing></fishing>
     <waterStress></waterStress>
     <social></social>
     <migration></migration>
     <health></health>
    </div>
  </template>
  
  <script>
  import fishing from '@/components/vulnerabilities/fishing.vue'
  import waterStress from '@/components/vulnerabilities/waterStress.vue'
  import social from '@/components/vulnerabilities/social.vue'
  import migration from '@/components/vulnerabilities/migration.vue'
  import health from '@/components/vulnerabilities/health.vue'


  export default {
      name: "VulnerabilitiesForms",
      props: {
        errorMessage: {
          type: String,
          default: "This section is still under construction. Check back soon!"
        }
      },

      components: {
fishing,
waterStress,
social,migration,health
  },
  }
  </script>
  
  <style scoped>
  /* Styles go here */
  </style>
  
<template>
    <div class="flex h-screen bg-primary-light">
      <div class="flex-1 overflow-auto">
        <div class="container mx-auto p-6">
            <settings-section
              title="Profile Information"
              :items="profileItems"
            ></settings-section>
            <settings-section
              title="General Prefences"
              :items="generalItems"
            ></settings-section>
          </div>
      </div>
    </div>
  </template>
  
  <script>

import SettingsSection from '@/features/Setting/components/SettingsSection.vue'

  export default {
    name:'AccountPreferences',
    components: {
        // SideBarItem,
        SettingsSection,

    },

    methods:{
      isActive(routerName) {
      if (this.$route.name === routerName) {
        return true
      } else {
        return false
      }
    },
    },
    data() {
    return {
      iconSize: 'w-[30px] h-[30px]',
      profileItems: [
        { name: 'Name, location and enterprise', route: 'update-profile' },
        { name: 'Center of interest', route: 'account-preferences' }
      ],
      generalItems: [
        { name: 'Language', route: 'account-preferences' },
        { name: 'Close Account', route: 'account-preferences' }
      ],

    };
  }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  
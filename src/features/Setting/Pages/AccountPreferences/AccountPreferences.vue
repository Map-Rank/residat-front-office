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
        { name: this.$t('name_location_enterprise'), route: 'update-profile' },
        { name: this.$t('center_of_interest'), route: 'account-preferences' }
      ],
      generalItems: [
        { name: this.$t('language'), route: 'account-preferences' },
        { name: this.$t('close_account'), route: 'account-preferences' }
      ],

    };
  }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  
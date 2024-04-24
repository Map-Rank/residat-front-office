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
        { name: 'Center of interest', route: 'community' }
      ],
      generalItems: [
        { name: 'Language', route: 'community' },
        { name: 'Close Account', route: 'community' }
      ],
      navItems: [
        {
          svgContent: '\\assets\\icons\\profile-outline.svg',
          svgContentHover: '\\assets\\icons\\profile-fill.svg',
          labelText: 'Account preferences',
          isActive: false,
          right: true,
          routerName: 'community'
        },
        {
          svgContent: '\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: '\\assets\\icons\\dashboard-fill.svg',
          labelText: 'Sign In & Security',
          isActive: false,
          right: true,
          routerName: 'dashbaord'
        },
      ]
    };
  }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  
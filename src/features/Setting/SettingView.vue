<template>
    <div class="flex h-screen bg-primary-light">
      <!-- Sidebar -->
      <div class="w-64 bg-white hidden sm:block">
        <div class="flex flex-col h-full">
          <!-- Sidebar content here -->
          <!-- Add more sidebar items as needed -->
          <SideBarItem title="Account preferences"></SideBarItem>
          <SideBarItem title="Sign in & security"></SideBarItem>
          <SideBarItem title="Visibility"></SideBarItem>
          <SideBarItem title="Data privacy"></SideBarItem>
          <SideBarItem title="Advertising data"></SideBarItem>
          <SideBarItem title="Notifications"></SideBarItem>
        </div>
      </div>
      <!-- Settings content -->
      <div class="flex-1 overflow-auto">
        <div class="container mx-auto p-6">
            <settings-section
              title="Profile Information"
              :items="profileItems"
            ></settings-section>
            <settings-section
              title="General Presences"
              :items="generalItems"
            ></settings-section>
          </div>
      </div>
    </div>
  </template>
  
  <script>
import SideBarItem from './components/SideBarItem.vue';
import SettingsSection from '@/features/Setting/components/SettingsSection.vue'

  export default {
    name:'SettingView',
    components: {
        SideBarItem,
        SettingsSection

    },
    data() {
    return {
      profileItems: [
        { name: 'Name, location and enterprise', route: '/name-location' },
        { name: 'Center of interest', route: '/center-interest' }
      ],
      generalItems: [
        { name: 'Language', route: '/language' },
        { name: 'Close Account', route: '/close-account' }
      ]
    };
  }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  
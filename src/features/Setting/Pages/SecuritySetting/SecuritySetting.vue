<template>
    <div class="flex h-screen bg-primary-light">
      <div class="flex-1 overflow-auto">
        <div class="container mx-auto p-6">
            <settings-section
              :title="$t('security')"
              :items="profileItems"
            ></settings-section>
          </div>
      </div>
    </div>
  </template>
  
  <script>

import SettingsSection from '@/features/Setting/components/SettingsSection.vue'

  export default {
    name:'SecuritySetting',
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
        { name: this.$t('password_management'), route: 'update-password' },
        { name: this.$t('phone_number'), route: 'security-setting' }
      ],


    };
  }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  
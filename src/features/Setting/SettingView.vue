<template>
    <div class="flex h-screen bg-primary-light">
      <!-- Sidebar -->
      <div class="w-2/8 bg-white hidden md:block">
        <div class="flex flex-col h-full">
          <div class="flex p-5 space-x-4 items-center " >
            <img src="\assets\images\Community\profile.png" class="h-[40px]" />
            <h2>Settings</h2>
          </div>

          <div class="p-5 space-y-5 ">

            <IconwithLabel
            v-for="(item, index) in navItems"
            :svgContentHover="item.svgContentHover"
            :svgContent="item.svgContent"
            :labelText="item.labelText"
            :labelTextRight="item.labelText"
            :textCss="'text-primary-normal text-lg ml-5'"
            :iconDesktopSize="this.iconSize"
            :isActive="item.isActive"
            :right="item.right"
           
           
            :key="index"
          ></IconwithLabel>
          </div>
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
              title="General Prefences"
              :items="generalItems"
            ></settings-section>
          </div>
      </div>
    </div>
  </template>
  
  <script>
// import SideBarItem from './components/SideBarItem.vue';
import SettingsSection from '@/features/Setting/components/SettingsSection.vue'
import IconwithLabel from '@/components/common/IconWithLabel/index.vue'

  export default {
    name:'SettingView',
    components: {
        // SideBarItem,
        SettingsSection,
        IconwithLabel

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
        { name: 'Name, location and enterprise', route: 'community' },
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
  
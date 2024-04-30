<template>
  <div class="flex h-screen bg-primary-light">
    <!-- Sidebar -->
    <div class="w-2/8 bg-white hidden md:block">
      <div class="flex flex-col h-full">
        <div class="flex p-5 space-x-4 items-center">
          <img src="\assets\images\Community\profile.png" class="h-[40px]" />
          <h2>Settings</h2>
        </div>

        <div class="p-5 space-y-5">
          <IconwithLabel
            v-for="(item, index) in sideBarItem"
            :svgContentHover="item.svgContentHover"
            :svgContent="item.svgContent"
            :labelText="item.labelText"
            :labelTextRight="item.labelText"
            :textCss="'text-primary-normal text-lg ml-5'"
            :iconDesktopSize="this.iconSize"
            :isActive="isActive(item.routerName) || false"
            :right="item.right"
            :routerName="item.routerName"
            :key="index"
          ></IconwithLabel>
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-auto md:px-5 py-10 lg:px-[100px]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import IconwithLabel from '@/components/common/IconWithLabel/index.vue'

export default {
  name: 'SettingView',
  components: {
    IconwithLabel
  },

  methods: {
    isActive(routerName) {
      if (this.$route.name === routerName) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      iconSize: 'w-[30px] h-[30px]',
      sideBarItem: [
        {
          svgContent: '\\assets\\icons\\profile-outline.svg',
          svgContentHover: '\\assets\\icons\\profile-fill.svg',
          labelText: 'Account preferences',
          isActive: false,
          right: true,
          routerName: 'account-preferences'
        },
        {
          svgContent: '\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: '\\assets\\icons\\dashboard-fill.svg',
          labelText: 'Sign In & Security',
          isActive: false,
          right: true,
          routerName: 'security-setting'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>

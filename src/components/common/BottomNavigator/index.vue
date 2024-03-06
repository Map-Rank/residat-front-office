<!-- eslint-disable no-useless-escape -->
<template>
  <div class="  py-4 px-2  bg-white ">
      <!-- Navigation Links -->
      <nav class="flex  md:flex-row items-center space-x-10 justify-between">
        <icon-with-label
          v-for="(item, index) in navItems"
          :svgContentHover="item.svgContentHover"
          :svgContent="item.svgContent"
          :labelText="item.labelText"
          :labelTextBottom="item.labelText"
          :iconDesktopSize="this.iconSize"
          :isActive="isActive(item.routerName)"
          :bottom="item.bottom"
          :routerName="item.routerName"
          :key="index"
        ></icon-with-label>
      </nav>
  </div>
</template>

<script>
import IconWithLabel from '../IconWithLabel/index.vue'

export default {
  name: 'BottomNavigationApp',
  components: {
    IconWithLabel
  },
  data() {
    return {
      isMenuOpen: false,
      iconSize: 'w-7 h-7',
      navItems: [
        {
          svgContent: '\\assets\\icons\\community-outline.svg',
          svgContentHover: '\\assets\\icons\\community-fill.svg',
          labelText: 'Community',
          isActive: false,
        //   bottom: true,
          routerName: 'community'
        },
        {
          svgContent: '\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: '\\assets\\icons\\dashboard-fill.svg',
          labelText: 'Dashboard',
          isActive: false,
          routerName: 'dashbaord'
        },
        {
          svgContent: '\\assets\\icons\\add-circle-outline.svg',
          svgContentHover: '\\assets\\icons\\add-circle-outline.svg',
          labelText: 'Make Post',
          isActive: false,
        //   bottom: true,
          routerName: 'create-post'
        },
        {
          svgContent: '\\assets\\icons\\notification-outline.svg',
          svgContentHover: '\\assets\\icons\\notification-fill.svg',
          labelText: 'Notification',
          isActive: false,
          routerName: 'event'
        },
        {
          svgContent: '\\assets\\icons\\chat-outline.svg',
          svgContentHover: '\\assets\\icons\\chat-fill.svg',
          labelText: 'Profile',
          isActive: false,
          routerName: 'chat-room'
        //   bottom: true
        },
      ]
    }
  },

  methods: {

    isActive(routerName) {
      if (this.$route.name === routerName) {
        return true
      } else {
        return false
      }
    },

  }
}
</script>

<style lang="scss" scoped>


</style>

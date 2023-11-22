<!-- eslint-disable no-useless-escape -->
<template>
  <div class=" content py-4 px-2 ">
      <!-- Navigation Links -->
      <nav class="flex  md:flex-row items-center space-x-10 justify-between">
        <icon-with-label
          v-for="(item, index) in navItems"
          :svgContentHover="item.svgContentHover"
          :svgContent="item.svgContent"
          :labelText="item.labelText"
          :labelTextBottom="item.labelText"
          :iconDesktopSize="this.iconSize"
          :isActive="item.isActive"
          :bottom="item.bottom"
          :routerName="item.routerName"
          @clickIcon="clickIcon(index)"
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
          svgContent: 'src\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: 'src\\assets\\icons\\dashboard-fill.svg',
          labelText: 'Dashboard',
          isActive: false,
          routerName: 'dashbaord'
        },
        {
          svgContent: 'src\\assets\\icons\\community-outline.svg',
          svgContentHover: 'src\\assets\\icons\\community-fill.svg',
          labelText: 'Community',
          isActive: false,
        //   bottom: true,
          routerName: 'community'
        },
        {
          svgContent: 'src\\assets\\icons\\add-circle-outline.svg',
          svgContentHover: 'src\\assets\\icons\\add-circle-outline.svg',
          labelText: 'Make Post',
          isActive: false,
        //   bottom: true,
          routerName: 'chat-room'
        },
        {
          svgContent: 'src\\assets\\icons\\chat-outline.svg',
          svgContentHover: 'src\\assets\\icons\\chat-fill.svg',
          labelText: 'Profile',
          isActive: false,
        //   bottom: true
        },
      ]
    }
  },

  methods: {
    //This is the method that permit us to change an icon-with-label to active and is called by the child component
    clickIcon(index) {
      this.navItems = this.navItems.map((item, i) => {
        if (i == index) {
          return { ...item, isActive: !item.isActive }
        }

        return { ...item, isActive: false }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

content {
  background-color: var(--white-normal, #fff);
}
</style>

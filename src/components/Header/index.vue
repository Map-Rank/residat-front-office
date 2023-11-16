<!-- eslint-disable no-useless-escape -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="py-4 md:px-100">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center space-x-6 p-4 md:hidden">
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />
      <div class="flex-grow items-center">
        <input
          type="search"
          placeholder="Search"
          class="h-8 p-2 w-10 bg-gray-300 rounded-md w-full w-3"
        />
      </div>
    </div>

    <!-- Full menu for larger screens, hidden menu for mobile -->
    <div
      :class="{ flex: isMenuOpen, hidden: !isMenuOpen }"
      class="flex-col md:flex-row md:flex item-center"
    >
      <!-- Logo -->
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />

      <!-- Search bar -->
      <div class="flex-grow items-center">
        <input
          type="search"
          placeholder="Search"
          class="h-8 p-2 m-4 bg-gray-300 rounded-md w-full md:w-auto"
        />
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col md:flex-row items-center space-x-10">
        <icon-with-label
          v-for="(item, index) in navItems"
          :svgContentHover="item.svgContentHover"
          :svgContent="item.svgContent"
          :labelText="item.labelText"
          :labelTextBottom="item.labelText"
          :iconSize="this.iconSize"
          :isActive="item.isActive"
          :bottom="item.bottom"
          @toggleActive="toggleActive(index)"
          :key="index"
        ></icon-with-label>
      </nav>
      <br />
    </div>
  </header>
</template>

<script>
import IconWithLabel from '../IconWithLabel/index.vue'

export default {
  name: 'HeaderApp',
  components: {
    IconWithLabel
  },
  data() {
    return {
      isMenuOpen: false,
      iconSize: 'w-7 h-7',
      //Array of all icon-with-label
      navItems: [
        {
          svgContent: 'src\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: 'src\\assets\\icons\\dashboard-fill.svg',
          labelText: 'Dashboard',
          isActive: false,
          bottom: true
        },
        {
          svgContent: 'src\\assets\\icons\\community-outline.svg',
          svgContentHover: 'src\\assets\\icons\\community-fill.svg',
          labelText: 'Community',
          isActive: false,
          bottom: true
        },
        {
          svgContent: 'src\\assets\\icons\\chat-outline.svg',
          svgContentHover: 'src\\assets\\icons\\chat-fill.svg',
          labelText: 'Chat',
          isActive: false,
          bottom: true
        },
        {
          svgContent: 'src\\assets\\icons\\profile-outline.svg',
          svgContentHover: 'src\\assets\\icons\\profile-fill.svg',
          labelText: 'Profile',
          isActive: false,
          bottom: true
        },
        {
          svgContent: 'src\\assets\\icons\\post-outline.svg',
          svgContentHover: 'src\\assets\\icons\\post-fill.svg',
          labelText: 'Post',
          isActive: false,
          bottom: true
        },
        {
          svgContent: 'src\\assets\\icons\\subscribe-outline.svg',
          svgContentHover: 'src\\assets\\icons\\subscribe-fill.svg',
          labelText: 'Subscribe',
          isActive: false,
          bottom: true
        }
      ]
    }
  },

  methods: {
    //This is the method that permit us to change an icon-with-label to active and is called by the child component
    toggleActive(index) {
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
header {
  background-color: var(--white-normal, #fff);
}
</style>

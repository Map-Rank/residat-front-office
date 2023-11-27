<!-- eslint-disable no-useless-escape -->
<template>
  <header class="py-4 md:px-100">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center space-x-6 py-2 p-4 md:hidden">
      
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />

      <div class="flex-grow items-center">
        <input
          type="search"
          placeholder="Search"
          class="search gray h-8 p-2 w-10  rounded-md w-full w-3"
         
        />
      </div>

      <icon-with-label
          svgContentHover='src\assets\icons\profile-outline.svg'
          svgContent="src\\assets\\icons\\profile-fill.svg"
          labelText="Profile"
          labelTextBottom="Profile"
          iconDesktopSize="this.iconSize"
          :isActive="true"
          :bottom="false"
          routerName="dashbaord"
          @clickIcon="clickIcon(index)"
         
      ></icon-with-label>
    </div>

    <!-- Full menu for larger screens, hidden menu for mobile -->
    <div
      :class="{ flex: isMenuOpen, hidden: !isMenuOpen }"
      class="flex-col md:flex-row md:flex item-center"

    >

      <!-- Logo -->
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />

      <!-- Search bar -->
      <div 
     
      class="  flex flex-grow    items-center">
        <div class="search flex p-2  ml-5 rounded-lg ">

          <img src="@\assets\icons\Search.svg" alt="">
          <input
            type="search"
            placeholder="Search "
           
            class="flex-grow bg-transparent ml-3  focus:border-none rounded-md outline-none  hover:border-none transition-colors duration-200"
          />
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col md:flex-row items-center space-x-10">
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
      <br />
    </div>
  </header>
</template>

<script>
import IconWithLabel from '../IconWithLabel/index.vue'
import {mapState} from 'pinia'
import useAuthStore from '../../../stores/auth'
export default {
  name: 'HeaderApp',
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
          bottom: true,
          routerName:'dashbaord'
        },
        {
          svgContent: 'src\\assets\\icons\\community-outline.svg',
          svgContentHover: 'src\\assets\\icons\\community-fill.svg',
          labelText: 'Community',
          isActive: false,
          bottom: true,
          routerName:'community'
        },
        {
          svgContent: 'src\\assets\\icons\\chat-outline.svg',
          svgContentHover: 'src\\assets\\icons\\chat-fill.svg',
          labelText: 'Chat',
          isActive: false,
          bottom: true,
        routerName:'chat-room'
      },
      {
        svgContent: 'src\\assets\\icons\\profile-outline.svg',
          svgContentHover: 'src\\assets\\icons\\profile-fill.svg',
          labelText: 'Profile',
          isActive: false,
          bottom: true,
          routerName:'social-profile'
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
    clickIcon(index) {
      this.navItems = this.navItems.map((item, i) => {
        if (i == index) {
          return { ...item, isActive: !item.isActive }
        }

        return { ...item, isActive: false }
      })
    }
  },
  computed:{
    ...mapState(useAuthStore,['hiddenClass'])
  }
}
</script>

<style lang="scss" scoped>
.search{
  background-color: var(--primary-light, #E6E8EC);
  border-color:#E6E8EC ;
}

header {
  background-color: var(--white-normal, #fff);
}
</style>

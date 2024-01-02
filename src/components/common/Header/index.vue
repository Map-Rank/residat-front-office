<!-- eslint-disable no-useless-escape -->
<template>
  <header class="py-4 md:px-100">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center space-x-6 py-2 p-4 md:hidden">
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />

      <div class="flex-grow items-center">
        <input type="search" placeholder="Search" class="search gray h-8 p-2 rounded-md" />
      </div>

      <icon-with-label
        svgContentHover="assets\icons\profile-outline.svg"
        svgContent="assets\icons\profile-fill.svg"
        labelText="Profile"
        labelTextBottom="Profile"
        iconDesktopSize="this.iconSize"
        :isActive="true"
        :bottom="false"
        routerName="social-profile"
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
      <SearchBar />

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

        <icon-with-label
          svgContentHover="\assets\icons\logout.svg"
          svgContent="\assets\icons\logout.svg"
          labelText="Logout"
          labelTextBottom="Logout"
          iconDesktopSize="this.iconSize"
          :isActive="true"
          :bottom="true"
          @customFunction="logout"
        ></icon-with-label>
      </nav>
      <br />
    </div>
  </header>
</template>

<script>
import IconWithLabel from '../IconWithLabel/index.vue'
import useAuthStore from '../../../stores/auth'
import { useRouter } from 'vue-router'
import SearchBar from '@/components/base/SearchBar.vue'

export default {
  name: 'HeaderApp',
  components: {
    SearchBar,
    IconWithLabel
  },
  data() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router,
      isMenuOpen: false,
      iconSize: 'w-7 h-7',
      navItems: [
        {
          svgContent: 'assets\\icons\\dashboard-outline.svg',
          svgContentHover: 'assets\\icons\\dashboard-fill.svg',
          labelText: 'Dashboard',
          isActive: false,
          bottom: true,
          routerName: 'dashbaord'
        },
        {
          svgContent: 'assets\\icons\\community-outline.svg',
          svgContentHover: 'assets\\icons\\community-fill.svg',
          labelText: 'Community',
          isActive: false,
          bottom: true,
          routerName: 'community'
        },
        {
          svgContent: 'assets\\icons\\chat-outline.svg',
          svgContentHover: 'assets\\icons\\chat-fill.svg',
          labelText: 'Chat',
          isActive: false,
          bottom: true,
          routerName: 'chat-room'
        },
        {
          svgContent: 'assets\\icons\\profile-outline.svg',
          svgContentHover: 'assets\\icons\\profile-fill.svg',
          labelText: 'Profile',
          isActive: false,
          bottom: true,
          routerName: 'social-profile'
        },
        {
          svgContent: 'assets\\icons\\post-outline.svg',
          svgContentHover: 'assets\\icons\\post-fill.svg',
          labelText: 'Post',
          isActive: false,
          bottom: true,
          routerName: 'create-post'
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
    },


    logout() {
      this.authStore.logOut();
      this.$router.push({ name: 'authentication' }).catch(err => {
        // Ignore the Vue Router error regarding navigating to the page we are currently on.
        if (err.name !== 'NavigationDuplicated') {
          console.error(err);
        }
      });
    }
    
  },

}
</script>

<style lang="scss" scoped>
.search {
  background-color: var(--primary-light, #e6e8ec);
  border-color: #e6e8ec;
}

header {
  background-color: var(--white-normal, #fff);
}
</style>

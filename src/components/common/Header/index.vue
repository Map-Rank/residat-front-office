<template>
  <header class="py-4 md:px-100 bg-white ">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center space-x-6 py-2 p-4 md:hidden">
      <img src="@\assets\images\Logos\logo-small-white.svg" alt="Logo" class="h-15" />

      <div class="flex-grow items-center">
        <input type="search" placeholder="Search" class="search gray h-8 p-2 rounded-md" />
      </div>

      <div class="menu relative">
        <icon-with-label
          svgContentHover="\assets\icons\profile-outline.svg"
          svgContent="\assets\icons\profile-fill.svg"
          labelText="Profile"
          labelTextBottom="Profile"
          :iconDesktopSize="this.iconSize"
          :isActive="true"
          :bottom="true"
          @customFunction="toggleMenu"
        ></icon-with-label>

        <!-- Dropdown Menu -->
        <div
          v-show="isMenuVisible"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
        >
          <button-ui
            :label="'Profile Page'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(0)"
          >
          </button-ui>

          <button-ui
            :label="'Create Post'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(1)"
          >
          </button-ui>

          <button-ui
            :label="'Logout'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(2)"
          >
          </button-ui>
        </div>
      </div>
    </div>

    <!-- Full menu for larger screens, hidden menu for mobile -->
    <div
      :class="{   }"
      class=" hidden sm:hidden md:flex w-full justify-between   "
    >
      <!-- Logo -->
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15 " />

      <!-- Search bar -->
      <div class="col-span-5 sm:px-4 flex flex-grow items-center justify-center w-full">
        <SearchBar  />
</div>

      <!-- Navigation Links -->
      <div class="col-span-3 grid justify-end">

        <nav class="flex flex-col md:flex-row items-center space-x-10">
          <icon-with-label
            v-for="(item, index) in navItems"
            :svgContentHover="item.svgContentHover"
            :svgContent="item.svgContent"
            :labelText="item.labelText"
            :labelTextBottom="item.labelText"
            :textCss="'text-primary-normal'"
            :iconDesktopSize="this.iconSize"
            :isActive="isActive(item.routerName) || false"
            :bottom="item.bottom"
            :routerName="item.routerName"
            :key="index"
          ></icon-with-label>
  
          <div class="menu relative">
            <icon-with-label
              svgContentHover="\assets\icons\profile-outline.svg"
              svgContent="\assets\icons\profile-fill.svg"
              labelText="Profile"
              labelTextBottom="Profile"
              :iconDesktopSize="this.iconSize"
              :isActive="true"
              :bottom="true"
              @customFunction="toggleMenu"
            ></icon-with-label>
  
            <!-- Dropdown Menu -->
            <div
              v-show="isMenuVisible"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
            >
              <button-ui
                :label="'Profile Page'"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(0)"
              >
              </button-ui>
  
              <button-ui
                :label="'Create Post'"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(1)"
              >
              </button-ui>
  
              <button-ui
                :label="'Logout'"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(2)"
              >
              </button-ui>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import IconWithLabel from '../IconWithLabel/index.vue'
import useAuthStore from '../../../stores/auth'
import { useRouter } from 'vue-router'
import SearchBar from '@/components/base/SearchBar.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'

export default {
  name: 'HeaderApp',
  components: {
    SearchBar,
    IconWithLabel,
    ButtonUi
  },
  data() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router,
      isMenuVisible: false,
      // isMenuOpen : ref(false),
      isActiveRoute: '',
      isMenuOpen: false,
      iconSize: 'w-7 h-7',
      navItems: [
        {
          svgContent: '\\assets\\icons\\community-outline.svg',
          svgContentHover: '\\assets\\icons\\community-fill.svg',
          labelText: 'Community',
          isActive: false,
          bottom: true,
          routerName: 'community'
        },
        {
          svgContent: '\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: '\\assets\\icons\\dashboard-fill.svg',
          labelText: 'Dashboard',
          isActive: false,
          bottom: true,
          routerName: 'dashbaord'
        },
        {
          svgContent: '\\assets\\icons\\chat-outline.svg',
          svgContentHover: '\\assets\\icons\\chat-fill.svg',
          labelText: 'Chat Room',
          isActive: false,
          bottom: true,
          routerName: 'chat-room'
        },
        {
          svgContent: '\\assets\\icons\\event-outline.svg',
          svgContentHover: '\\assets\\icons\\event-fill.svg',
          labelText: 'Event',
          isActive: false,
          bottom: true,
          routerName: 'event'
        },
        // {
        //   svgContent: '\\assets\\icons\\report-outline.svg',
        //   svgContentHover: '\\assets\\icons\\report-fill.svg',
        //   labelText: 'Report',
        //   isActive: false,
        //   bottom: true,
        //   routerName: 'report'
        // },
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

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },

    menuMethods(index) {
      console.log('click')
      switch (index) {
        case 0:
          this.$router.push({ name: 'social-profile' })
          this.toggleMenu()
          break
        case 1:
          this.$router.push({ name: 'create-post' })
          this.toggleMenu()
          break
        case 2:
          this.logout()
          break
      }
    },

    logout() {
      this.authStore.logOut()
      this.$router.push({ name: 'authentication' }).catch((err) => {
        // Ignore the Vue Router error regarding navigating to the page we are currently on.
        if (err.name !== 'NavigationDuplicated') {
          console.error(err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  background-color: var(--primary-light, #e6e8ec);
  border-color: #e6e8ec;
}
</style>

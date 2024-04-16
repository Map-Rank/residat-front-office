<template>
  <header class="py-1 md:px-8  lg:px-100 bg-white">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center space-x-6 py-1 p-4 md:hidden">
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />

      <div class="flex-grow items-center">
        <input type="search" placeholder="Search" class="search gray h-8 p-2 rounded-md" />
      </div>

      <div class="menu relative">
        <icon-with-label
          class="dropdown"
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
            :label="'Create Event'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(2)"
          >
          </button-ui>

          <button-ui
            :label="'Logout'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(3)"
          >
          </button-ui>
        </div>
      </div>
    </div>

    <!-- Full menu for larger screens, hidden menu for mobile -->
    <div :class="{}" class="hidden sm:hidden md:grid md:grid-cols-12 gap-x-4 w-full justify-between">
      <!-- Logo -->
      <div class="col-span-3">

        <div class="flex flex-col md:flex-row items-center md:space-x-5">
          <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="" />

          <div class="menu relative">
            <icon-with-label
              class="dropdown"
              :svgContent="authStore.user.avatar"
              :svgContentHover="authStore.user.avatar"
              labelText="Profile"
              :labelTextBottom="authStore.user.first_name"
              :iconDesktopSize="this.iconSize"
              :isActive="true"
              :bottom="true"
              @customFunction="toggleMenu"
            ></icon-with-label>
  
            <!-- Dropdown Menu -->
            <div
              ref="menu"
              v-show="isMenuVisible"
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
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
                :label="'Create Event'"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(2)"
              >
              </button-ui>
  
              <button-ui
                :label="'Logout'"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(3)"
              >
              </button-ui>
            </div>
          </div>
        </div>
      </div>

      <!-- Search bar -->
      <div class=" grid col-span-4  ">
        <div class=" w-[80%] grid items-center " >
          <SearchBar />
        </div>

      </div>

      <!-- Navigation Links -->
      <div class=" col-span-5   justify-self-end">
        <nav class="flex flex-col md:flex-row items-center space-x-10 md:space-x-5">
          <icon-with-label
            class=""
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

  created() {
    document.addEventListener('click', this.handleClickOutside)
  },

  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
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
          svgContent: '\\assets\\icons\\notification-outline.svg',
          svgContentHover: '\\assets\\icons\\notification-fill.svg',
          labelText: 'Notification',
          isActive: false,
          bottom: true,
          routerName: 'event'
        }
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

    // handleClickOutside(event) {
    //   if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
    //     this.isMenuVisible = false;
    //   }
    // },

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
          this.$router.push({ name: 'create-event' })
          this.toggleMenu()
          break
        case 3:
          this.toggleMenu()
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

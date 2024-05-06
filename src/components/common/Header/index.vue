<template>
  <header class="py-1 md:px-8 lg:px-100 bg-white">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center space-x-2 sm:space-x-6 py-1 p-4 md:hidden">
      <app-logo></app-logo>

      <div class="items-center">
        <SearchBar />
      </div>

      <div class="menu relative">
        <icon-with-label
          class="dropdown"
          :svgContent="
            authStore.user ? this.userProfileImage : 'assets\\images\\Community\\profile.png'
          "
          :svgContentHover="
            authStore.user ? this.userProfileImage : 'assets\\images\\Community\\profile.png'
          "
          :labelTextBottom="authStore.user ? authStore.user.first_name : null"
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
            :label="$t('profile_page')"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(0)"
          >
          </button-ui>

          <button-ui
            :label="$t('create_post')"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(1)"
          >
          </button-ui>
          <button-ui
            :label="$t('create_event')"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(2)"
          >
          </button-ui>
          <button-ui
            :label="$t('settings_privacy')"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(3)"
          >
          </button-ui>

          <button-ui
            :label="$t('logout')"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="menuMethods(4)"
          >
          </button-ui>
        </div>
      </div>
    </div>

    <!-- Full menu for larger screens, hidden menu for mobile -->
    <div
      :class="{}"
      class="hidden sm:hidden md:grid md:grid-cols-12 gap-x-4 w-full justify-between"
    >
      <!-- Logo -->
      <div class="col-span-3">
        <div class="flex flex-col md:flex-row items-center md:space-x-5">
          <app-logo></app-logo>

          <div class="menu relative">
            <icon-with-label
              class="dropdown"
              :textCss="'text-primary-normal text-xs'"
              :svgContent="'\\assets\\icons\\translate.svg'"
              :svgContentHover="'\\assets\\icons\\translate.svg'"
              :labelTextBottom="this.lang"
              :iconDesktopSize="this.iconSize"
              :isActive="true"
              :bottom="true"
              @customFunction="toggleMenuLangauge"
            ></icon-with-label>

            <div
              ref="menu"
              v-show="isMenulangauge"
              class="absolute left-0 mt-2 w-42 bg-white rounded-md shadow-lg z-10"
            >
              <button-ui
                :label="$t('en')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="changeLanguage('en')"
              >
              </button-ui>

              <button-ui
                :label="$t('fr')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="changeLanguage('fr')"
              >
              </button-ui>
            </div>
          </div>

          <div class="menu relative">
            <icon-with-label
              class="dropdown"
              :textCss="'text-primary-normal text-xs'"
              :svgContent="
                authStore.user ? this.userProfileImage : 'assets\\images\\Community\\profile.png'
              "
              :svgContentHover="
                authStore.user ? this.userProfileImage : 'assets\\images\\Community\\profile.png'
              "
              labelText="Profile"
              :labelTextBottom="authStore.user ? authStore.user.first_name : null"
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
                :label="$t('profile_page')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(0)"
              >
              </button-ui>

              <button-ui
                :label="$t('create_post')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(1)"
              >
              </button-ui>
              <button-ui
                :label="$t('create_event')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(2)"
              >
              </button-ui>
              <button-ui
                :label="$t('settings_privacy')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(3)"
              >
              </button-ui>

              <button-ui
                :label="$t('logout')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(4)"
              >
              </button-ui>
            </div>
          </div>
        </div>
      </div>

      <!-- Search bar -->
      <div class="grid col-span-4">
        <div class="w-[80%] grid items-center">
          <SearchBar />
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="col-span-5 justify-self-end">
        <nav class="flex flex-col md:flex-row items-center space-x-10 md:space-x-5">
          <icon-with-label
            class=""
            v-for="(item, index) in navItems"
            :svgContentHover="item.svgContentHover"
            :svgContent="item.svgContent"
            :labelText="item.labelText"
            :labelTextBottom="item.labelText"
            :textCss="'text-primary-normal text-xs'"
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
import AppLogo from '@/components/base/AppLogo.vue'
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

export default {
  name: 'HeaderApp',
  components: {
    SearchBar,
    IconWithLabel,
    ButtonUi,
    AppLogo
  },

  created() {
    document.addEventListener('click', this.handleClickOutside)
    this.lang=this.$i18n.locale
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
      isMenulangauge: false,
      isActiveRoute: '',
      userProfileImage: authStore && authStore.user ? authStore.user.avatar : '',
      isMenuOpen: false,
      iconSize: 'w-7 h-7',
      lang: 'en',
      navItems: [
        {
          svgContent: '\\assets\\icons\\community-outline.svg',
          svgContentHover: '\\assets\\icons\\community-fill.svg',
          labelText: this.$t('community'),
          isActive: false,
          bottom: true,
          routerName: 'community'
        },
        {
          svgContent: '\\assets\\icons\\dashboard-outline.svg',
          svgContentHover: '\\assets\\icons\\dashboard-fill.svg',
          labelText: this.$t('dashboard'),
          isActive: false,
          bottom: true,
          routerName: 'dashboard'
        },
        {
          svgContent: '\\assets\\icons\\chat-outline.svg',
          svgContentHover: '\\assets\\icons\\chat-fill.svg',
          labelText: this.$t('chat_room'),
          isActive: false,
          bottom: true,
          routerName: 'chat-room'
        },
        {
          svgContent: '\\assets\\icons\\event-outline.svg',
          svgContentHover: '\\assets\\icons\\event-fill.svg',
          labelText: this.$t('event'),
          isActive: false,
          bottom: true,
          routerName: 'event'
        }
      ]
    }
  },

  methods: {
   changeLanguage(lang) {
     this.lang = lang;
    localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, lang); 
     this.toggleMenuLangauge();
     window.location.reload();
   },
   
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
    toggleMenuLangauge() {
      this.isMenulangauge = !this.isMenulangauge
    },

    menuMethods(index) {
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
          this.$router.push({ name: 'setting' })
          this.toggleMenu()
          break
        case 4:
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

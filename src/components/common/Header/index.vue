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
          ref="menus"
          v-show="currentMenu === 'menu'"
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

          <div class="menu langMenu relative">
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
              v-show="currentMenu === 'language'"
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
              imageCss="rounded-lg"
            ></icon-with-label>

            <!-- Dropdown Menu -->
            <div
              ref="menu"
              v-show="currentMenu === 'menu'"
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
            >
              <button-ui
                :leftIcon="'\\assets\\icons\\profile-fill.svg'"
                :label="$t('profile_page')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(0)"
              >
              </button-ui>

              <button-ui
                :leftIcon="'\\assets\\icons\\post-fill.svg'"
                :label="$t('create_post')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(1)"
              >
              </button-ui>
              <button-ui
                :leftIcon="'\\assets\\icons\\event-fill.svg'"
                :label="$t('create_event')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(2)"
              >
              </button-ui>
              <button-ui
                :leftIcon="'\\assets\\icons\\setting-fill.svg'"
                :label="$t('settings_privacy')"
                :textCss="'text-left '"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="menuMethods(3)"
              >
              </button-ui>

              <button-ui
                :leftIcon="'\\assets\\icons\\logout-fill.svg'"
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
            @clickIcon="closeAllMenu()"
          ></icon-with-label>

          <div class="relative">
            <!-- <icon-with-label
              :textCss="'text-primary-normal text-xs'"
              :svgContent="'assets\\icons\\notification-outline.svg'"
              :svgContentHover="'assets\\icons\\notification-fill.svg'"
              labelText="Notification"
              :labelTextBottom="'Notification'"
              :iconDesktopSize="this.iconSize"
              :isActive="false"
              :bottom="true"
              @customFunction="toggleNotificationDropdown"
            ></icon-with-label> -->
            <!-- Circular Div at the top -->
            <!-- <div
            v-if="newMessagesCount"
              class="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              {{ newMessagesCount }}
            </div> -->
            <!-- Notification Dropdown -->
            <!-- <div
            ref="menus"
              v-show="currentMenu === 'notification'"
              class="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 max-h-[80vh] overflow-y-auto no-scrollbar"
            >
              <div class="p-4 text-center">
                <button @click="redirectToNotifications" class="text-blue-600 hover:underline">
                  see more
                </button>
              </div>

              <p class="text-center mb-4 " >{{$t('no_notification')}} </p>
              <ul 
              v-if="notifications.lenght > 0"
              class="divide-y divide-gray-200">
                <li
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="p-4 hover:bg-gray-100"
                >
                  <div class="flex items-start space-x-4">
                    <img :src="notification.image" alt="Profile" class="w-10 h-10 rounded-full" />
                    <div>
                      <p class="font-bold">{{ notification.title }}</p>
                      <p>{{ notification.body }}</p>
                      <p class="text-xs text-gray-500">{{ notification.time }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div> -->
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

  // created() {
  //   document.addEventListener('click', this.handleClickOutside)
  //   this.lang = this.$i18n.locale
  // },

  // unmounted() {
  //   document.removeEventListener('click', this.handleClickOutside)
  // },
  data() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore,
      router,
      newMessagesCount: null,
      isNotificationDropdownVisible: false,
      currentMenu: null,
      isActiveRoute: '',
      userProfileImage: authStore && authStore.user ? authStore.user.avatar : '',
      iconSize: 'w-7 h-7',
      lang: 'en',
      notifications: [],
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
        // {
        //   svgContent: '\\assets\\icons\\chat-outline.svg',
        //   svgContentHover: '\\assets\\icons\\chat-fill.svg',
        //   labelText: this.$t('inbox'),
        //   isActive: false,
        //   bottom: true,
        //   routerName: 'chat-room'
        // },
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
    redirectToNotifications() {
      this.$router.push({ name: 'notification' })
      this.isNotificationDropdownVisible = false
      this.closeAllMenu()
    },

    handleClickOutside(event) {
      const menus = this.$refs.menus
      if (menus) {
        let isClickOutside = true
        menus.forEach((menu) => {
          if (menu.contains(event.target)) {
            isClickOutside = false
          }
        })

        if (isClickOutside) {
          this.currentMenu = null
        }
      }
    },
    changeLanguage(lang) {
      this.lang = lang
      localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, lang)
      this.toggleMenuLangauge()
      window.location.reload()
    },

    isActive(routerName) {
      if (this.$route.name === routerName) {
        return true
      } else {
        return false
      }
    },

    toggleNotificationDropdown() {
      this.currentMenu = this.currentMenu === 'notification' ? null : 'notification'
    },

    toggleMenu() {
      this.currentMenu = this.currentMenu === 'menu' ? null : 'menu'
    },
    toggleMenuLangauge() {
      this.currentMenu = this.currentMenu === 'language' ? null : 'language'
    },
    closeAllMenu() {
      this.currentMenu = null
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
          if (window.confirm('Are you sure you want to log out?')) {
            this.logout()
          } else {
            console.log('Logout cancelled')
          }
          this.toggleMenu()
          break
      }
    },

    logout() {
      this.authStore.logOut()
      this.$router.push({ name: 'authentication' }).catch((err) => {
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
body {
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

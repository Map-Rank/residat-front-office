<template>
  <header class="bg-white p-4">
    <div class="container mx-auto flex justify-between items-center">

      <div class="flex flex-row items-center space-x-5">
        <AppLogo :isWhite="false" :alt="$t('header_logo_alt')"></AppLogo>
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
            v-show="isShowLangaugeMenu"
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
      </div>
      
      <!-- Burger Menu Icon for Mobile View -->
      <button 
        class="block lg:hidden text-primary-normal" 
        @click="toggleSidebar"
        :aria-label="$t('header_burger_menu')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Navbar Links for Large Screen -->
      <nav class="hidden lg:block">
        <ul class="flex space-x-4 text-primary-normal">
          <li v-for="(item, index) in navItems" :key="index">
            <a
              :href="absoluteHref(item.href)"
              class="text-center text-primary-normal sm:text-[16px] lg:text-[16px] font-normal font-['Poppins'] leading-normal"
            >
              {{ $t(item.label) }}
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="hidden lg:flex justify-between space-x-2">
        <ButtonUi
          :label="$t('header_register')"
          customCss="bg-secondary-normal text-center flex justify-center px-[40px] py-10"
          textCss="text-center text-white"
          @clickButton="navigateTo('register')"
          :isRoundedFull="true"
        ></ButtonUi>
        <ButtonUi
          :label="$t('header_sign_in')"
          customCss=" bg-secondary-normal text-center flex justify-center px-[40px] py-3"
          textCss="text-center text-white"
          :isRoundedFull="true"
          @clickButton="navigateTo('login')"
        ></ButtonUi>
      </div>
    </div>

    <!-- Sidebar for Mobile View -->
    <transition name="slide">
      <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" @click.self="toggleSidebar">
        <div class="fixed right-0 top-0 w-[60%] h-full bg-primary-normal p-4 space-y-4 shadow-lg z-50">
          <!-- Close Button -->
          <button class="text-white mb-4" @click="toggleSidebar" :aria-label="$t('header_close_menu')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <!-- Sidebar Links -->
          <div class="flex justify-end pb-[40px]">
            <AppLogo :isWhite="true" :alt="$t('header_logo_alt')"></AppLogo>
          </div>
          <ul class="space-y-4 text-primary-normal pb-10">
            <li v-for="(item, index) in navItems" :key="index">
              <a
                :href="absoluteHref(item.href)"
                class="block text-right text-white text-xl font-normal font-['Poppins'] leading-normal"
              >
                {{ $t(item.label) }}
              </a>
            </li>
          </ul>
          <div class="mt-4 flex flex-col space-y-2">
            <ButtonUi
              :label="$t('header_register')"
              customCss="bg-secondary-normal text-center flex justify-center px-10 py-4"
              textCss="text-center"
              :isRoundedFull="true"
              @clickButton="navigateTo('register')"
              :isDisabled="false"
            ></ButtonUi>
            <ButtonUi
              :label="$t('header_sign_in')"
              customCss="bg-secondary-normal text-center flex justify-center px-10 py-3"
              textCss="text-center"
              :isRoundedFull="true"
              @clickButton="navigateTo('login')"
            ></ButtonUi>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import AppLogo from '@/components/base/AppLogo.vue';
import ButtonUi from '@/components/base/ButtonUi.vue';
import IconWithLabel from '@/components/common/IconWithLabel/index.vue';
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

export default {
  name: 'HeaderLanding',
  components: {
    AppLogo,
    ButtonUi,
    IconWithLabel
  },
  data() {
    return {
      navItems: [
        { href: '#about-us', label: 'header_about_us' },
        { href: '#solution', label: 'header_solution' },
        { href: '#impact', label: 'header_impact' }
      ],
      isSidebarOpen: false,
      iconSize: 'w-7 h-7',
      lang: 'en',
      isShowLangaugeMenu:false
    };
  },
  methods: {
    toggleMenuLangauge() {
      this.isShowLangaugeMenu = !this.isShowLangaugeMenu
    },
    changeLanguage(lang) {
      this.lang = lang
      localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, lang)
      this.toggleMenuLangauge()
      window.location.reload()
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    navigateTo(tab) {
      const newTabUrl = this.$router.resolve({
        name: 'authentication',
        params: { tab: tab }
      }).href;
      window.open(newTabUrl, '_blank');
    },
    absoluteHref(relativeHref) {
      const baseUrl = window.location.origin;
      return `${baseUrl}/${relativeHref}`;
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles if necessary */
.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

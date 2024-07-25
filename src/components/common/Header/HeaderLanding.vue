<template>
  <header class="bg-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <AppLogo :isWhite="false" :alt="$t('header_logo_alt')"></AppLogo>
      
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

export default {
  name: 'HeaderLanding',
  components: {
    AppLogo,
    ButtonUi,
  },
  data() {
    return {
      navItems: [
        { href: '#about-us', label: 'header_about_us' },
        { href: '#solution', label: 'header_solution' },
        { href: '#impact', label: 'header_impact' }
      ],
      isSidebarOpen: false
    };
  },
  methods: {
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

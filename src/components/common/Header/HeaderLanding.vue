<template>
  <header class="bg-secondary-normal p-4">
    <div class="container mx-auto flex justify-between items-center">
      <AppLogo :isWhite="true"></AppLogo>
      
      <!-- Burger Menu Icon for Mobile View -->
      <button 
        class="block lg:hidden text-white" 
        @click="toggleSidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Navbar Links for Large Screen -->
      <nav class="hidden lg:block">
        <ul class="flex space-x-4 text-white">
          <li v-for="(item, index) in navItems" :key="index">
            <a
              :href="item.href"
              class="text-center text-white sm:text-[16px] lg:text-xl font-normal font-['Poppins'] leading-normal"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="hidden lg:flex justify-between space-x-2">
        <ButtonUi
          label="Register"
          colorObject="bg-white text-center w-auto"
          customCss="text-center flex justify-center px-[20px] py-10"
          textCss="text-center"
          :isRoundedFull="true"
        ></ButtonUi>
        <ButtonUi
          label="Sign In"
          colorObject="bg-white text-center w-auto"
          customCss="text-center flex justify-center px-[20px] py-3"
          textCss="text-center"
          :isRoundedFull="true"
        ></ButtonUi>
      </div>
    </div>

    <!-- Sidebar for Mobile View -->
    <transition name="slide">
      <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" @click.self="toggleSidebar">
        <div class="fixed right-0 top-0 w-[60%] h-full bg-primary-normal p-4 space-y-4 shadow-lg z-50">
          <!-- Close Button -->
          <button class="text-white mb-4" @click="toggleSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <!-- Sidebar Links -->
          <ul class="space-y-4 text-white">
            <li v-for="(item, index) in navItems" :key="index">
              <a
                :href="item.href"
                class="block text-right text-white text-xl font-normal font-['Poppins'] leading-normal"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
          <div class="mt-4 flex flex-col space-y-2">
            <ButtonUi
              label="Register"
              colorObject="bg-white text-center w-auto"
              customCss="text-center flex justify-center px-10 py-4"
              textCss="text-center"
              :isRoundedFull="true"
            ></ButtonUi>
            <ButtonUi
              label="Sign In"
              colorObject="bg-white text-center w-auto"
              customCss="text-center flex justify-center px-10 py-3"
              textCss="text-center"
              :isRoundedFull="true"
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
    ButtonUi
  },
  data() {
    return {
      navItems: [
        { href: '#about-us', label: 'About Us' },
        { href: '#solution', label: 'Solution' },
        { href: '#demo', label: 'Demo' },
        { href: '#blog', label: 'Blog' },
        { href: '#contact-us', label: 'Contact Us' }
      ],
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
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

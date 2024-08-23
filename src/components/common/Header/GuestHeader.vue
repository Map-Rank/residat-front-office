<template>
    <header class="bg-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <AppLogo :isWhite="false" :alt="$t('header_logo_alt')"></AppLogo>
        
    
  
   
        
        <div class="hidden lg:flex justify-between space-x-2">
          <ButtonUi
            :label="$t('header_register')"
            customCss="bg-secondary-normal text-center flex justify-center px-[40px] py-10"
            textCss="text-center text-white"
            @clickButton="navigateTo('register')"
            :isRoundedFull="true"
          ></ButtonUi>
        
        </div>
      </div>
 
    </header>
  </template>
  
  <script>
  import AppLogo from '@/components/base/AppLogo.vue';
  import ButtonUi from '@/components/base/ButtonUi.vue';
  
  export default {
    name: 'GuestHeader',
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
  
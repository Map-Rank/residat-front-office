<template>
  <div class="body flex flex-col min-h-screen">
    <header-app :class="hiddenClass"></header-app>

    <main class="flex-grow h-full">
      <router-view></router-view>
    </main>

    <bottom-navigation-app-app
      class="mobile-nav block md:hidden"
      :class="hiddenClass"
    ></bottom-navigation-app-app>

    <!-- <footer-app class="mt-auto" :class="!hiddenClass"></footer-app> -->
  </div>
</template>

<script>
import { mapState } from 'pinia'
import useAuthStore from './stores/auth'
import HeaderApp from './components/common/Header/index.vue'
import FooterApp from './components/common/Footer/index.vue'
import BottomNavigationAppApp from './components/common/BottomNavigator/index.vue'

export default {
  name: 'App',
  components: {
    HeaderApp,
    FooterApp,
    BottomNavigationAppApp
  },

  computed: {
    ...mapState(useAuthStore, ['hiddenClass'])
  }
}
</script>

<style scoped>
.body {
  background: var(--primary-light, #e6e8ec);
}

.mobile-nav {
  position: static;
}

@media only screen and (max-width: 480px) {
  .mobile-nav {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%; 
    z-index: 999; 
  }
}
</style>

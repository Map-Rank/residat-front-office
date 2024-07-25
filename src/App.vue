<template>
  <div></div>
  <div class="body flex flex-col min-h-screen">
    <!-- <LandingPage></LandingPage> -->
    <header-app :class="hiddenClass" class="fixed  w-full z-10"></header-app>
    <GuestHeader class="fixed  w-full z-10" :class="showClass"></GuestHeader>
    <!-- <HeaderLanding  :class="showClass" class="fixed  w-full z-10"> </HeaderLanding> -->

    <main class="flex-grow h-full py-20 md:pb-0  overflow-hidden">
      <router-view></router-view>
      <NotificationHandler />
    </main>

    <bottom-navigation-app-app
      class="mobile-nav block md:hidden mt-4"
      :class="hiddenClass"
      v-if="hideComponent"
    ></bottom-navigation-app-app>

    <FeedbackButton />
    
    <ModalsContainer />
    <AuthModal v-if="showAuthModal" @close="showAuthModal = false"  ></AuthModal>
 


  </div>
</template>

<script>
import { mapState } from 'pinia'
import useAuthStore from './stores/auth'
import HeaderApp from './components/common/Header/index.vue'
import FooterApp from './components/common/Footer/index.vue'
import BottomNavigationAppApp from './components/common/BottomNavigator/index.vue'
import usePostStore from '@/features/Post/store/postStore'
import useModalStore from '@/stores/modalStore.js'
import FeedbackButton from '@/components/base/FeedbackButton.vue'
import NotificationHandler from './components/base/NotificationHandler.vue'
import HeaderLanding from './components/common/Header/HeaderLanding.vue'
import LandingPage from './features/LandingPage/LandingPage.vue'
import { ModalsContainer } from 'vue-final-modal'
import GuestHeader from '@/components/common/Header/GuestHeader.vue'
import AuthModal from '@/components/common/Modal/AuthModal.vue'; 

export default {
  name: 'App',
  data() {
    const modalStore = useModalStore()

    return {
      modalStore,
      showAuthModal: false, 
    }
  },
  components: {
    HeaderApp,
    ModalsContainer,
    NotificationHandler,
    FeedbackButton,
    BottomNavigationAppApp,
    GuestHeader,
    AuthModal
  },

  computed: {
    ...mapState(useAuthStore, ['hiddenClass','showClass']),
    ...mapState(usePostStore, ['hideComponent'])
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
    width: 100%;
    z-index: 999;
  }
}
</style>

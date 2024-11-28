<template>
  <!-- <div class=" absoluted z-50 w-[20%] bg-black text-white p-6">{{statusMessage }}  </div> -->
  <div class="body flex flex-col min-h-screen">
    <header-app :class="hiddenClass" class="fixed w-full z-10"></header-app>
    <GuestHeader class="fixed w-full z-10" v-if="showGuessHeader"></GuestHeader>

    <main class="flex-grow h-full py-20 md:pb-0 overflow-hidden">
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
    <AuthModal v-if="showAuthModal" @close="showAuthModal = false"></AuthModal>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import useAuthStore from './stores/auth'
// import { useNotificationStore } from './stores/useNotificationStore'
import HeaderApp from './components/common/Header/index.vue'
import BottomNavigationAppApp from './components/common/BottomNavigator/index.vue'
import usePostStore from '@/features/Post/store/postStore'
import useModalStore from '@/stores/modalStore.js'
import FeedbackButton from '@/components/base/FeedbackButton.vue'
import NotificationHandler from './components/base/NotificationHandler.vue'
import { ModalsContainer } from 'vue-final-modal'
import GuestHeader from '@/components/common/Header/GuestHeader.vue'
import AuthModal from '@/components/common/Modal/AuthModal.vue'
import { getNotifications } from './services/notificationService'

export default {
  name: 'App',
  data() {
    const modalStore = useModalStore()

    return {
      notifications: [],
      institutionalNotifications: [],
      hasNewEvents: false,
      isLoading: false,
      showPageRefresh: false,
      modalStore,
      // showAuthModal: false,
      isOnline: navigator.onLine,
      statusMessage: navigator.onLine ? 'You are online.' : 'You are offline.'
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
    authStore() {
      return useAuthStore() // Use this only if you're using Pinia or similar for state management
    },
    ...mapState(useAuthStore, ['hiddenClass', 'showClass', 'showGuessHeader']),
    ...mapState(usePostStore, ['hideComponent']),
    ...mapState(useModalStore, ['showAuthModal'])
  },

  // mounted() {
  //   this.fetchNewNotifications()
  //   // Call this when App is mounted
  //   this.pollInterval = setInterval(this.fetchNewNotifications, 15000) // Check every 15 seconds
  // },

  // beforeUnmount() {
  //   // Clear interval when component is destroyed
  //   if (this.pollInterval) clearInterval(this.pollInterval)
  // },

  methods: {
    closeAuthModal() {
      this.showAuthModal = false
    },

  //   async fetchNewNotifications() {
  //     this.hasNewEvents = false
  //     this.isLoading = true

  //     // Retrieve last notification ID from localStorage
  //     const mostRecentNotification = JSON.parse(localStorage.getItem('mostRecentNotification'))
  //     const lastNotificationId = mostRecentNotification ? mostRecentNotification.id : 0
  //     console.log('Last stored notification ID:', lastNotificationId)

  //     try {
  //       const token = this.authStore.user.token

  //       // Pass the lastNotificationId to fetch only new notifications
  //       this.notifications = await getNotifications(0, 10, token, lastNotificationId)
  //       this.institutionalNotifications = await getNotifications(
  //         0,
  //         10,
  //         token,
  //         this.authStore.user.token,
  //         lastNotificationId
  //       )

  //       console.log('Fetched notifications:', this.notifications)

  //       // Store the most recent notification in localStorage if available
  //       if (this.notifications && this.notifications.length > 0) {
  //         // Update state/UI with new notifications
  //         this.notifications
  //         const mostRecentNotification = this.notifications.reduce(
  //           (max, notification) => (notification.id > max.id ? notification : max),
  //           this.notifications[0]
  //         )

  //         const mostRecentNotificationId = mostRecentNotification.id

  //         console.log('Most recent notification ID:', mostRecentNotificationId)

  //         // Update localStorage with the latest notification
  //         // localStorage.setItem('newNotifications', JSON.stringify(this.notifications));
  //         localStorage.setItem('mostRecentNotification', JSON.stringify(mostRecentNotification));

  //         localStorage.setItem('lastNotificationId', JSON.stringify(mostRecentNotificationId))

  //         // Prepare and send last notification to Service Worker
  //         const cloneableNotification = {
  //           id: mostRecentNotification.id,
  //           title: mostRecentNotification.titre_en,
  //           content_en: mostRecentNotification.content_en
  //         }

  //         if (navigator.serviceWorker.controller) {
  //           navigator.serviceWorker.controller.postMessage({
  //             action: 'setLastNotification',
  //             notification: cloneableNotification
  //           })
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Failed to load notifications:', error)
  //       this.showPageRefresh = true
  //     } finally {
  //       this.isLoading = false
  //     }
    
  // }
  // mounted() {
  //   // Load stored connectivity status if available
  //   const storedStatus = localStorage.getItem('connectivityStatus');
  //   this.statusMessage = storedStatus || (navigator.onLine ? 'You are online.' : 'You are offline.');

  //   // Listen for service worker messages for connectivity
  //   if (navigator.serviceWorker.controller) {
  //     navigator.serviceWorker.addEventListener('message', (event) => {
  //       if (event.data && event.data.isOnline !== undefined) {
  //         this.isOnline = event.data.isOnline;
  //         this.statusMessage = this.isOnline ? 'You are online.' : 'You are offline.';
  //         localStorage.setItem('connectivityStatus', this.statusMessage);

  //         // Fetch notifications if back online
  //         // if (this.isOnline) {
  //         //   this.fetchNotifications();
  //         // }
  //       }
  //     });
  //   }
  // },
}}
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
    z-index: 50;
  }
}
</style>

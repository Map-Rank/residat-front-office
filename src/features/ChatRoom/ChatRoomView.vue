<!-- src/pages/Notifications.vue -->
<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">{{ isInstitution ? 'Inbox' :'Inbox'}}</h1>
      <button v-if="isInstitution" @click="createNotification" class="bg-primary-normal text-white px-4 py-2 rounded">Send Mass Message</button>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-4">
      <button
        :class="['px-4 py-2 rounded-t-lg', activeTab === 'important' ? 'bg-primary-normal text-white' : 'bg-gray-200']"
        @click="activeTab = 'important'"
      >
        {{ isInstitution ? 'Recently Sent' : 'Important messages' }}
      </button>
      <!-- <button
        :class="['px-4 py-2 rounded-t-lg ml-2', activeTab === 'inbox' ? 'bg-primary-normal text-white' : 'bg-gray-200']"
        @click="activeTab = 'inbox'"
      >
        {{ isInstitution ? 'Proposal' : 'Inbox' }}
      </button> -->
    </div>

    <!-- Notifications List -->
    <div v-if="filteredNotifications.length" class="bg-white shadow-md rounded-lg">
      <NotificationItem 
        v-for="notification in filteredNotifications" 
        :key="notification.id" 
        :notification="notification" 
        :isInstitution="isInstitution" 
      />
    </div>
    <div v-else class="text-center mt-3">
      {{ $t('no_alert') }}
    </div>
  </div>
</template>

<script>
import NotificationItem from '../Notification/components/NotificationItem.vue'
import {getNotifications} from '@/services/notificationService.js'
import useAuthStore from '@/stores/auth.js'

export default {
  name: 'ChatRoomView',
  components: {
    NotificationItem,
  },

  async created() {
    // this.fetcheventById()
    try {
      // this.topLoading = true
      // this.isZoneLoading = true
      await this.fetchNotifications()
      // this.topLoading = false
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  data() {
    const authStore = useAuthStore()
    return {
      authStore,
      isInstitution: true, // Change this based on user type
      activeTab: 'important',
      notifications: [
      ],
    };
  },
  computed: {
    filteredNotifications() {
      // return this.notifications.filter(notification => notification.type === this.activeTab);
      return this.notifications
    }
  },
  methods: {
    createNotification() {
      this.$router.push({ name: 'broadcast-notification' });
    },

    async fetchNotifications() {
      this.hasNewEvents = false

      try {
        this.notifications = await getNotifications(0, 10, this.authStore.user.token)

        // this.recentEvents = await getEvents(0, 3, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load ntifications:', error)
        this.showPageRefresh = true
      } finally {
        console.log(' this are all notification ' +this.notifications);
        // this.topLoading = false
        // this.isZoneLoading = false
        // if (this.events.length == 0) {
        //   this.showPageRefresh = true
        //   this.errorMessage = 'Could not get post refresh your page or check your connection'
        // } else {
        //   this.showPageRefresh = false
        // }
      }
    },
  },
};
</script>

<style>
/* Custom styles if needed */
</style>

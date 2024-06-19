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
      <button
        :class="['px-4 py-2 rounded-t-lg ml-2', activeTab === 'inbox' ? 'bg-primary-normal text-white' : 'bg-gray-200']"
        @click="activeTab = 'inbox'"
      >
        {{ isInstitution ? 'Inbox' : 'Inbox' }}
      </button>
    </div>

    <!-- Notifications List -->
    <div v-if="activeTab === 'important' && !isInstitution">
      <div
        v-for="institution in institutionalNotifications"
        :key="institution.id"
        class="  mb-2"
      >
        <div class=" bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer" @click="toggleInstitution(institution.id)">
          <div class="flex items-center bg-white">
            <img :src="institution.avatar" alt="Institution Avatar" class="w-10 h-10 rounded-full mr-4">
            <div>{{ institution.name }}</div>
          </div>
          <div>{{ institution.notifications.length }} messages</div>
        </div>
        <div v-show="institution.isVisible" class="ml-5  rounded-lg mt-2">
          <NotificationItem 
            v-for="notification in institution.notifications" 
            :key="notification.id" 
            :notification="notification" 
            :isInstitution="isInstitution" 
          />
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'inbox' || isInstitution">
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
  </div>
</template>

<script>
import NotificationItem from '../Notification/components/NotificationItem.vue'
import { getNotifications } from '@/services/notificationService.js'
import useAuthStore from '@/stores/auth.js'

export default {
  name: 'ChatRoomView',
  components: {
    NotificationItem,
  },

  async created() {
    try {
      await this.fetchNotifications()
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  data() {
    const authStore = useAuthStore()
    return {
      authStore,
      isInstitution: false, // Change this based on user type
      activeTab: 'important',
      notifications: [],
      institutionalNotifications: [
        {
          id: 1,
          name: 'UNICEF',
          avatar: 'https://th.bing.com/th/id/R.8ba0a0bd48bee97f7b6d347b8efa96a3?rik=DNFW%2fU%2ff8%2fLFUQ&pid=ImgRaw&r=0',
          isVisible: false,
          notifications: [
            { id: 1, banner: 'https://th.bing.com/th/id/OIP.onIgi3XdIcwUhZYMlR7S1gHaE7?w=980&h=653&rs=1&pid=ImgDetMain', title: 'UNICEF Message 1', content_en: "This is a new notification for you guys pay attention please", time: '19m ago', isNew: true },
            { id: 2, banner: 'https://th.bing.com/th/id/OIP.onIgi3XdIcwUhZYMlR7S1gHaE7?w=980&h=653&rs=1&pid=ImgDetMain', title: 'UNICEF Message 2', content_en: "This is a new notification for you guys pay attention please", time: '1h ago', isNew: false },
          ],
        },
        {
          id: 2,
          name: 'Government',
          avatar: 'https://example.com/institution2.jpg',
          isVisible: false,
          notifications: [
            { id: 3, banner: 'https://example.com/avatar3.jpg', title: 'Government Message 1', content_en: "This is a new notification for you guys pay attention please", time: '30m ago', isNew: true },
            { id: 4, banner: 'https://example.com/avatar4.jpg', title: 'Government Message 2', content_en: "This is a new notification for you guys pay attention please", time: '2h ago', isNew: false },
          ],
        },
        // Add more institutions here
      ],
    };
  },
  computed: {
    filteredNotifications() {
      return this.notifications;
    }
  },
  methods: {
    createNotification() {
      this.$router.push({ name: 'broadcast-notification' });
    },
    toggleInstitution(id) {
      this.institutionalNotifications = this.institutionalNotifications.map(institution => {
        if (institution.id === id) {
          institution.isVisible = !institution.isVisible;
        } else {
          institution.isVisible = false;
        }
        return institution;
      });
    },
    async fetchNotifications() {
      this.hasNewEvents = false

      try {
        this.notifications = await getNotifications(0, 10, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load notifications:', error)
        this.showPageRefresh = true
      }
    },
  },
};
</script>

<style>
/* Custom styles if needed */
</style>

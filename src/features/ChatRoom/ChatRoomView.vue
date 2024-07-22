<!-- src/pages/Notifications.vue -->
<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">{{ isInstitution ? 'Inbox' :'Inbox'}}</h1>
      <button v-if="isInstitution" @click="createNotification" class="bg-primary-normal text-white px-4 py-2 rounded">Send Mass Message</button>
    </div>

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
        {{ isInstitution ? 'Inbox' : 'Inbox' }}
      </button> -->
    </div>

    <div v-if="isLoading">
      <AvatarEventShimmer :numShimmers="8" :componentHeight="'auto'"  />
    </div>

    <div v-else>
      <div v-if="activeTab === 'important' && !isInstitution">
        <div
          v-for="institution in institutionalNotifications"
          :key="institution.id"
          class="mb-2"
        >
          <div class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer" @click="toggleInstitution(institution.id)">
            <div class="flex items-center bg-white">
              <img :src="institution.avatar" alt="Institution Avatar" class="w-10 h-10 rounded-full mr-4">
              <div>{{ institution.name }}</div>
            </div>
            <div>{{ institution.notifications.length }} messages</div>
          </div>
          <div v-show="institution.isVisible" class="ml-5 rounded-lg mt-2">
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
  </div>
</template>

<script>
import NotificationItem from '../Notification/components/NotificationItem.vue'
import AvatarEventShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue'
import { getNotifications } from '@/services/notificationService.js'
import useAuthStore from '@/stores/auth.js'

export default {
  name: 'ChatRoomView',
  components: {
    NotificationItem,
    AvatarEventShimmer,
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
      isInstitution: false, 
      activeTab: 'important',
      isLoading: true,
      notifications: [],
      institutionalNotifications: [
        {
          id: 1,
          name: 'UNICEF',
          avatar: 'https://th.bing.com/th/id/R.f789c45e7c6126656eac8028cb7db28a?rik=BRNVQ2vHUkbikA&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2feTM%2fAM4%2feTMAM4bAc.jpg&ehk=uLmGOx7GjYzASsrK%2fRwkEzQimqj%2fXK4qoDBYGYrJNTg%3d&risl=&pid=ImgRaw&r=0',
          isVisible: false,
          notifications: [
            { id: 1, avatar: 'https://example.com/avatar1.jpg', title: 'UNICEF Message 1', content_en: "This is a new notification for you guys pay attention please", time: '19m ago', isNew: true },
            { id: 2, avatar: 'https://example.com/avatar2.jpg', title: 'UNICEF Message 2', content_en: "This is a new notification for you guys pay attention please", time: '1h ago', isNew: false },
          ],
        },
        {
          id: 2,
          name: 'Government',
          avatar: 'https://th.bing.com/th/id/R.8d50d8096e12fcfa504b0da1db39d8e0?rik=J7u%2fJGi6OGhaGQ&pid=ImgRaw&r=0&sres=1&sresct=1',
          isVisible: false,
          notifications: [
            { id: 3, avatar: 'https://example.com/avatar3.jpg', title: 'Government Message 1', content_en: "This is a new notification for you guys pay attention please", time: '30m ago', isNew: true },
            { id: 4, avatar: 'https://example.com/avatar4.jpg', title: 'Government Message 2', content_en: "This is a new notification for you guys pay attention please", time: '2h ago', isNew: false },
          ],
        },
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
      this.isLoading = true
      try {
        this.notifications = await getNotifications(0, 10, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load notifications:', error)
        this.showPageRefresh = true
      } finally {
        this.isLoading = false
      }
    },
  },
};
</script>



<!-- src/pages/Notifications.vue -->
<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">{{ isInstitution ? 'Last Alerts' :'Alerts'}}</h1>
      <button v-if="isInstitution" @click="createNotification" class="bg-primary-normal text-white px-4 py-2 rounded">Create Notification</button>
    </div>
    <div class="bg-white shadow-md rounded-lg">
      <NotificationItem 
        v-for="notification in notifications" 
        :key="notification.id" 
        :notification="notification" 
        :isInstitution="isInstitution" 
      />
    </div>
  </div>
</template>

<script>
import NotificationItem from '../Notification/components/NotificationItem.vue'

export default {
  name: 'ChatRoomView',
  components: {
    NotificationItem,
  },
  data() {
    return {
      isInstitution: true, // Change this based on user type
      notifications: [
        { id: 1, avatar: 'https://example.com/avatar1.jpg', message: 'Sarah NJOLLE reposted a photo.', time: '19m ago', isNew: true },
        { id: 2, avatar: 'https://example.com/avatar2.jpg', message: 'Your post impressions took off. They grew by 100+% on June 4. View your analytics.', time: '19m ago', isNew: true },
        { id: 3, avatar: 'https://example.com/avatar2.jpg', message: 'Your post impressions took off. They grew by 100+% on June 4. View your analytics.', time: '19m ago', isNew: true },
        { id: 4, avatar: 'https://example.com/avatar2.jpg', message: 'Your post impressions took off. They grew by 100+% on June 4. View your analytics.', time: '19m ago', isNew: true },
        // Add more notifications here
      ],
    };
  },
  methods: {
    createNotification() {
      this.$router.push({ name: 'broadcast-notification' });
    },
  },
};
</script>

<style>
/* Custom styles if needed */
</style>

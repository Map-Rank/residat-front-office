<template>
    <div class="notif-container">
      <h2>Recent Notifications</h2>
      <ul>
        <li v-for="notification in recentNotifications" :key="notification.id" class="notification-item">
          <h3>{{ notification.titre_en }}</h3>
          <p>{{ notification.content_en }}</p>
          <small>{{ new Date(notification.created_at).toLocaleString() }}</small>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
//   import { fetchRecentNotifications } from '@/services/recentnotification.js';
import {fetchRecentNotifications} from '@/services/recentNotificationService'

  export default {
    name: 'RecentNotification',
    data() {
      return {
        recentNotifications: { type: Object,
            required: true,}
      };
    },
    onmounted:{
        async getRecentNotif(){
            this.recentNotifications = await fetchRecentNotifications();
            console.log('bonjour',this.recentNotifications);
        }
    },
  };
  </script>
  
  <style scoped>
  .notif-container {
    padding: 16px;
    background: #f9f9f9;
  }
  .notification-item {
    border-bottom: 1px solid #ccc;
    padding: 12px 0;
  }
  </style>
  
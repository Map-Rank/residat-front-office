<!-- src/pages/Notifications.vue -->
<template>
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Notifications</h1>
        <button class="bg-primary-normal text-white px-4 py-2 rounded">View Settings</button>
      </div>
      <div v-if="notifications && notifications.length" class="bg-white shadow-md rounded-lg">
        <NotificationItem 
          v-for="notification in notifications" 
          :key="notification.id" 
          :notification="notification" 
          :isInstitution="isInstitution" 
        />
      </div>
      <div v-else class="text-center mt-3">
        No Notifications
      </div>
    </div>
  </template>
  
  <script>
import NotificationItem from './components/NotificationItem.vue'

  export default {

    name: 'NotificationView',
    components: {
    NotificationItem,
  },
    data() {
      return {
        imagelink:'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8',
        notifications: [
          // { id: 1, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Sarah NJOLLE reposted a photo.', time: '19m ago', showMenu: false,isNew: true },
          // { id: 2, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post impressions took off. They grew by 100+% on June 4. View your analytics.', time: '19m ago', showMenu: false ,isNew: true},
          // { id: 3, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Wilfried Okono just reposted.', time: '49m ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // { id: 4, avatar: 'https://media.licdn.com/dms/image/D4E03AQHMkHJumYTwYA/profile-displayphoto-shrink_200_200/0/1717553899571?e=1723075200&v=beta&t=_Ng4bwRZhDKlTvw0fCWb9R9eLLbDVUHUWyn5s6kdQN8', message: 'Your post has reached 173 impressions so far. View your post analytics.', time: '1h ago', showMenu: false ,isNew: false},
          // // Add more notifications here
        ]
      };
    },
    methods: {
      toggleMenu(id) {
        this.notifications = this.notifications.map(notification => {
          if (notification.id === id) {
            notification.showMenu = !notification.showMenu;
          } else {
            notification.showMenu = false;
          }
          return notification;
        });
      }
    }
  };
  </script>
  
  <style>
  /* Custom styles if needed */
  </style>
  
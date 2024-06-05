<!-- src/components/NotificationItem.vue -->
<template>
    <div :class="['flex items-start p-4 border-b', isNew ? 'bg-blue-50' : 'bg-white']">
      <img :src="notification.avatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4">
      <div class="flex-grow">
        <p class="font-semibold">{{ notification.message }}</p>
        <p class="text-sm text-gray-500">{{ notification.time }}</p>
      </div>
      <div class="relative">
        <button @click="toggleMenu" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v.01M12 12v.01M12 18v.01"></path>
          </svg>
        </button>
        <div v-if="showMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mark as Read</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotificationItem',
    props: {
      notification: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        showMenu: false,
      };
    },
    computed: {
      isNew() {
        return this.notification.isNew;
      },
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  
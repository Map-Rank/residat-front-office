<template>
  <div class="mb-4 p-4 bg-white rounded cursor-pointer">
    <!-- Event details -->
    <router-link to="/event" class="grid sm:flex mb-2">
      <!-- Event image -->
      <img :src="formatHostImageUrl(event.image)" class="rounded-[50%] h-[100px] mr-4" alt="event image" />
      <!-- Event information -->
      <div class="w-full">
        <div class="flex justify-between ">
          <h2 class="text-xl text-start font-semibold">{{ event.title }}</h2>

          <!-- Dropdown menu -->
          <div v-if="showMenu" class="menu relative">
            <button @click="toggleMenu" class="p-2 flex">
              <!-- Three dots icon -->
              <svg class="w-6 h-6" fill="true" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>
            <!-- Dropdown menu items -->
            <div v-show="isMenuVisible" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <button-ui :label="'Edit'" :textCss="'text-left '" :customCss="'items-left justify-start hover:bg-gray-100'" @clickButton="editPost()">
              </button-ui>
              <button-ui :label="'Delete'" :textCss="'text-left '" :customCss="'items-left justify-start hover:bg-gray-100'" @clickButton="deleteEvent()">
              </button-ui>
              <!-- <button-ui :label="'View'" :textCss="'text-left '" :customCss="'items-left justify-start hover:bg-gray-100'" @clickButton="viewPost()">
              </button-ui> -->
            </div>
          </div>
        </div>
        <div>
          <!-- Location and date -->
          <div class="flex items-center">
            <img src="\assets\icons\location.png" class="h-4 mr-1" alt="" srcset="" />
            <h5 class="zoneName">{{ event.location }},</h5>
            <span> Date : {{ event.published_at }}</span>
          </div>
        </div>
        <!-- Event description -->
        <p class="text-gray-700 text-start">{{ event.description }}</p>
      </div>
    </router-link>
    <!-- Read more link -->
    <div class="flex justify-end">
      <router-link to="/event" class="text-blue-600 hover:underline text-sm text-end">Read More</router-link>
    </div>
  </div>
</template>

<script>

import ButtonUi from '../../../components/base/ButtonUi.vue';
import { formatHostImageUrl } from '@/utils/formating';
import {deleteEvent} from '../../../services/eventService'
export default {
    name:'EventBox',
  props: {
    event: Object,
    showMenu: Boolean
  },
  components: {
    ButtonUi
  },
  data() {
    return {
      isMenuVisible: false,
      formatHostImageUrl
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    editPost() {
      // Handle edit post functionality
    },
    async deleteEvent(alertMessage = 'Are you sure you want to delete this post?') {
      if (window.confirm(alertMessage)) {
        console.log('Deleting post', this.event.id)
        try {
          await deleteEvent(this.event.id)
          window.location.reload()
        } catch (error) {
          console.error('Error deleting post:', error)
        }
      } else {
        console.log('Post deletion cancelled by user')
      }
    },
    viewPost() {
      // Handle view post functionality
    }
  }
};
</script>

<style>
.zoneName {
  font-size: 13px;
  color: gray;
  font-weight: 400;
}
/* Add any custom styles if necessary */
</style>

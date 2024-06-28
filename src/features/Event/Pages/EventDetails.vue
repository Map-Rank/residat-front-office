<template>
    <div class="container mx-auto p-6">
      <!-- Event Banner -->
      <div class="relative mb-6">
        <img :src="event.banner" alt="Event Banner" class="w-full h-64 object-cover rounded-lg shadow-lg">
        <div class="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-4 rounded-t-lg">
          <h1 class="text-3xl font-bold">{{ event.title }}</h1>
          <p class="text-sm">{{ event.humanize_date_creation }}</p>
        </div>
      </div>
  
      <!-- Event Details -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">{{ event.title }}</h2>
          <button v-if="showMenu" @click="toggleMenu" class="p-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
        </div>
        <div v-if="isMenuVisible" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <button-ui :label="'Edit'" :textCss="'text-left'" :customCss="'items-left justify-start hover:bg-gray-100'" @clickButton="editEvent" />
          <button-ui :label="'Delete'" :textCss="'text-left'" :customCss="'items-left justify-start hover:bg-gray-100'" @clickButton="deleteEvent" />
        </div>
  
        <div class="flex mb-4">
          <img :src="event.image" alt="Event Image" class="w-32 h-32 rounded-full mr-4">
          <div class="flex flex-col justify-center">
            <p class="text-lg font-semibold">{{ event.organized_by }}</p>
            <p class="text-sm text-gray-600">{{ event.location }}</p>
            <p class="text-sm text-gray-600">{{ event.published_at }}</p>
            <p class="text-sm text-gray-600">{{ event.date_debut }} - {{ event.date_fin }}</p>
          </div>
        </div>
        <p class="text-gray-700 mt-2">
          {{ trimmedDescription }}
          <button v-if="showReadMore" @click="toggleReadMore" class="text-blue-600 hover:underline">
            {{ isReadMore ? 'Read Less' : 'Read More' }}
          </button>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import ButtonUi from '@/components/base/ButtonUi.vue';
  import { deleteEvent } from '@/services/eventService';
  import UseEventStore from '@/stores/eventStore.js';
  
  export default {
    name: 'EventDetails',
    props: {
    //   event: Object,
      showMenu: Boolean
    },
    components: {
      ButtonUi
    },
    data() {
      const eventStore = UseEventStore();
      return {
        eventStore,
        isMenuVisible: false,
        isReadMore: false,
        descriptionLimit: 100,
        event: {
        id: 5,
        title: "Workshop on climate risks resilience",
        created_at: "2024-06-26T22:38:12.000000Z",
        date_debut: "2024-06-27 00:00:00",
        date_fin: "2024-06-28 00:00:00",
        description: "Building community capacity for adequately response to climate hazards and post hazard management",
        humanize_date_creation: "18 hours ago",
        image: "https://www.residat.com//storage/media/events/bricesikem@gmail.com/7TNKwDoAWfoAQkaJ8Ro7FULj4CbtZ7TWaxeNDwFT.jpg",
        location: "Kumba, community hall building behind Total",
        organized_by: "Mariba group",
        published_at: "2024-06-27 00:00:00",
        sector: {
          id: 7,
          name: "Waste and Pollution",
          deleted_at: null,
          created_at: "2024-06-09T16:37:00.000000Z"
        },
        zone: {
          id: 9,
          name: "SOUTH-WEST",
          parent_id: 1,
          level_id: 2,
          created_at: "2024-02-26T10:08:48.000000Z"
        },
        banner: "https://www.residat.com/storage/media/zone/SPqRcd2srnrpcNJEUTuOlI2ruxNweQqkYqwjhfr8.jpg"
      }
    ,
      };
    },
    computed: {
      trimmedDescription() {
        if (this.event.description.length <= this.descriptionLimit || this.isReadMore) {
          return this.event.description;
        }
        return this.event.description.slice(0, this.descriptionLimit) + '...';
      },
      showReadMore() {
        return this.event.description.length > this.descriptionLimit;
      }
    },
    methods: {
      toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible;
      },
      editEvent() {
        this.$router.push({ name: 'edit-event', params: { id: this.event.id } });
        this.toggleMenu();
      },
      async deleteEvent(alertMessage = 'Are you sure you want to delete this event?') {
        if (window.confirm(alertMessage)) {
          this.toggleMenu();
          try {
            await deleteEvent(this.event.id);
            this.$router.push({ name: 'events' });
          } catch (error) {
            console.error('Error deleting event:', error);
          }
        }
      },
      toggleReadMore() {
        this.isReadMore = !this.isReadMore;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  
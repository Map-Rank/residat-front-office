<template>
  <div class="container mx-auto p-6">
    <AvatarEventShimmer v-if="isLoading" :numShimmers="1" :componentHeight="'500px'" />

    <div v-if="!isLoading">
      <!-- Event Banner -->
      <div class="relative mb-6">
        <img
          :src="event.image"
          alt="Event Banner"
          class="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div class="absolute top-0 left-0 bg-black bg-opacity-70 text-white p-4 rounded-t-lg">
          <h1 class="text-3xl font-bold">{{ event.title }}</h1>
          <p class="text-sm text-white">{{ event.humanize_date_creation }}</p>
        </div>
      </div>

      <!-- Event Details -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">{{ event.title }}</h2>
          <button v-if="showMenu" @click="toggleMenu" class="p-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          v-if="isMenuVisible"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
        >
          <button-ui
            :label="'Edit'"
            :textCss="'text-left'"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="editEvent"
          />
          <button-ui
            :label="'Delete'"
            :textCss="'text-left'"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="deleteEvent"
          />
        </div>

        <div class="flex mb-4">
          <img :src="event.image" alt="Event Image" class="w-32 h-32 rounded-full mr-4" />
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
  </div>
</template>

<script>
import ButtonUi from '@/components/base/ButtonUi.vue'
import { deleteEvent } from '@/services/eventService'
import { getSpecificEvent } from '@/services/eventService.js'
import AvatarEventShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue'

export default {
  name: 'EventDetails',

  watch: {
    $route: {
      immediate: true,
      async handler() {
        this.isLoading = true

        try {
          this.event = await getSpecificEvent(this.eventId)
          this.isLoading = false
        } catch (error) {
          console.error('An error occurred while fetching the event:', error)
          this.isLoading = true
        } finally {
        //   console.log('Execution completed.')
        }
      }
    }
  },
  props: {
    //   event: Object,
    showMenu: Boolean,
    eventId: String
  },
  components: {
    ButtonUi,
    AvatarEventShimmer
  },
  data() {
    return {
      isMenuVisible: false,
      isReadMore: false,
      isLoading: false,
      descriptionLimit: 100,
      event: {}
    }
  },
  computed: {
    trimmedDescription() {
      if (this.event.description.length <= this.descriptionLimit || this.isReadMore) {
        return this.event.description
      }
      return this.event.description.slice(0, this.descriptionLimit) + '...'
    },
    showReadMore() {
      return this.event.description.length > this.descriptionLimit
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
    },
    editEvent() {
      this.$router.push({ name: 'edit-event', params: { id: this.event.id } })
      this.toggleMenu()
    },
    async deleteEvent(alertMessage = 'Are you sure you want to delete this event?') {
      if (window.confirm(alertMessage)) {
        this.toggleMenu()
        try {
          await deleteEvent(this.event.id)
          this.$router.push({ name: 'events' })
        } catch (error) {
          console.error('Error deleting event:', error)
        }
      }
    },
    toggleReadMore() {
      this.isReadMore = !this.isReadMore
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>

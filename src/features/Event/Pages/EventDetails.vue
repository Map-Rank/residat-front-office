<template>
  <div class="container mx-auto p-6">
    <AvatarEventShimmer v-if="isLoading" :numShimmers="1" :componentHeight="'500px'" />

    <div v-if="!isLoading">
      <!-- Event Banner -->
      <div class=" hidden relative mb-6">
        <img
          :src="event.image"
          alt="Event Banner"
          class="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
          @click="showImageModal(event.image)"
        />
        <div class="hidden md:block absolute top-0 left-0 bg-black bg-opacity-70 text-white p-2 rounded-t-lg">
          <h1 class=" text-[24px] font-bold">{{ event.title }}</h1>
          <p class="text-sm text-white">{{ event.humanize_date_creation }}</p>
        </div>
      </div>

      <!-- Event Details -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="md:text-[20px] sm:text-[18px] text-[18px]  font-semibold">{{ event.title }}</h2>
        </div>

        <div class="flex mb-4">
          <div class="flex flex-col justify-center">
            <p class="text-lg font-semibold">By: {{ event.organized_by }}</p>
            <p class="text-sm text-gray-600">
              <span class="text-[14px] text-body-darker font-semibold">Town : </span
              >{{ event.location }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="text-[14px] text-body-darker font-semibold">Date : </span
              >{{ event.published_at }}
            </p>
          </div>
        </div>
        <h3>Details</h3>
        <p class="text-gray-700 mt-2">
          {{ trimmedDescription }}
          <button v-if="showReadMore" @click="toggleReadMore" class="text-blue-600 hover:underline">
            {{ isReadMore ? 'Read Less' : 'Read More' }}
          </button>
        </p>
        <h3 class="my-4">Event Flyers</h3>
        <div class="h-[300px] overflow-x-auto flex space-x-4 bg-white border border-gray-300 rounded">
          <img :src="event.image" alt="" srcset="" class="h-full object-cover cursor-pointer" @click="showImageModal(event.image)">
      </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="isImageModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeImageModal">
      <div class="relative bg-white p-4 rounded shadow-lg max-h-[80vh] max-w-[90vw]" @click.stop>
        <button @click="closeImageModal" class="absolute top-2 right-2 text-[20px] text-red-700 hover:text-gray-800">
          &times;
        </button>
        <img :src="imageToPreview" alt="Image Preview" class="max-h-full w-auto rounded">
      </div>
    </div>
  </div>
</template>

<script>
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
    AvatarEventShimmer
  },
  data() {
    return {
      isMenuVisible: true,
      isReadMore: false,
      isLoading: false,
      descriptionLimit: 100,
      event: {},
      isImageModalVisible: false,
      imageToPreview: ''
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
    },
    showImageModal(imageUrl) {
      this.imageToPreview = imageUrl
      this.isImageModalVisible = true
    },
    closeImageModal() {
      this.isImageModalVisible = false
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>

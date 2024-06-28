<template>
  <div 
  @click="navigateEventDetail"
  class="mb-4 p-4 bg-white rounded cursor-pointer">
    <div to="/event-detail/1" class="grid sm:flex mb-2">
      <img :src="event.image" class="rounded-[50%] h-[100px] w-[100px] mr-4" alt="event image" />
      <div class="w-full">
        <div class="flex justify-between ">
          <h3 class="text-xl text-start">{{ event.title }}</h3>

          <!-- Dropdown menu -->
          <div v-if="showMenu" class="menu relative">
            <button @click="toggleMenu" class="p-2 flex">
              <svg class="w-6 h-6" fill="true" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>
            <div v-show="isMenuVisible" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <button-ui
                :label="'Edit'"
                :textCss="'text-left'"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="editPost"
              ></button-ui>
              <button-ui
                :label="'Delete'"
                :textCss="'text-left'"
                :customCss="'items-left justify-start hover:bg-gray-100'"
                @clickButton="deleteEvent"
              ></button-ui>
            </div>
          </div>
        </div>
        <div>
          <div class="grid items-center">
            <div class="flex items-center">
              <img src="/assets/icons/location.png" class="h-4 mr-1" alt="location icon" />
              <span class="span">{{ event.location }} • </span>
              <span class="span ml-1">{{ event.humanize_date_creation }}</span>
              <br />
            </div>
            <p class="span">Date: {{ event.published_at }}</p>
          </div>
        </div>
        <p class="text-gray-700 text-start mt-1 content">
          {{ truncatedDescription }}
          <span v-if="shouldShowReadMore" @click="toggleReadMore" class="text-blue-700 cursor-pointer">
            {{ showFullDescription ? 'Read less' : 'Read more' }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonUi from '../../../components/base/ButtonUi.vue';
import { formatHostImageUrl } from '@/utils/formating';
import { deleteEvent } from '../../../services/eventService';
import UseEventStore from '@/stores/eventStore.js';

export default {
  name: 'EventBox',
  props: {
    event: Object,
    showMenu: Boolean,
  },
  components: {
    ButtonUi,
  },
  data() {
    const eventStore = UseEventStore();
    return {
      eventStore,
      isMenuVisible: false,
      formatHostImageUrl,
      showFullDescription: false,
      maxDescriptionLength: 100, 
    };
  },
  computed: {
    truncatedDescription() {
      if (this.showFullDescription) {
        return this.event.description;
      } else {
        return this.event.description.length > this.maxDescriptionLength
          ? this.event.description.substring(0, this.maxDescriptionLength) + '...'
          : this.event.description;
      }
    },
    shouldShowReadMore() {
      return this.event.description.length > this.maxDescriptionLength;
    }
  },
  methods: {

    navigateEventDetail () {
      if (this.event.id) {
        console.log(this.event.id)

        this.$router.push({
          name: 'event-detail',
          params: {
            eventId: this.event.id,
          }
        })
      }
   
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    toggleReadMore() {
      this.showFullDescription = !this.showFullDescription;
    },
    editPost() {
      this.$router.push({ name: 'edit-event', params: { id: this.event.id } });
      this.toggleMenu();
    },
    async deleteEvent(alertMessage = 'Are you sure you want to delete this post?') {
      if (window.confirm(alertMessage)) {
        this.toggleMenu();
        console.log('Deleting post', this.event.id);
        try {
          await deleteEvent(this.event.id);
          window.location.reload();
        } catch (error) {
          console.error('Error deleting event:', error);
        }
      } else {
        console.log('Post deletion cancelled by user');
      }
    },
    viewPost() {},
  },
};
</script>

<style scoped>
.zoneName {
  font-size: 13px;
  color: gray;
  font-weight: 400;
}
.content {
  font-weight: 400;
}
.menu {
  color: var(--body-normal, #242424);
  margin-top: 2px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}
span {
  color: #3d6def;
  font-family: 'Poppins';
  font-size: 14px;
  font-style: medium;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

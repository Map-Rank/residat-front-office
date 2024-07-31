<template>
  <div class="container mx-auto p-6">
    <!-- Flexbox container for responsive design -->
    <div class="flex flex-col md:grid md:grid-cols-3 gap-4">
      <!-- Sidebar widgets moved above main content for mobile, but remains in place for desktop -->
      <div class="order-first md:order-last">
        <AvatarEventShimmer v-if="isZoneLoading" :numShimmers="1" :componentHeight="'auto'" />
        <div v-if="!isZoneLoading" class="mb-4 p-4 bg-white rounded shadow">
          <zone-post-filter
            :title="$t('select_event_by_location')"
            :props_regions="default_regions"
            :props_divisions="default_divisions"
            :props_sub_divisions="default_sub_divisions"
            :filterPostFunctionWithId="filterEventByZone"
            :updateZone="updateZone"
          ></zone-post-filter>
        </div>
      </div>

      <!-- Main content area -->
      <div class="md:col-span-2">
        <!-- Shimmer loading indicator -->
        <AvatarEventShimmer v-if="topLoading" :numShimmers="8" :componentHeight="'auto'" />

        <!-- Page refresh error -->
        <div v-if="showPageRefresh">
          <RefreshError
            :imgSize="400"
            :imageUrl="'assets\images\Community\loading.svg'"
            :errorMessage="errorMessage"
            @refreshPage="reloadEvents()"
          ></RefreshError>
        </div>

        <!-- Event Box list when not loading -->
        <div v-if="!topLoading">
          <EventBox v-for="event in events" :key="event.id" :event="event" :show-menu="showMenu" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { getEvents } from '../../services/eventService'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import useAuthStore from '@/stores/auth.js'
import { formatHostImageUrl } from '@/utils/formating'
import EventBox from './Components/EventBox.vue'
import AvatarEventShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue'
import ZonePostFilter from '@/features/Community/components/ZonePostFilter/ZonePostFilter.vue'
import { getFilterEvents } from '@/services/eventService.js'
import { checkAuthentication } from '@/utils/authUtils.js';

export default {
  name: 'EventView',
  async created() {
    // this.fetcheventById()
    if (checkAuthentication()) {
      this.isUserConnected = true
      }

    try {
      this.topLoading = true
      this.isZoneLoading = true
      await this.fetchEvents()
      this.topLoading = false
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  components: {
    RefreshError,
    EventBox,
    AvatarEventShimmer,
    ZonePostFilter
  },
  data() {
    const authStore = useAuthStore()
    return {
      authStore,
      formatHostImageUrl,
      topLoading: false,
      isZoneLoading: false,
      showPageRefresh: false,
      errorMessage: 'Sorry no event found',
      showMenu: false,
      isMenuVisible: false,
      events: [],
      
      isUserConnected:false,
      popularEvents: [
        {
          id: 1,
          title: 'Upcomming',
          excerpt: 'UPCOMMING EVENT'
        }
      ],
      default_regions: [
        {
          id: 0,
          name: 'Choose a region'
        }
      ],
      default_divisions: [
        {
          id: 0,
          name: 'Choose a division'
        }
      ],
      default_sub_divisions: [
        {
          id: 0,
          name: 'Choose a sub-division'
        }
      ]
      // ...other data
    }
  },

  methods: {
    async filterEventByZone(id) {
      console.log(id)

      this.zoneId = id || 1
      this.filteringActive = true
      this.hasFetchAllEvent = false

      try {
        this.topLoading = true

        this.events = await getFilterEvents(id != 1 ? id : null, null, null, null)
        // this.$router.push(`/community/${id}`);
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        this.filteringActive = true
        if (this.events.length == 0) {
          this.showPageRefresh = true
          this.errorMessage = 'No event found under this location , chose another location '
        } else {
          this.showPageRefresh = false
        }
      }
    },
    updateZone(zone) {
      console.log(zone)
    },

    async fetchEvents() {
      this.hasNewEvents = false
      console.log('fetching')

      try {
        this.events = await getEvents(0, 10, this.authStore?.user?.token,this.isUserConnected)
        // this.recentEvents = await getEvents(0, 3, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load events:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        this.isZoneLoading = false
        if (this.events.length == 0) {
          this.showPageRefresh = true
          this.errorMessage = 'Could not get event refresh your page or check your connection'
        } else {
          this.showPageRefresh = false
        }
      }
    },

    async reloadEvents() {
      this.topLoading = true

      this.showPageRefresh = false
      // this.hasFetchAllEvent = false
      // this.zoneName = this.authStore.user.zone.name
      await this.fetchEvents()
    },

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
      console.log(this.isMenuVisible)
    },

    editEvent() {
      console.log('edit post ')
      // this.setpostToEdit(this.post)
      // this.$router.push({ name: 'create-post' })
    },

    async deleteEvent(alertMessage = 'Are you sure you want to delete this post?') {
      if (window.confirm(alertMessage)) {
        console.log('Deleting post', this.postId)
        // try {
        //   await deleteEvent(this.postId)
        //   window.location.reload()
        // } catch (error) {
        //   console.error('Error deleting post:', error)
        // }
      } else {
        console.log('Event deletion cancelled by user')
      }
    },

    viewEvent() {
      // this.$router.push({ name: 'show-post', params: { id: this.post.id } })
    }
  }
}
</script>

<style>
.zoneName {
  font-size: 13px;
  color: gray;
  font-weight: 400;
}
/* Tailwind CSS will take care of most of the styling, but you can add custom styles if necessary */
</style>

<template>
  <div class="container mx-auto p-6">
    <div class="grid md:grid-cols-3 gap-4">
      <!-- Main content -->
      <div class="md:col-span-2">
        <div v-if="topLoading" class="flex h-full justify-center">
          <LoadingIndicator />
        </div>

        <div v-if="showPageRefresh">
          <RefreshError
            :imageUrl="'assets\\images\\Community\\loading.svg'"
            :errorMessage="errorMessage"
            @refreshPage="reloadEvents()"
          ></RefreshError>
        </div>
        <div v-if="!topLoading" >

          <div
            v-for="event in events"
            :key="event.id"
            class="mb-4 p-4 bg-white rounded  cursor-pointer"
          >
            <router-link to="/event-page" class="grid sm:flex mb-2">
              <img :src="formatHostImageUrl(event.image)" class=" rounded-[50%] h-[100px]  mr-4" alt="event image" />
              <div>
                <h2 class="text-xl text-start font-semibold">{{ event.title }}</h2>
                <div>
                  <div class="flex items-center ">
      
                    <img src="\assets\icons\location.png" class="h-4 mr-1 " alt="" srcset="">
                  <h5 class="zoneName" >{{ event.location }}, </h5>
                  <p style="font-weight: 400; margin: 0 1px;"></p>
                  <span class="">Date : {{ event.published_at }}</span>
                  
                  </div>
                  </div>
                <p class="text-gray-700 text-start">{{ event.description }}</p>
              </div>
            </router-link>
            <div class="flex justify-end">
              <router-link to="/event-page" class="text-blue-600 hover:underline text-sm text-end"
                >Read More</router-link
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar widgets -->
      <div>
        <!-- Popular events -->
        <div class="mb-4 p-4 bg-white rounded shadow">
          <h3 class="font-semibold mb-2">POPULAR EVENT</h3>
          <!-- Dynamic list of events -->
          <div v-for="post in popularPosts" :key="post.id" class="mb-2">
            <h4 class="text-sm font-semibold">{{ post.title }}</h4>
            <p class="text-gray-600 text-xs">{{ post.excerpt }}</p>
          </div>
        </div>

        <!-- Other widgets here -->
      </div>
    </div>
  </div>
</template>

<script>


import {getEvents} from '../../services/eventService'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import useAuthStore from '@/stores/auth.js';
import { formatHostImageUrl } from '@/utils/formating';

export default {
  name: 'EventView',
  async created() {
    // this.fetcheventById()
    try {
      await this.fetchPosts()
      this.topLoading = false
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  components:{
    LoadingIndicator,
    RefreshError
  },
  data() {
    const authStore = useAuthStore()
    return {
      authStore,
      formatHostImageUrl,
      topLoading: false,
      showPageRefresh: false,
      errorMessage: 'Sorry no event found',
      events: [
        // {
        //   id: 1,
        //   title: 'Minister of Finance',
        //   description:
        //     'Responsible for formulating and implementing the financial and economic policies of the country. The Minister of Finance oversees the budget, taxation, public debt, and monetary policy. They work on strategies to promote economic growth, maintain fiscal stability, and ensure sustainable development.',
        //   location: 'Yaounde',
        //   organized_by: 'asdas',
        //   user_id: 1,
        //   published_at: '2024-04-01 13:51:21',
        //   image: 'https://th.bing.com/th/id/R.5c554799a6a14ba031b54f234c18048f?rik=4M14f8pjbL2pEw&pid=ImgRaw&r=0',
        //   is_valid: 0,
        //   created_at: '2024-04-01T12:51:21.000000Z',
        //   updated_at: '2024-04-01T12:51:21.000000Z'
        // },

  
      ],
      popularPosts: [
        {
          id: 1,
          title: 'Lorem Ipsum',
          excerpt: 'UPCOMMING EVENT'
        },
        {
          id: 2,
          title: 'Template images',
          excerpt: '3 Images in this template!'
        }
        // ...more events
      ]
      // ...other data
    }
  },

  methods: {
    async fetchPosts() {
      this.hasNewPosts = false

      try {
        this.topLoading = true
        this.events = await getEvents(0, 10, this.authStore.user.token)
        // this.recentPosts = await getEvents(0, 3, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load events:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        if (this.events.length == 0) {
          this.showPageRefresh = true
          this.errorMessage = 'Could not get post refresh your page or check your connection'
        } else {
          this.showPageRefresh = false
        }
      }
    },

    async reloadEvents() {

      this.topLoading = false

      this.showPageRefresh = false
      // this.hasFetchAllPost = false
      // this.zoneName = this.authStore.user.zone.name
      await this.fetchPosts()
    },
  }
}
</script>

<style>
.zoneName{
  font-size: 13px;
  color: gray;
  font-weight: 400;
}
/* Tailwind CSS will take care of most of the styling, but you can add custom styles if necessary */
</style>

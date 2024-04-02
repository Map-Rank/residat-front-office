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
        <div v-if="!topLoading">
          <div
            v-for="event in events"
            :key="event.id"
            class="mb-4 p-4 bg-white rounded cursor-pointer"
          >
            <router-link to="/event" class="grid sm:flex mb-2">
              <img
                :src="formatHostImageUrl(event.image)"
                class="rounded-[50%] h-[100px] mr-4"
                alt="event image"
              />
              <div class="w-full">
                <div class="flex justify-between ">
                  <h2 class="text-xl text-start font-semibold">{{ event.title }}</h2>

                  <div v-if="showMenu" class="menu relative">
                    <button @click="toggleMenu" class="p-2 flex">
                      <!-- Three dots icon -->
                      <svg class="w-6 h-6" fill="true" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
                        />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div
                      v-show="isMenuVisible"
                      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                    >
                      <button-ui
                        :label="'Edit'"
                        :textCss="'text-left '"
                        :customCss="'items-left justify-start hover:bg-gray-100'"
                        @clickButton="editPost()"
                      >
                      </button-ui>

                      <button-ui
                        :label="'Delete'"
                        :textCss="'text-left '"
                        :customCss="'items-left justify-start hover:bg-gray-100'"
                        @clickButton="deletePost()"
                      >
                      </button-ui>

                      <button-ui
                        :label="'View'"
                        :textCss="'text-left '"
                        :customCss="'items-left justify-start hover:bg-gray-100'"
                        @clickButton="viewPost()"
                      >
                      </button-ui>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center">
                    <img src="\assets\icons\location.png" class="h-4 mr-1" alt="" srcset="" />
                    <h5 class="zoneName">{{ event.location }},</h5>
                    <p style="font-weight: 400; margin: 0 1px"></p>
                    <span class="">Date : {{ event.published_at }}</span>
                  </div>
                </div>
                <p class="text-gray-700 text-start">{{ event.description }}</p>
              </div>
            </router-link>
            <div class="flex justify-end">
              <router-link to="/event" class="text-blue-600 hover:underline text-sm text-end"
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
import { getEvents } from '../../services/eventService'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import useAuthStore from '@/stores/auth.js'
import { formatHostImageUrl } from '@/utils/formating'
import ButtonUi from '../../components/base/ButtonUi.vue'

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
  components: {
    LoadingIndicator,
    RefreshError,
    ButtonUi
  },
  data() {
    const authStore = useAuthStore()
    return {
      authStore,
      formatHostImageUrl,
      topLoading: false,
      showPageRefresh: false,
      errorMessage: 'Sorry no event found',
      showMenu: true,
      isMenuVisible:false,
      events: [],
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

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
      console.log(this.isMenuVisible)
    },

    editPost() {
      console.log('edit post ')
      // this.setpostToEdit(this.post)
      // this.$router.push({ name: 'create-post' })
    },

    async deletePost(alertMessage = 'Are you sure you want to delete this post?') {
      if (window.confirm(alertMessage)) {
        console.log('Deleting post', this.postId)
        // try {
        //   await deletePost(this.postId)
        //   window.location.reload()
        // } catch (error) {
        //   console.error('Error deleting post:', error)
        // }
      } else {
        console.log('Post deletion cancelled by user')
      }
    },

    viewPost() {
      // this.$router.push({ name: 'show-post', params: { id: this.post.id } })
    },

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

  <template>
  <div class="h-full">
    <div class="bg-white p-6 flex justify-center">
      <!-- <LoadingIndicator v-if="isLoading" /> -->
      <TopProfileShimmer v-if="isLoading" />

      <top-profile-info
        v-if="!isLoading && userPost"
        :profile-image-url="''"
        :profileName="`${userPost.first_name} ${userPost.last_name}`"
        :followersCount="0"
        :profileImageUrl="userPost.avatar"
        :postsCount="posts.length"
        :isCurrentUser="true"
      />
    </div>

    <div class="md:px-100 pb-5">
      <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4">
        <aside class="col-span-1 mb-2 sm:block">
          <DropdownShimmer v-if="isLoading" :numDropdowns="3" :componentHeight="'auto' " class="mb-4" />
          <about-user-info
            v-if="!isLoading && userPost"
            :username="`${userPost.first_name} ${userPost.last_name}`"
            :description="'Your description here'"
            :location="user.address"
            :phone="userPost.phone"
            :email="userPost.email"
            :joinDate="formatDate(userPost.created_at)"
            :website="'your-website-url.com'"
            :showUpdateProfile="true"
          />
        </aside>

        <!-- Main Content Area: Posts -->
        <main class="col-span-2 sm:px-4">
          <div class="space-y-5">
            

            <div v-if="isLoading">
              <PostShimmerLoading  class="mb-4" />
          </div>

            <div class="space-y-5" v-if="!isLoading">
              <PostComponent
                v-for="(post, index) in posts"
                :key="index"
                :postId="post.id"
                :username="`${userPost.first_name} ${userPost.last_name} `"
                :postDate="post.humanize_date_creation"
                :postContent="post.content"
                :like_count="post.like_count"
                :comment_count="post.comment_count"
                :postImages="post.images"
                :showMenu="true"
                :post="post"
                :zone-name="post.zone ? post.zone.name : 'zone name' "
              />
            </div>
          </div>
        </main>

        <aside class="col-span-1 hidden sm:block">
          <div class="hidden lg:block">
              <event-alert-box
                v-if="shouldDisplayEventAlert"
                :sectionTitle="$t('your_events')"
                :events="events"
                navigationLink="user-events"
                />
            </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import EventAlertBox from '@/components/common/EventAlertBox/EventAlertBox.vue'
import AboutUserInfo from './components/AboutUserInfo/index.vue'
import TopProfileInfo from './components/TopProfileInfo/index.vue'
import PostComponent from '../Post/index.vue'
// import { getUserPosts } from '@/features/Post/services/postService.js'
import {makeApiGetCall } from '@/api/api'
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'
import TopProfileShimmer from '@/components/common/ShimmerLoading/TopProfileShimmer.vue'
import DropdownShimmer from '@/components/common/ShimmerLoading/DropdownShimmer.vue';
import PostShimmerLoading from '@/components/common/ShimmerLoading/PostShimmerLoading.vue'

export default {
  name: 'SocialProfile',

  async created() {
    try {
      await this.fetchUserPost()
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      this.isLoading = false
    }

  },

  data() {
    return {
      events: [],
      user: '',
      posts: [],
      userPost: null,
      isLoading: true
    }
  },

  computed: {
    shouldDisplayEventAlert() {
      return this.events.length > 0
    }
  },

  components: {
    PostComponent,
    AboutUserInfo,
    TopProfileInfo,
    TopProfileShimmer,
    DropdownShimmer,
    PostShimmerLoading,
    EventAlertBox
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },

    async fetchUserPost() {
      const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
      const response = await makeApiGetCall(API_ENDPOINTS.getUserPosts, authToken)
      // console.log(response.data.data.my_posts)
      this.isLoading = true
      this.userPost = response.data.data;
      this.events = this.userPost.events
      this.posts = response.data.data.my_posts
    }
  }
}
</script>

<style scoped>
.enableScroll {
  height: 20vh;
}

.scroll-lock {
  overflow: hidden;
  height: 100%;
}

.static {
  position: static;
  overflow: hidden;
}

main {
  height: calc(1000px);
  overflow-y: auto;
}

main::-webkit-scrollbar {
  display: none;
}
</style>

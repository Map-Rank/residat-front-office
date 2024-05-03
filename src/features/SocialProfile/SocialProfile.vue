  <template>
  <div class="h-full">
    <div class="bg-white p-6 flex justify-center">
      <LoadingIndicator v-if="isLoading" />
      <top-profile-info
        v-if="!isLoading && userPost"
        :profile-image-url="''"
        :profileName="`${userPost.first_name} ${userPost.last_name}`"
        :followersCount="0"
        :postsCount="posts.length"
        :isCurrentUser="true"
      />
    </div>

    <div class="md:px-100 pb-5">
      <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4">
        <aside class="col-span-1 mb-2 sm:block">
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
            <div class="flex justify-center">
              <LoadingIndicator v-if="isLoading" />
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

        <aside class="col-span-1 hidden sm:block"></aside>
      </div>
    </div>
  </div>
</template>

<script>
import AboutUserInfo from './components/AboutUserInfo/index.vue'
import TopProfileInfo from './components/TopProfileInfo/index.vue'
import PostComponent from '../Post/index.vue'
// import { getUserPosts } from '@/features/Post/services/postService.js'
import LoadingIndicator from '../../components/base/LoadingIndicator.vue'
import {makeApiGetCall } from '@/api/api'
import { LOCAL_STORAGE_KEYS, API_ENDPOINTS } from '@/constants/index.js'

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
      user: '',
      posts: [],
      userPost: null,
      isLoading: true
    }
  },

  components: {
    PostComponent,
    AboutUserInfo,
    TopProfileInfo,
    LoadingIndicator
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
      this.posts = response.data.data.my_posts
    }
  }
}
</script>

<style scoped></style>

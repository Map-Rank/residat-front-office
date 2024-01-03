<template>
  <div class="h-full">
    <div class="bg-white p-6 flex justify-center">
      <LoadingIndicator v-if="isLoading" />
      <top-profile-info
        v-if="!isLoading && userProfile"
        :profile-image-url="''"
        :profileName="`${userProfile.first_name} ${userProfile.last_name}`"
        :followersCount="0"
        :postsCount="posts.length"
        :isCurrentUser="true"
      />
    </div>

    <div class="md:px-100 pb-5">
      <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4">
        <aside class="col-span-1 mb-2 sm:block">
          <about-user-info
            v-if="!isLoading && userProfile"
            :username="`${userProfile.first_name} ${userProfile.last_name}`"
            :description="'Your description here'"
            :location="user.address"
            :phone="userProfile.phone"
            :email="userProfile.email"
            :joinDate="formatDate(userProfile.created_at)"
            :website="'your-website-url.com'"
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
                :username="`${userProfile.first_name} ${userProfile.last_name} `"
                :postDate="post.created_at"
                :postContent="post.content"
                :like_count="post.like_count"
                :comment_count="post.comment_count"
                :postImages="post.images"
                :showMenu="true"
                :post="post"
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
import { getUserProfile } from '@/features/Post/services/postService.js'

// import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys'
import LoadingIndicator from '../../components/base/LoadingIndicator.vue'

export default {
  name: 'SocialProfile',

  async created() {
    try {
      await this.fetchUserProfile()
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
      userProfile: null,
      isLoading: true,
      id: this.$route.params.id
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

    async fetchUserProfile() {
      console.log()
      this.isLoading = true
      this.userProfile = await getUserProfile(this.id)
      this.posts = this.userProfile.my_posts
    }
  }
}
</script>

<style scoped></style>

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
        :profileImageUrl="userProfile.avatar"
        :isCurrentUser="true"
      />
    </div>

    <div v-if="showPageRefresh">
      <RefreshError
        :imgSize="400"
        :imageUrl="'assets\images\Community\loading.svg'"
        :errorMessage="errorMessage"
        @refreshPage="fetchUserProfile()"
      ></RefreshError>
    </div>

    <div class="md:px-100 pb-5">
      <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4">
        <aside class="col-span-1 mb-2 sm:block">
          <about-user-info
            v-if="!isLoading && userProfile"
            :username="`${userProfile.first_name} ${userProfile.last_name}`"
            :description="`${userProfile.last_name} Information`"
            :location="user.address"
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
                :postDate="post.humanize_date_creation"
                :postContent="post.content"
                :like_count="post.like_count"
                :comment_count="post.comment_count"
                :postImages="post.images"
                :showMenu="false"
                :zone-name="post.zone ? post.zone.name : 'zone name' "
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
import { getUserProfile } from '@/features/Post/services/postService.js'
import LoadingIndicator from '../../components/base/LoadingIndicator.vue'
import RefreshError from '@/components/common/Pages/RefreshError.vue'


export default {
  name: 'ViewProfileUser',

  async created() {
    try {
      await this.fetchUserProfile()
      this.showPageRefresh = false
    } catch (error) {
      console.error('Failed to load posts:', error)
      this.showPageRefresh = true
    } finally {
      this.isLoading = false
      // this.showPageRefresh = true
    }

  },

  data() {
    return {
      user: '',
      posts: [],
      userProfile: null,
      isLoading: true,
      id: this.$route.params.id,
      showPageRefresh: false,
      errorMessage: 'Culd not load user informaiton',
    }
  },

  components: {
    PostComponent,
    AboutUserInfo,
    TopProfileInfo,
    LoadingIndicator,
    RefreshError
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },

    async fetchUserProfile() {
      console.log()
      this.showPageRefresh = false
      this.isLoading = true
      this.userProfile = await getUserProfile(this.id)
      this.posts = this.userProfile.my_posts
    }
  }
}
</script>

<style scoped></style>

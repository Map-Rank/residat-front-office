<template>
  <div class="h-full">
    <div class="bg-white p-6 flex justify-center">
      <loading-indicator v-if="isLoading"></loading-indicator>
      <top-profile-info
      v-if="!isLoading"
        :profileImageUrl="`${imageHost}${userPost.avatar}`"
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
          :username="`${userPost.first_name} ${userPost.last_name}`"
          :description="'Your description here'"
          :location="'From ' + user.address"
          :phone="userPost.phone"
          :email="userPost.email"
          :joinDate="formatDate(userPost.created_at)"
          :website="'your-website-url.com'"
          />
        </aside>
        
        <!-- Main Content Area: Posts -->
        <main class="col-span-2 sm:px-4">
          <div class="space-y-5">
            <div class="flex justify-center">

              <loading-indicator v-if="isLoading"></loading-indicator>
            </div>

            <div
            v-if="!isLoading"
            >

              <PostComponent
                v-for="(post, index) in posts"
                :key="index"
                :postId="post.id"
                :username="`${userPost.first_name} ${userPost.last_name} `"
                :postDate="post.created_at"
                :postContent="post.content"
                :userProfileImage="`${imageHost}${userPost.avatar}`"
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
import { getUserPosts } from '@/features/Post/services/postService.js'
import useSectorStore from '@/stores/sectorStore.js'
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys'
import { URL_LINK } from '@/constants';
import LoadingIndicator from '../../components/base/LoadingIndicator.vue'



export default {
  name: 'SocialProfile',

  async created() {
    const sectorStore = useSectorStore()

    try {
      this.isLoading = true

      this.userPost = await getUserPosts()
      this.posts = this.userPost.my_posts
      this.isLoading = false


      this.sectors = sectorStore.getAllSectors
    } catch (error) {
      console.error('Failed to load posts:', error)
    }

    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.userInfo)
    if (storedUser) {
      this.user = JSON.parse(storedUser)
    }
  },

  data() {
    return {
      user: '',
      posts: [],
      userPost: null,
      isLoading: false,

      imageHost:URL_LINK.imageHostLink

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
    }
  }
}
</script>

<style scoped></style>

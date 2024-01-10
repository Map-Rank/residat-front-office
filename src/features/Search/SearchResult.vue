<template>
  <div>
    <!-- Category Filter Buttons -->
    <div class="flex justify-center space-x-2 mb-4 mt-5">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          'px-4 py-2 rounded-full',
          currentCategory === category ? 'bg-secondary-normal text-white' : 'bg-gray-200'
        ]"
        @click="filterPosts(category)"
      >
        {{ category }}
      </button>
    </div>

    <div
      :class="{ 'scroll-lock': scrollLocked }"
      class="container mx-auto pt-3 grid-cols-1 sm:grid md:grid-cols-8 lg:grid-cols-10 gap-2"
    >
      <!-- Main Content Area: Posts -->
      <main class="col-span-5 sm:px-4">
        <div v-if="topLoading" class="flex h-full justify-center">
          <LoadingIndicator />
        </div>

        <div v-if="showPageRefresh">
          <RefreshError
            :imageUrl="'assets\\images\\Community\\loading.svg'"
            :errorMessage="errorMessage"
            @refreshPage="refreshPage()"
          ></RefreshError>
        </div>

        <div v-if="!topLoading" class="space-y-5">
          <PostComponent
            v-for="post in filteredPosts"
            :key="post.id"
            @postFetch="fetchPosts"
            :postId="post.id"
            :username="`${post.creator[0].first_name} ${post.creator[0].last_name} `"
            :postDate="post.humanize_date_creation"
            :postContent="post.content"
            :liked="post.liked"
            :userProfileImage="`${imageHost}${post.creator[0].avatar}`"
            :id="`${post.creator[0].id}`"
            :like_count="post.like_count"
            :comment_count="post.comment_count"
            :postImages="post.images"
            :post="post"
          />
        </div>

        <div v-if="bottomLoading" class="flex my-7 h-full justify-center">
          <LoadingIndicator />
        </div>
      </main>
    </div>

    <!-- Posts Container -->
    <!-- <div class="space-y-4">
      <div v-for="post in filteredPosts" :key="post.id" class="p-4 border rounded shadow-sm">
        <div class="mb-2">
          <div class="font-bold">{{ post.title }}</div>
          <div class="text-sm">{{ post.content }}</div>
        </div>
        <div class="text-xs text-gray-600">Posted by {{ post.user }} on {{ post.date }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import PostComponent from '../Post/index.vue'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import { URL_LINK } from '@/constants'
import { getPostsByZone } from '../Post/services/postService'

export default {
  name: 'SearchResult',
  async created() {

    try {
      await this.fetchPosts();
      this.topLoading = false;
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  },

  
  props: { idType: String, id: String },
  components: {
    LoadingIndicator,
    PostComponent,
    RefreshError
  },
  data() {
    return {
      currentCategory: 'All',
      scrollLocked: false,
      topLoading: false,
      bottomLoading: false,
      loadingPosts: false,
      debounceTimer: null,
      errorMessage: 'Sorry no post found',

      allPosts: [],
      showPageRefresh: false,

      size: 20,
      page: 0,

      imageHost: URL_LINK.imageHostLink,

      categories: [
        'All',
        'Posts',
        'People',
        'Companies',
        'Jobs',
        'Groups',
        'Products',
        'Services',
        'Events',
        'Courses',
        'Schools'
      ],
      posts: [
        {
          id: 1,
          title: 'Lorem Ipsum Dolor Sit Amet',
          content:
            'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          user: 'JohnDoe92',
          date: 'April 5, 2023'
        },
        {
          id: 2,
          title: 'Sed Ut Perspiciatis',
          content: 'Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          user: 'JaneSmith88',
          date: 'April 6, 2023'
        },
        {
          id: 3,
          title: 'At Vero Eos Et Accusamus',
          content:
            'Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
          user: 'EmmaJones33',
          date: 'April 7, 2023'
        }
        // ... more posts
      ],

      filteredPosts: []
    }
  },

  methods: {
    filterPosts(category) {
      this.currentCategory = category

      if (category === 'All') {
        this.filteredPosts = this.posts
      } else {
        // Logic to filter posts based on category
        // For example, this might involve making an API call to fetch posts for the selected category
        this.filteredPosts = this.posts.filter((post) => post.category === category)
      }
    },

    async fetchPosts() {

try {
  this.topLoading = true;
  console.log('the zone id is '+this.id)
  this.filteredPosts = await getPostsByZone(this.id);
  this.recentPosts = await getPostsByZone(0,5,this.authStore.user.token)
} catch (error) {
  console.error("Failed to load posts:", error);
  this.showPageRefresh = true;
} finally {
  this.topLoading = false;
  if (this.posts.length == 0) {
    this.showPageRefresh = true;
    this.errorMessage =
      "Could not get post refresh your page or check your connection";
  } else {
    this.showPageRefresh = false;
  }
}
},
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

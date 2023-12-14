<template>
  <div class="md:px-100 pb-5">
    <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Sidebar: Sectors and Topics -->
      <aside class="col-span-1 hidden sm:block">
        <!-- Sectors -->
        <sector-side :sectorArray="this.sectors"></sector-side>
      </aside>

      <!-- Main Content Area: Posts -->
      <main class="col-span-2 sm:px-4">
        <div class="space-y-5">
          <PostComponent
            v-for="(post, index) in posts"
            :key="index"
            :postId="post.id"
            :username="`${post.creator.first_name} ${post.creator.last_name} `"
            :postDate="post.postDate"
            :postContent="post.content"
            :userProfileImage="post.creator.avatar"
            :like_count="post.like_count"
            :comment_count="post.comment_count"
            :postImages="post.images"
            :post="post"
          />
        </div>
      </main>

      <aside class="col-span-1 hidden sm:block">
        <recently-posted-side
          :recentPosts="recentPosts"
        ></recently-posted-side>
      </aside>
    </div>
  </div>
</template>

<script>
import PostComponent from '../Post/index.vue'
import SectorSide from './components/SectorSide/index.vue'
import RecentlyPostedSide from './components/RecentlyPostedSide/index.vue'
import { getPosts } from '@/features/Post/services/postService.js'
import useSectorStore from '@/stores/sectorStore.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  async created() {
    const sectorStore = useSectorStore()

    try {
      this.posts = await getPosts()
      this.sectors = sectorStore.getAllSectors

      console.log('completly fetch all post') //TODO
    } catch (error) {
      console.error('Failed to load posts:', error)
      // Handle the error, e.g., show an error message
    }
  },

  data() {
    return {
      sectors: [],
      posts: [],
      recentPosts: [
        {
          author: 'Arpit Chandak',
          title: 'The Blog that make the difference in out commun',
          logoImg:
            'https://th.bing.com/th/id/R.22d59dd756c5ffe8f8109bf18e93cf61?rik=j%2bU%2f3h0s8BuFyg&pid=ImgRaw&r=0',
          postedDate: 'Posted: 1 days ago'
        },
        {
          author: 'Arpit Chandak',
          title: 'The Blog that make the difference in out commun',
          logoImg:
            'https://th.bing.com/th/id/OIP.PYfgkkj0Rba0QZdJfqgCWQHaG5?w=591&h=551&rs=1&pid=ImgDetMain',
          postedDate: 'Posted: 1 days ago'
        }
      ]
    }
  },
  components: {
    PostComponent,
    SectorSide,
    RecentlyPostedSide
  }
}
</script>

<style>
/* Additional styles can be added here if needed */
</style>

<template>
  <div class="md:px-100 pb-5">
    <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Sidebar: Sectors and Topics -->
      <aside class="col-span-1 hidden sm:block">
        <sector-side :sectorArray="this.sectors"></sector-side>
      </aside>

      <!-- Main Content Area: Posts -->
      <main class="col-span-2 sm:px-4">
        <div v-if="loading" class="flex justify-center">
            <img src="src\assets\images\loadinPlant.gif" alt="Loading..."/>
        </div>
        

        <div v-if="!loading" class="space-y-5">
          <PostComponent
            v-for="(post, index) in posts"
            :key="index"
            @updatePost="handleUpdatePost"
            @postFetch="handlePostFetch"
            :postId="post.id"
            :username="`${post.creator[0].first_name} ${post.creator[0].last_name} `"
            :postDate="post.postDate"
            :postContent="post.content"
            :userProfileImage="`${imageHost}${post.creator[0].avatar}`"
            :like_count="post.like_count"
            :comment_count="post.comment_count"
            :postImages="post.images"
            :post="post"
          />
        </div>
      </main>

      <aside class="col-span-1 hidden sm:block">
        <recently-posted-side :recentPosts="recentPosts"></recently-posted-side>
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
import { URL_LINK } from '@/constants'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  async created() {
    try {
      // this.posts = await getPosts()
      window.addEventListener('scroll', this.handleScroll);
    this.fetchPosts();

      console.log('completly fetch all post') //TODO
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  data() {
    const sectorStore = useSectorStore()

    return {
      // sectors: [],
      loading: false,
      sectors: sectorStore.getAllSectors,
      // posts : getPosts(),
      posts: [],
      allPosts: [],
      limit: 10,
      currentPage: 0,

      imageHost: URL_LINK.imageHostLink,
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

  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        this.allPosts = await getPosts()
        this.loadMorePosts(); // Load initial posts
        this.loading = false;
      } catch (error) {
        console.error('Failed to load posts:', error)
      }
    },

    loadMorePosts() {
      const nextPosts = this.allPosts.slice(this.currentPage * this.limit, (this.currentPage + 1) * this.limit);
      this.posts.push(...nextPosts);
      this.currentPage++;
    },
    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.loadMorePosts();
      }
    },
    handleUpdatePost(updatedPost) {
      const index = this.posts.findIndex((p) => p.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    },


    async handlePostFetch() {
      await this.fetchPosts()
      console.log('fetch compltee')
    }
    // ... other methods
  },
  components: {
    PostComponent,
    SectorSide,
    RecentlyPostedSide
  }
}
</script>

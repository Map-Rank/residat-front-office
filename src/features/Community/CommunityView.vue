<template>
  <div class="md:px-100 h-full">
    <div 
    :class="{ 'scroll-lock': scrollLocked }"
    class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Sidebar: Sectors and Topics -->
      <aside class="col-span-1 hidden sm:block">
        <sector-side
          :sectorArray="this.sectors"
          :updatesectorChecked="updateSectorChecked"
        ></sector-side>
      </aside>

      <!-- Main Content Area: Posts -->
      <main class="col-span-2 sm:px-4">
        <div v-if="topLoading" class="flex h-full justify-center">
          <img
            src="https://media1.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e47lfs3a4sfo5nk2z7h8e4uw3eqww1rwlnxt178wkqc&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            class="h-7 w-7"
            alt="Loading..."
          />
        </div>

        <div v-if="showPageRefresh">
          <RefreshError
            :imageUrl="'src\\assets\\images\\Community\\loading.svg'"
            :errorMessage="errorMessage"
            @refreshPage="refreshPage()"
          ></RefreshError>
        </div>

        <div v-if="!topLoading || !bottomLoading" class="space-y-5">
          <PostComponent
            v-for="(post, index) in posts"
            :key="index"
            @updatePost="handleUpdatePost"
            @postFetch="fetchPosts"
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

        <div v-if="bottomLoading" class="flex  my-7 h-full justify-center">
          <img
            src="https://media1.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif?cid=ecf05e47lfs3a4sfo5nk2z7h8e4uw3eqww1rwlnxt178wkqc&ep=v1_stickers_search&rid=giphy.gif&ct=s"
            class="h-7 w-7"
            alt="Loading..."
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
import { getPosts, getPostsBySectors } from '@/features/Post/services/postService.js'
import useSectorStore from '@/stores/sectorStore.js'
import { URL_LINK } from '@/constants'
import RefreshError from '@/components/common/Pages/RefreshError.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  async created() {
    try {
      await this.fetchPosts()
      // this.posts = await getPosts()
      this.topLoading = false
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  data() {
    const sectorStore = useSectorStore()

    return {
      scrollLocked: false,
      topLoading: false,
      bottomLoading: false,
      sectors: sectorStore.getAllSectors,
      sectorId: [],
      loadingPosts: false,
      debounceTimer: null,
      errorMessage:'Sorry no post found',

      posts: [],
      allPosts: [],
      showPageRefresh: false,

      size: 20,
      page: 0,

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
    updateSectorChecked({ list, checked }) {
      this.showPageRefresh = false
      if (!list?.id) {
        console.error("Invalid 'list' object or missing 'id'")
        return
      }
      
      this.sectorId = checked
      ? [...this.sectorId, list.id]
      : this.sectorId.filter((id) => id !== list.id)
      
      this.filterPostBySectors()
    },

    async filterPostBySectors() {
      try {
        this.topLoading=true
        this.posts = await getPostsBySectors(this.sectorId.length ? this.sectorId : null)
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        if(this.posts.length == 0){
          this.showPageRefresh =true
          this.errorMessage = 'No post found under this sector , chose another sector or uncheck sector'
        }else{
          
          this.showPageRefresh =false
        }

      }
    },

    async fetchPosts() {
      try {
        this.topLoading=true
        this.posts = await getPosts()
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        if(this.posts.length == 0){
          this.showPageRefresh =true
          this.errorMessage = 'Could not get post refresh your page or check your connection'
        }else{
          
          this.showPageRefresh =false
        }

      }
    },
    async refreshPage() {
      this.topLoading = true
      this.showPageRefresh = false
      window.location.reload();
      await this.fetchPosts()
    },

    async loadMorePosts() {
      if (this.loadingPosts || this.showPageRefresh) return
      this.loadingPosts = true
      this.bottomLoading = true
      this.scrollLocked = true; 

      try {
        let nextPosts = await getPosts(this.page, this.size)
        this.posts.push(...nextPosts)
      } catch (error) {
        console.error('Failed to load more posts:', error)
      } finally {
        this.loadingPosts = false
        this.bottomLoading = false
        this.scrollLocked = false;
      }
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      if (scrollTop === 0) {
        // Top of page
      }

      if (scrollTop + clientHeight >= scrollHeight - 50 && !this.loadingPosts) {
        if (this.debounceTimer) clearTimeout(this.debounceTimer)

        this.debounceTimer = setTimeout(() => {
          this.page++
          this.loadMorePosts()
        }, 500)
      }
    },

    handleUpdatePost(updatedPost) {
      const index = this.posts.findIndex((p) => p.id === updatedPost.id)
      if (index !== -1) {
        this.$set(this.posts, index, updatedPost)
      }
    }

  },
  components: {
    PostComponent,
    SectorSide,
    RecentlyPostedSide,
    RefreshError
  }
}
</script>

<style scoped>
.scroll-lock {
  overflow: hidden;
  height: 100%;
}
</style>


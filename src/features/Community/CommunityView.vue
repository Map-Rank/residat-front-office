<template>
  <div class="relative">
    <!-- Fixed image in the background -->
    <div
      class="fixed hidden md:block top-0 left-0 w-full h-[50%] bg-cover bg-center z-2 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-transparent"
      style="
        background-image: url('https://th.bing.com/th/id/R.7147764e991976533b2e139e88e3387b?rik=cD6gGTeESR3MDg&riu=http%3a%2f%2freflectim.fr%2fwp-content%2fuploads%2f2016%2f03%2fyaounde-cameroun.jpg&ehk=Y3na93tbyKZceJwmnr7CyYDz4WbZ1%2fEemnmWrQSciZk%3d&risl=&pid=ImgRaw&r=0');
      "
    >
      <h2 class="text-white absolute bottom-0 left-2 md:left-100 md:bottom-5 uppercase">
        WELCOME TO {{ zoneName }}
      </h2>
    </div>

    <!-- Content that scrolls over the image -->
    <div class="relative z-11">
      <div class="hidden md:block enableScroll"></div>
      <!-- This div is just to enable scrolling -->
      <div class="bg-primary-light mt-3">
        <!-- Content starts here, pt-1/2 gives padding from top equals to 50% of the viewport height -->
        <div class="pt-1/2">
          <!-- <div class=" content  pt-5 lg:px-100 h-full"> -->
          <div class="md:px-100 justify-center pt-5 h-full">
            <div
              :class="{ 'scroll-lock': scrollLocked }"
              class="w-full justify-between grid-cols-1 sm:grid md:grid-cols-8 lg:grid-cols-10 gap-2"
            >
              <!-- Sidebar: Sectors and Topics -->
              <aside class="col-span-2 hidden sm:block md:hidden lg:block">
                <zone-post-filter
                :filterPostFunctionWithId="filterPostByZone"
                > </zone-post-filter>
                
                <div class="mt-3">
                  <sector-side
                    :sectorArray="this.sectors"
                    :updatesectorChecked="updateSectorChecked"
                  ></sector-side>
                </div>
              </aside>

              <!-- Main Content Area: Posts -->
              <main class="col-span-5 sm:px-4" ref="mainContent">
                <div v-if="topLoading" class="flex h-full justify-center">
                  <LoadingIndicator />
                </div>

                <div v-if="showPageRefresh">
                  <RefreshError
                    :imageUrl="'assets\\images\\Community\\loading.svg'"
                    :errorMessage="errorMessage"
                    @refreshPage="reloadPosts()"
                  ></RefreshError>
                </div>

                <div v-if="!topLoading" class="space-y-2">
                  <post-input v-if="!showPageRefresh"> </post-input>
                  <PostComponent
                    v-for="post in posts"
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

                <div v-if="bottomLoading" class="flex my-7 h-full justify-center ite">
                  <LoadingIndicator />
                </div>
                <div v-if="filteringActive && !showPageRefresh">

                  <div  class="my-10 flex flex-col justify-center items-center">
                    <hr class="border-t-2 w-full border-gray-400 mb-4"/> 
                
                    <p class="text-center">All posts have been loaded based on your filter. Please reload to get the latest posts.</p> 
                
                    <!-- Reload Button -->
                    <button @click="reloadPosts" class="w-1/2 border-2 border-secondary-normal hover:bg-secondary-normal text-secondary-normal  hover:text-white font-bold py-2 px-4 rounded-full mt-4">
                      Reload Posts
                    </button> 
                  </div>
                </div>
              </main>

              <aside class="col-span-3 justify-end hidden sm:block">
                <event-alert-box
                  title="Annual Farming Event"
                  organizer="Farm Hub"
                  date="August 12, 2024"
                  location="Bamenda"
                  eventImage="https://th.bing.com/th/id/R.5c554799a6a14ba031b54f234c18048f?rik=4M14f8pjbL2pEw&pid=ImgRaw&r=0"
                />
                <div class="mt-3">
                  <recently-posted-side :recentPosts="recentPosts"></recently-posted-side>
                  <div v-if="topLoading" class="flex h-full justify-center">
                    <LoadingIndicator />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from '../Post/index.vue'
import SectorSide from './components/SectorSide/index.vue'
import RecentlyPostedSide from './components/RecentlyPostedSide/index.vue'
import { getPosts, getPostsBySectors,getPostsByZone } from '@/features/Post/services/postService.js'
import useSectorStore from '@/stores/sectorStore.js'
import { URL_LINK } from '@/constants'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import useAuthStore from '@/stores/auth.js'
import usePostStore from '@/features/Post/store/postStore'
import useModalStore from '@/stores/modalStore.js'
import PostInput from '@/components/common/PostInput/PostInput.vue'
import ZonePostFilter from './components/ZonePostFilter/ZonePostFilter.vue'
import EventAlertBox from '@/components/common/EventAlertBox/EventAlertBox.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  async created() {
    try {
      await this.fetchPosts()
      this.topLoading = false
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  },
  mounted() {
    this.$refs.mainContent.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    this.$refs.mainContent.removeEventListener('scroll', this.handleScroll)
  },

  data() {
    const sectorStore = useSectorStore()
    const authStore = useAuthStore()
    const postStore = usePostStore()
    const modalStore = useModalStore()

    return {
      zoneName: authStore.user.zone.name,
      postStore,
      modalStore,
      filteringActive:false,
      authStore,
      scrollLocked: false,
      topLoading: false,
      bottomLoading: false,
      sectors: sectorStore.getAllSectors,
      sectorId: [],
      zoneId:0,
      loadingPosts: false,
      debounceTimer: null,
      errorMessage: 'Sorry no post found',

      posts: [],
      allPosts: [],
      showPageRefresh: false,

      size: 20,
      page: 0,

      imageHost: URL_LINK.imageHostLink,
      recentPosts: []
    }
  },

  methods: {
    updateSectorChecked({ list, checked }) {
      this.showPageRefresh = false
      console.log(list.id)

      if (!list?.id) {
        console.error("Invalid 'list' object or missing 'id'")
        return
      }

      this.sectorId = checked
        ? [...this.sectorId, list.id]
        : this.sectorId.filter((id) => id !== list.id)

        // this.filteringActive = true; 
        console.log(this.sectorId)
      this.filterPostBySectors()
    },

    async filterPostBySectors() {
      try {
        this.topLoading = true
        this.posts = await getPostsBySectors(this.sectorId.length ? this.sectorId : null)
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        this.filteringActive = true;
        if (this.posts.length == 0) {
          this.showPageRefresh = true
          this.errorMessage =
            'No post found under this sector , chose another sector or uncheck sector'
        } else {
          this.showPageRefresh = false
        }
      }
    },


    async filterPostByZone(id){
      console.log(id)

      try {
        this.topLoading = true
        this.posts = await getPostsByZone(id !=0 ? id : null)
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        this.filteringActive = true;  
        if (this.posts.length == 0) {
          this.showPageRefresh = true
          this.errorMessage =
            'No post found under this location , chose another location '
        } else {
          this.showPageRefresh = false
        }
      }
    },


    async reloadPosts() {
      this.topLoading = false;
      this.filteringActive=false
      this.showPageRefresh = false
      await this.fetchPosts();
    },

    async fetchPosts() {
      try {
        this.topLoading = true
        this.posts = await getPosts(0, 10, this.authStore.user.token)
        this.recentPosts = await getPosts(0, 3, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        if (this.posts.length == 0) {
          this.showPageRefresh = true
          this.errorMessage = 'Could not get post refresh your page or check your connection'
        } else {
          this.showPageRefresh = false
        }
      }
    },
    async refreshPage() {
      this.topLoading = true
      this.showPageRefresh = false
      await this.fetchPosts()
      window.location.reload()
    },

    async loadMorePosts() {
      if (this.loadingPosts || this.showPageRefresh || this.filteringActive) return;

      this.loadingPosts = true
      this.bottomLoading = true
      this.scrollLocked = true

      try {
        let nextPosts = await getPosts(this.page, this.size)
        this.posts.push(...nextPosts)
      } catch (error) {
        console.error('Failed to load more posts:', error)
      } finally {
        this.loadingPosts = false
        this.bottomLoading = false
        this.scrollLocked = false
      }
    },

    handleScroll() {
      const mainContent = this.$refs.mainContent
      const { scrollTop, scrollHeight, clientHeight } = mainContent

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
    }
  },
  components: {
    LoadingIndicator,
    PostComponent,
    SectorSide,
    RecentlyPostedSide,
    RefreshError,
    PostInput,
    ZonePostFilter,
    EventAlertBox
  }
}
</script>

<style scoped>
.enableScroll {
  height: 40vh;
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
  height: calc(100vh);
  overflow-y: auto;
}

main::-webkit-scrollbar {
  display: none;
}
</style>

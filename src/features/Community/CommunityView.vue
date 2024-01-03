<template>

  <div>
    <div class="h-64 poster relative bg-cover bg-center bg-no-repeat bg-[url('https://th.bing.com/th/id/R.7147764e991976533b2e139e88e3387b?rik=cD6gGTeESR3MDg&riu=http%3a%2f%2freflectim.fr%2fwp-content%2fuploads%2f2016%2f03%2fyaounde-cameroun.jpg&ehk=Y3na93tbyKZceJwmnr7CyYDz4WbZ1%2fEemnmWrQSciZk%3d&risl=&pid=ImgRaw&r=0')] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-transparent">
      <h2 class="text-white absolute bottom-2 left-2 md:left-100 md:bottom-5 uppercase">WELCOME TO  {{zoneName}} </h2>
    </div>
    

    <div class="md:px-100 h-full">
     
      <div
        :class="{ 'scroll-lock': scrollLocked }"
        class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10"
      >
  
    
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
            <LoadingIndicator />
          </div>
  
          <div v-if="showPageRefresh">
            <RefreshError
              :imageUrl="'assets\\images\\Community\\loading.svg'"
              :errorMessage="errorMessage"
              @refreshPage="refreshPage()"
            ></RefreshError>
          </div>
  
          <div v-if="!topLoading " class="space-y-5">
            <PostComponent
              v-for="post in posts"
              :key="post.id"
              @postFetch="fetchPosts"
              :postId="post.id"
              :username="`${post.creator[0].first_name} ${post.creator[0].last_name} `"
              :postDate="post.postDate"
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
  
        <aside class="col-span-1 hidden sm:block">
          <recently-posted-side
          :recentPosts="recentPosts"></recently-posted-side>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from "../Post/index.vue";
import SectorSide from "./components/SectorSide/index.vue";
import RecentlyPostedSide from "./components/RecentlyPostedSide/index.vue";
import { getPosts, getPostsBySectors } from "@/features/Post/services/postService.js";
import useSectorStore from "@/stores/sectorStore.js";
import { URL_LINK } from "@/constants";
import RefreshError from "@/components/common/Pages/RefreshError.vue";
import LoadingIndicator from "@/components/base/LoadingIndicator.vue";
import useAuthStore from "@/stores/auth.js";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Community",

  async created() {
    try {
      await this.fetchPosts();
      // this.posts = await getPosts()
      this.topLoading = false;
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  data() {
    const sectorStore = useSectorStore();
    const authStore = useAuthStore();

    return {
      zoneName: authStore.user.zone.name,
      scrollLocked: false,
      topLoading: false,
      bottomLoading: false,
      sectors: sectorStore.getAllSectors,
      sectorId: [],
      loadingPosts: false,
      debounceTimer: null,
      errorMessage: "Sorry no post found",

      posts: [],
      allPosts: [],
      showPageRefresh: false,

      size: 20,
      page: 0,

      imageHost: URL_LINK.imageHostLink,
      recentPosts: [

      ],
    };
  },

  methods: {
    updateSectorChecked({ list, checked }) {
      this.showPageRefresh = false;
      if (!list?.id) {
        console.error("Invalid 'list' object or missing 'id'");
        return;
      }

      this.sectorId = checked
        ? [...this.sectorId, list.id]
        : this.sectorId.filter((id) => id !== list.id);

      this.filterPostBySectors();
    },

    async filterPostBySectors() {
      try {
        this.topLoading = true;
        this.posts = await getPostsBySectors(this.sectorId.length ? this.sectorId : null);
      } catch (error) {
        console.error("Failed to load posts:", error);
        this.showPageRefresh = true;
      } finally {
        this.topLoading = false;
        if (this.posts.length == 0) {
          this.showPageRefresh = true;
          this.errorMessage =
            "No post found under this sector , chose another sector or uncheck sector";
        } else {
          this.showPageRefresh = false;
        }
      }
    },

    async fetchPosts() {

      try {
        this.topLoading = true;
        this.posts = await getPosts();
        this.recentPosts = await getPosts('0','5')
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
      console.log(this.posts)
    },
    async refreshPage() {
      this.topLoading = true;
      this.showPageRefresh = false;
      await this.fetchPosts();
      window.location.reload();
    },

    async loadMorePosts() {
      if (this.loadingPosts || this.showPageRefresh) return;
      this.loadingPosts = true;
      this.bottomLoading = true;
      this.scrollLocked = true;

      try {
        let nextPosts = await getPosts(this.page, this.size);
        this.posts.push(...nextPosts);
      } catch (error) {
        console.error("Failed to load more posts:", error);
      } finally {
        this.loadingPosts = false;
        this.bottomLoading = false;
        this.scrollLocked = false;
      }
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop === 0) {
        // Top of page
      }

      if (scrollTop + clientHeight >= scrollHeight - 50 && !this.loadingPosts) {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);

        this.debounceTimer = setTimeout(() => {
          this.page++;
          this.loadMorePosts();
        }, 500);
      }
    },
  },
  components: {
    LoadingIndicator,
    PostComponent,
    SectorSide,
    RecentlyPostedSide,
    RefreshError,
  },
};
</script>

<style scoped>


.scroll-lock {
  overflow: hidden;
  height: 100%;
}
</style>

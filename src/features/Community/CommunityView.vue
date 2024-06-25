<template>
  <div class="relative">
    <!-- Fixed image in the background -->
    <div
      class="fixed hidden mb-3 md:block top-0 left-0 w-full h-[30%] bg-cover bg-center z-2 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-transparent"
      :style="computedBannerImage"
    >
      <h2
        class="text-white  font-bold absolute bottom-0 left-2 md:left-14 mb-2 lg:left-100 md:bottom-5 uppercase"
      >
      {{ $t('welcome_to') }} {{ zoneName }}
      </h2>
    </div>

    <!-- Content that scrolls over the image -->
    <div class="relative z-11">
      <div class="hidden md:block enableScroll md:h-[20vh]"></div>
      <!-- This div is just to enable scrolling -->
      <div class="bg-primary-light md:pt-4">
        <!-- Content starts here, pt-1/2 gives padding from top equals to 50% of the viewport height -->
        <div class="pt-1/2">
          <!-- <div class=" content  pt-5 lg:px-100 h-full"> -->
          <div class="lg:md:px-100 md:md:px-[50px] lg:px- justify-center h-full">
            <div
              :class="{ 'scroll-lock': scrollLocked }"
              class="w-full justify-between grid-cols-1 sm:grid md:grid-cols-8 lg:grid-cols-10 gap-2"
            >
              <!-- Sidebar: Sectors and Topics -->
              <aside class="col-span-2 hidden lg:block">
                <!-- <div v-if="isZoneFilterLoading" class="flex justify-center">
                  <LoadingIndicator />
                </div> -->

                <DropdownShimmer v-if="isZoneFilterLoading" :numDropdowns="3" :componentHeight="'auto' " class="mb-4" />
                
                <div v-if="!isZoneFilterLoading">
                  
                  <zone-post-filter
        
                  :key="componentKey"
                    :props_regions="default_regions"
                    :props_divisions="default_divisions"
                    :props_sub_divisions="default_sub_divisions"
                    :filterPostFunctionWithId="filterPostByZone"
                    :updateZone="updateZone"
                  >
                  </zone-post-filter>
                </div>

                    <DropdownShimmer v-if="isZoneFilterLoading" :numDropdowns="3" :componentHeight="'auto'"  />
                <div class="mt-3" v-if="!isZoneFilterLoading">
                  <sector-side
                    :sectorArray="this.sectors"
                    :updatesectorChecked="updateSectorChecked"
                    :sectorId="sectorId"
                  ></sector-side>
                </div>
              </aside>

              <!-- Main Content Area: Posts -->
              <main class="col-span-5 lg:px-4 md:px-0" ref="mainContent">
             
                
                <post-input  :profilePictureUrl="userProfileImage">
                </post-input>

                <div v-if="topLoading">
                    <PostShimmerLoading  class="mb-4" />
                </div>

               

                <div v-if="showPageRefresh && !filteringActive">
                  <RefreshError
                  :imgSize="400"
                    :imageUrl="'assets\\images\\Community\\loading.svg'"
                    :errorMessage="errorMessage"
                    @refreshPage="reloadPosts()"
                  ></RefreshError>
                </div>

                <div class="sm:hidden mb-2 p-1">
                  <div class="md:block">
                    <div class="">
                      <div class="flex space-x-2 w-full">
                        <div class="w-full">
                          <button-ui
                            leftIcon="/assets/images/filter.png"
                            :label="'Filter by Location'"
                            :color="' bg-white text-primary'"
                            :textCss="'text-black  text-center'"
                            :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
                            @clickButton="toogleShowMobileFilterZonePost()"
                          >
                          </button-ui>
                        </div>

                        <div class="w-full">
                          <button-ui
                            leftIcon="/assets/images/filter.png"
                            :label="'Filter by Sector'"
                            :color="' bg-white text-primary'"
                            :textCss="'text-black  text-center'"
                            :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
                            @clickButton="toogleShowMobileFilterSectorPost()"
                          >
                          </button-ui>
                        </div>
                      </div>

                      <div :class="{ hidden: showMobileFilterZonePost }" class="sm:hidden mt-2">
                        <zone-post-filter
                          :key="componentKey"
                          :props_regions="default_regions"
                          :props_divisions="default_divisions"
                          :props_sub_divisions="default_sub_divisions"
                          :filterPostFunctionWithId="filterPostByZone"
                          :updateZone="updateZone"
                        >
                        </zone-post-filter>
                      </div>
                      <div :class="{ hidden: showMobileFilterSectorPost }" class="sm:hidden mt-2">
                        <sector-side
                          :sectorArray="this.sectors"
                          :updatesectorChecked="updateSectorChecked"
                        ></sector-side>
                      </div>
                    </div>
                  </div>
                </div>
<!-- 
                <post-input  :profilePictureUrl="userProfileImage">
                </post-input> -->
                <div v-if="!topLoading" class="space-y-2">


                  <div v-if="hasNewPosts" class="">
                    <div class="my-10 flex flex-col justify-center items-center">
                      <p class="text-center">Load new post.</p>

                      <button
                        @click="fetchPosts"
                        class="border-2 border-secondary-normal hover:bg-secondary-normal text-secondary-normal hover:text-white font-bold py-2 px-4 rounded-full mt-4"
                      >
                        Reload Posts
                      </button>
                    </div>
                  </div>

                  <PostComponent
                    v-for="post in posts"
                    :key="post.id"
                    @postFetch="fetchPosts"
                    :postId="post.id"
                    :username="`${post.creator[0].first_name} ${post.creator[0].last_name} `"
                    :postDate="post.humanize_date_creation"
                    :postContent="post.content"
                    :liked="post.liked"
                    :userProfileImage="`${post.creator[0].avatar}`"
                    :id="`${post.creator[0].id}`"
                    :like_count="post.like_count"
                    :comment_count="post.comment_count"
                    :postImages="post.images"
                    :zone-name="post.zone ? post.zone.name : 'zone name'"
                    :post="post"
                  />
                </div>

                <div v-if="bottomLoading" class="flex my-7 h-full justify-center ite">
                  <LoadingIndicator />
                </div>
                <div v-if="filteringActive && !showPageRefresh && hasFetchAllPost">
                  <div class="my-10 flex flex-col justify-center items-center">
                    <hr class="border-t-2 w-full border-gray-400 mb-4" />

                    <p class="text-center">
                      All posts have been loaded based on your filter. Please reload to get the
                      latest posts.
                    </p>

                    <!-- Reload Button -->
                    <button
                      @click="reloadPosts"
                      class="w-1/2 border-2 border-secondary-normal hover:bg-secondary-normal text-secondary-normal hover:text-white font-bold py-2 px-4 rounded-full mt-4"
                    >
                      Reload Posts
                    </button>
                  </div>
                </div>
              </main>

              <aside class="col-span-3 justify-end hidden sm:block">
                <!-- <div v-if="isloadingEvent" class="flex h-full justify-center">
                  <LoadingIndicator />
                </div> -->

                <AvatarPostShimmer v-if="isloadingEvent" :numShimmers="3" :componentHeight="'auto'" />
                
                <div class="hidden lg:block">
                  <event-alert-box
                    v-if="shouldDisplayEventAlert"
                    :sectionTitle="$t('section_title_upcoming_event')"
                    :events="events"
                    />
                </div>

                <AvatarPostShimmer v-if="isloadingEvent" :numShimmers="3" :componentHeight="'auto'" />

                <div v-if="!isloadingEvent">
                  <div class="hidden lg:mt-3 lg:block">
                    <recently-posted-side
                      :recentPosts="recentPosts"
                      :maxPosts="3"
                    ></recently-posted-side>
                  </div>

                  <div class="block lg:hidden">
                    <recently-posted-side
                      :recentPosts="recentPosts"
                      :maxPosts="2"
                    ></recently-posted-side>
                  </div>

                  <div v-if="topLoading" class="flex h-full justify-center">
                    <LoadingIndicator />
                  </div>
                  <div class="hidden md:grid md:space-y-3 lg:hidden mt-3">
                    <zone-post-filter
                      :key="componentKey"
                      :props_regions="default_regions"
                      :props_divisions="default_divisions"
                      :props_sub_divisions="default_sub_divisions"
                      :filterPostFunctionWithId="filterPostByZone"
                      :updateZone="updateZone"
                    ></zone-post-filter>

                    <sector-side
                      :sectorArray="this.sectors"
                      :updatesectorChecked="updateSectorChecked"
                    ></sector-side>
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
import { getEvents } from '../../services/eventService'
import { getPosts, getFilterPosts } from '@/features/Post/services/postService.js'
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
import ButtonUi from '../../components/base/ButtonUi.vue'
import { getSpecificZones, getZones } from '@/services/zoneService'
import PostShimmerLoading from '@/components/common/ShimmerLoading/PostShimmerLoading.vue'
import DropdownShimmer from '@/components/common/ShimmerLoading/DropdownShimmer.vue'
import AvatarPostShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  async created() {
    
    try {
      const zoneId = this.$route.params.zoneId
      const sectorIdString = this.$route.params.sectorId
      
      // Convert sectorId from string to array (handle potential missing sectorId)
      const sectorIdArray = sectorIdString ? JSON.parse('[' + sectorIdString + ']') : []
      
      if (zoneId) {
        this.topLoading = true
        this.showPageRefresh = false
        this.isZoneFilterLoading = true
        try {
          this.posts = await getFilterPosts(zoneId, sectorIdArray);
          this.paramZone = await getSpecificZones(zoneId);
          this.topLoading = false

        } catch (error) {
          this.showPageRefresh = true
          console.error('An error occurred:', error);

        }finally {
         this.topLoading = false
         this.posts.length < 1 ?   this.showPageRefresh = true : null

       }
       
        this.isZoneFilterLoading = true
      } else {
        await this.fetchResources()
      }
      this.topLoading = false
    } catch (error) {
      console.error('Failed to load posts:', error)
    }

    // Retrieve sectorIds from URL (if any)
    const urlSectorIds = this.$route.params.sectorId ? Array.from(this.$route.params.sectorId.split(',').map(Number)) : [];

    if(urlSectorIds.length == 0){
      localStorage.removeItem('sectorId')
    }
    

    // Retrieve sectorIds from local storage (if any)
    const storedSectorIds = localStorage.getItem('sectorId') ? JSON.parse(localStorage.getItem('sectorId')) : [];

    // Combine sectorIds from both sources (URL and local storage)
    let initialSectorIds = [];
    if (urlSectorIds.length > 0) {
      initialSectorIds = urlSectorIds; // Use URL sector IDs if available
    } else if (storedSectorIds.length > 0) {
      initialSectorIds = storedSectorIds; // Use stored sector IDs if no URL IDs
    }

    // Check initial checkbox state based on the combined sectorIds
    const isChecked = initialSectorIds.includes(this.list.id);
    this.checked = isChecked;
  },

  watch: {
    async paramZone(newValue) {
      if (newValue) {
        let region = null
        let division = null
        let sub_division = null
        this.isZoneFilterLoading = true
        ;(this.default_regions = [
          {
            id: 1,
            name:this.$t('cameroon')
          }
        ]),
          (this.default_divisions = [
            {
              id: 0,
              name:this.$t('choose_your_division')
            }
          ]),
          (this.default_sub_divisions = [
            {
              id: 0,
              name: this.$t('choose_your_subdivision')
            }
          ])

        if (newValue.level_id == 4) {
         
          const rest = await getZones(null, newValue.parent_id)
          const currentZone = {
            id: newValue.id,
            name: newValue.name
          }
          sub_division = [currentZone, ...rest]
          console.log('Subdivisions updated:', sub_division)

          const spec_division = await getSpecificZones(newValue.parent_id)
          division = await getZones(null, spec_division.parent_id)
          console.log('Divisions updated:', division)

          const spec_region = await getSpecificZones(spec_division.parent_id)
          region = await getZones(null, spec_region.parent_id)
          console.log('region updated:', region)

          this.default_sub_divisions = sub_division
          this.default_divisions = [this.default_divisions[0]]
          this.default_divisions = this.default_divisions.concat( division)
          this.default_regions = [this.default_regions[0]]
          this.default_regions = this.default_regions.concat( region)
          this.zoneName = currentZone.name
          this.componentKey++
          
          this.isZoneFilterLoading = false
        }

        if (newValue.level_id == 3) {
          const rest = await getZones(null, newValue.parent_id)
          const currentZone = {
            id: newValue.id,
            name: newValue.name
          }
          division = [currentZone, ...rest]
          console.log('Divisions updated:', division)
          
          const spec_region = await getSpecificZones(newValue.parent_id)
          region = await getZones(null, spec_region.parent_id)
          console.log('region updated:', region)

          this.default_divisions = division
          this.default_regions = [this.default_regions[0]]
          this.default_regions = this.default_regions.concat( region)
          this.zoneName = currentZone.name
          this.componentKey++
          this.isZoneFilterLoading = false
        }
        if (newValue.level_id == 2) {
          const rest = await getZones(null, newValue.parent_id)
          const currentZone = {
            id: newValue.id,
            name: newValue.name
          }
          region = [currentZone, ...rest]
          console.log('Region updated:', region)
          this.default_regions = region
          this.zoneName = currentZone.name
          this.componentKey++
          this.isZoneFilterLoading = false


        }
      }
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
      paramZone: {},
      isZoneFilterLoading: false,
      profilePictureUrl: authStore.user.avatar,
      showMobileFilterZonePost: true,
      showMobileFilterSectorPost: true,
      postStore,
      modalStore,
      userProfileImage: authStore.user.avatar,
      bannerUrlImage:
        authStore.user.zone.banner ||
        'https://th.bing.com/th/id/R.7147764e991976533b2e139e88e3387b?rik=cD6gGTeESR3MDg&riu=http%3a%2f%2freflectim.fr%2fwp-content%2fuploads%2f2016%2f03%2fyaounde-cameroun.jpg&ehk=Y3na93tbyKZceJwmnr7CyYDz4WbZ1%2fEemnmWrQSciZk%3d&risl=&pid=ImgRaw&r=0',
      hasNewPosts: false,
      hasFetchAllPost: false,
      filteringActive: false,
      authStore,
      scrollLocked: false,
      postScrollLocked: false,
      isloadingEvent: false,
      topLoading: false,
      bottomLoading: false,
      sectors: sectorStore.getAllSectors,
      sectorId: [],
      zoneId: 1,
      loadingPosts: false,
      debounceTimer: null,
      errorMessage: 'Sorry no post found',
      events: [],
      posts: [],
      allPosts: [],
      showPageRefresh: false,
      componentKey: 0,

      size: 20,
      page: 0,

      imageHost: URL_LINK.imageHostLink,
      recentPosts: [],
      default_regions: [
        {
          id: 1,
          name: 'Cameroon'
        }
      ],
      default_divisions: [
        {
          id: 0,
          name: 'Choose a division'
        }
      ],
      default_sub_divisions: [
        {
          id: 0,
          name: 'Choose a sub-division'
        }
      ]
    }
  },
  computed: {
    computedBannerImage() {
      return {
        'background-image': `url('${this.bannerUrlImage}')`
      }
    },
    shouldDisplayEventAlert() {
      return this.events.length > 2
    }
  },

  methods: {
    async updateSubDivisions(zone) {
      let rest = await getZones(null, zone.parent_id)
      let currentZone = {
        id: zone.id,
        name: zone.name
      }
      this.default_sub_divisions = [currentZone, ...rest]
      this.componentKey++
      console.log('Subdivisions updated:', this.default_sub_divisions)
    },
    async updateDivisions(zone) {
      let rest = await getZones(null, zone.parent_id)
      let currentZone = {
        id: zone.id,
        name: zone.name
      }
      this.default_divisions = [currentZone, ...rest]
      this.componentKey++
      console.log('Divisions updated:', this.default_divisions)
    },

    toogleShowMobileFilterZonePost() {
      if (this.showMobileFilterSectorPost == false) {
        this.showMobileFilterSectorPost = true
      }
      this.showMobileFilterZonePost = !this.showMobileFilterZonePost
    },

    toogleShowMobileFilterSectorPost() {
      if (this.showMobileFilterZonePost == false) {
        this.showMobileFilterZonePost = true
      }
      this.showMobileFilterSectorPost = !this.showMobileFilterSectorPost
    },
    updateSectorChecked({ list, checked }) {
      this.showPageRefresh = false
      console.log(list.id)

      if (!list?.id) {
        console.error("Invalid 'list' object or missing 'id'")
        return
      }

      const urlSectorIds = this.$route.params.sectorId ? Array.from(this.$route.params.sectorId.split(',').map(Number)) : [];

      if(urlSectorIds.length == 0){
        localStorage.removeItem('sectorId')
      }

      this.sectorId = checked
        ? [...urlSectorIds, list.id]
        : this.sectorId.filter((id) => id !== list.id);

      // console.log(this.sectorId)
      this.filterPostBySectors()
    },

    async checkNewPosts() {
      if (this.filteringActive) {
        return
      }
      try {
        const latestPosts = await getPosts(0, 10, this.authStore.user.token)
        this.hasNewPosts = latestPosts.some(
          (post) => !this.posts.find((existingPost) => existingPost.id === post.id)
        )
      } catch (error) {
        console.error('Failed to check new posts:', error)
      }
    },

    updateZone(zone) {
      this.page = 0
      this.zoneName = zone.name
      this.bannerUrlImage = zone.banner
      this.zoneId = zone.id
    },

    async filterPostBySectors() {
      try {
        this.topLoading = true
        let id = this.$route.params.zoneId;
        this.posts = await getFilterPosts(this.zoneId, this.sectorId.length ? this.sectorId : null )
        this.$router.push(`/community/${id}/${this.sectorId}`);
      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        this.filteringActive = true
        if (this.posts.length == 0) {
          this.showPageRefresh = true
          this.errorMessage =
            'No post found under this sector , chose another sector or uncheck sector'
        } else {
          this.showPageRefresh = false
        }
      }
    },

    async filterPostByZone(id) {
      console.log(id)

      this.zoneId = id || 1
      this.filteringActive = true
      this.hasFetchAllPost = false

      try {
        this.topLoading = true

        this.posts = await getFilterPosts(id != 0 ? id : null, this.sectorId, null, null)
        this.$router.push(`/community/${id}`);

      } catch (error) {
        console.error('Failed to load posts:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
        this.filteringActive = false
        if (this.posts.length === 0) {
          this.showPageRefresh = true
          console.log("this is howpager" + this.showPageRefresh)
          console.log('No post found under this location , chose another location ')
          // this.errorMessage = 'No post found under this location , chose another location '
        } else {
          this.showPageRefresh = false
        }
      }
    },

    async reloadPosts() {
      this.$router.push({ name: 'community' }).then(() => {
    window.location.reload();
  });
    },

    async fetchResources() {
      this.topLoading = true
      this.isloadingEvent = true
      this.isZoneFilterLoading = true

      await this.fetchPosts()
      await this.fetchEvent()
    },

    async fetchPosts() {
      this.hasNewPosts = false

      try {
        this.posts = await getPosts(0, 10, this.authStore.user.token)
        this.recentPosts = await getPosts(0, 10, this.authStore.user.token)
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

    async fetchEvent() {
      try {
        this.events = await getEvents(0, 10, this.authStore.user.token)
      } catch (error) {
        console.error('Failed to load events:', error)
      } finally {
        this.isloadingEvent = false
        this.isZoneFilterLoading = false
      }
    },

    async loadMorePosts(zoneId, sectorId) {
      if (this.loadingPosts || this.showPageRefresh) return
      let nextPagePosts = []

      this.loadingPosts = true
      this.bottomLoading = true
      this.postScrollLocked = true
      try {
        if (this.filteringActive) {
          const nextPage = this.page + 1
          const size = 20
          nextPagePosts = await getFilterPosts(zoneId, sectorId, size, nextPage);
        } else {
          const nextPage = this.page + 1
          nextPagePosts = await getPosts(nextPage, this.size)
        }

        if (nextPagePosts.length === 0) {
          this.bottomLoading = false // no more pages to load
          this.hasFetchAllPost = true
          return
        }

        this.posts.push(...nextPagePosts)
        this.page++
      } catch (error) {
        console.error('Failed to load more posts:', error)
      } finally {
        this.postScrollLocked = false
        this.loadingPosts = false
        this.bottomLoading = false
      }
    },

    handleScroll() {
      const mainContent = this.$refs.mainContent
      const { scrollTop, scrollHeight, clientHeight } = mainContent

      if (this.hasFetchAllPost) {
        return
      }

      // Check for new posts when scrolled to the top.
      if (scrollTop === 0) {
        this.checkNewPosts()
      }

      // When close to the bottom, attempt to load more posts.
      const nearBottom = scrollHeight - scrollTop <= clientHeight + 50 // Adjust threshold as necessary.
      if (nearBottom && !this.loadingPosts) {
        console.log(this.zoneId)
        console.log(this.$route.params.sectorId)
        const nextPage = this.page + 1
          const size = 20
        this.loadMorePosts(this.zoneId, this.$route.params.sectorId, size, nextPage); // Assuming sectorId is in route params
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
    EventAlertBox,
    PostShimmerLoading,
    DropdownShimmer,
    ButtonUi,
    AvatarPostShimmer
  }
}
</script>

<style scoped>
.enableScroll {
  height: 20vh;
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
  height: calc(1000px);
  overflow-y: auto;
}

main::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div class="relative">
    <!-- Fixed image in the background -->
    <div
      class="fixed hidden mb-3 md:block top-0 left-0 w-full h-[30%] bg-cover bg-center z-2 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black before:to-transparent"
      :style="computedBannerImage"
    >
      <h2
        class="text-white font-bold absolute bottom-0 left-2 md:left-14 mb-2 lg:left-100 md:bottom-5 uppercase"
      >
        <!-- {{ $t('welcome_to') }} {{ zoneName }} -->
        {{ zoneName }}
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

                <DropdownShimmer
                  v-if="isZoneFilterLoading"
                  :numDropdowns="3"
                  :componentHeight="'auto'"
                  class="mb-4"
                />

                <div v-if="!isZoneFilterLoading">
                  <CommunityZoneFilter
                    :key="componentKey"
                    :props_regions="default_regions"
                    :props_divisions="default_divisions"
                    :props_sub_divisions="default_sub_divisions"
                    :filterPostFunctionWithId="filterPost"
                  >
                  </CommunityZoneFilter>
                </div>

                <DropdownShimmer
                  v-if="isZoneFilterLoading"
                  :numDropdowns="3"
                  :componentHeight="'auto'"
                />
                <div class="mt-3" v-if="!isZoneFilterLoading">
                  <sector-side
                    :sectorArray="this.sectors"
                    :updatesectorChecked="updateSectorChecked"
                  ></sector-side>
                </div>
              </aside>

              <!-- Main Content Area: Posts -->
              <main class="col-span-5 lg:px-4 md:px-0" ref="mainContent">
                <post-input :profilePictureUrl="userProfileImage"> </post-input>

                <div v-if="topLoading">
                  <PostShimmerLoading />
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
                        <CommunityZoneFilter
                          :key="componentKey"
                          :props_regions="default_regions"
                          :props_divisions="default_divisions"
                          :props_sub_divisions="default_sub_divisions"
                          :filterPostFunctionWithId="filterPost"
                        >
                        </CommunityZoneFilter>
                      </div>
                      <div v-if="!isZoneFilterLoading" :class="{ hidden: showMobileFilterSectorPost }" class="sm:hidden mt-2">
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
                    :postId="post.id"
                    :username="`${post.creator[0]?.first_name} ${post.creator[0]?.last_name} `"
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
                <div v-if=" !showPageRefresh && hasFetchAllPost">
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

                <AvatarPostShimmer
                  v-if="isloadingEvent"
                  :numShimmers="3"
                  :componentHeight="'auto'"
                />

                <div class="hidden lg:block">
                  <event-alert-box
                    v-if="shouldDisplayEventAlert"
                    :sectionTitle="$t('section_title_upcoming_event')"
                    :events="events"
                  />
                </div>

                <AvatarPostShimmer
                  v-if="isloadingEvent"
                  :numShimmers="3"
                  :componentHeight="'auto'"
                />

                <div v-if="!isloadingEvent">
                  <div class="hidden lg:mt-3 lg:block">
                    <recently-posted-side :recentPosts="posts" :maxPosts="3"></recently-posted-side>
                  </div>

                  <div class="block lg:hidden">
                    <recently-posted-side :recentPosts="posts" :maxPosts="2"></recently-posted-side>
                  </div>

                  <div v-if="topLoading" class="flex h-full justify-center">
                    <LoadingIndicator />
                  </div>
                  <div v-if="!isZoneFilterLoading" class="hidden md:grid md:space-y-3 lg:hidden mt-3">
                    <CommunityZoneFilter
                      :key="componentKey"
                      :props_regions="default_regions"
                      :props_divisions="default_divisions"
                      :props_sub_divisions="default_sub_divisions"
                      :filterPostFunctionWithId="filterPost"
                    ></CommunityZoneFilter>

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
import CommunityZoneFilter from './components/CommunityZoneFilter/CommunityZoneFilter.vue'
import EventAlertBox from '@/components/common/EventAlertBox/EventAlertBox.vue'
import ButtonUi from '../../components/base/ButtonUi.vue'
import { getSpecificZones, getZones } from '@/services/zoneService'
import PostShimmerLoading from '@/components/common/ShimmerLoading/PostShimmerLoading.vue'
import DropdownShimmer from '@/components/common/ShimmerLoading/DropdownShimmer.vue'
import AvatarPostShimmer from '@/components/common/ShimmerLoading/AvatarPostShimmer.vue'
import { checkAuthentication } from '@/utils/authUtils.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',
  props: ['propZoneId', 'propSectorId'],

  async created() {
    this.initializeData()
  },

  watch: {
    async propZoneId(newZoneId) {
      console.log('change in zoneId!!!!!')
      if (newZoneId !== this.zoneId || newZoneId != 1) {
        // Only make API call if zoneId has changed
        this.zoneId = newZoneId
        await this.initializeData()
        // await this.handleZoneChange(newZoneId);
      }
    },

    async propSectorId(newSectorId) {
      console.log('change in sectorId!!!!! new id ' + newSectorId)
      const newParsedSectors = this.parseSectorIds(newSectorId)
      if (JSON.stringify(newParsedSectors) !== JSON.stringify(this.sectorId)) {
        // Only update if sectorId has changed
        this.sectorId = newParsedSectors
        console.log('change in sectorId!!!!! new array ' + this.sectorId)
        await this.initializeData()
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
    const authStore = useAuthStore()
    const postStore = usePostStore()
    const modalStore = useModalStore()
    const sectorStore = useSectorStore()

    return {
      zoneName: authStore.user?.zone.name == null ? 'Welcome to residat' : authStore.user.zone.name,
      paramZone: {},
      isZoneFilterLoading: false,
      profilePictureUrl: authStore.user?.avatar,
      showMobileFilterZonePost: true,
      showMobileFilterSectorPost: true,
      postStore,
      modalStore,
      sectorStore,
      userProfileImage: authStore.user?.avatar,
      bannerUrlImage:
        authStore.user?.zone.banner ||
        'https://th.bing.com/th/id/R.7147764e991976533b2e139e88e3387b?rik=cD6gGTeESR3MDg&riu=http%3a%2f%2freflectim.fr%2fwp-content%2fuploads%2f2016%2f03%2fyaounde-cameroun.jpg&ehk=Y3na93tbyKZceJwmnr7CyYDz4WbZ1%2fEemnmWrQSciZk%3d&risl=&pid=ImgRaw&r=0',
      hasNewPosts: false,
      hasFetchAllPost: false,
      authStore,
      scrollLocked: false,
      postScrollLocked: false,
      isloadingEvent: false,
      topLoading: false,
      bottomLoading: false,
      sectors: [],
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
      isUserConnected: false,

      size: 10,
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
          id: null,
          name: 'Choose a division'
        }
      ],
      default_sub_divisions: [
        {
          id: null,
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
    async handleZoneChange(newZoneId) {
      let newZone = await getSpecificZones(newZoneId)
      this.updateZone(newZone)
      console.log('this is zone in handlezone level' + newZone.level_id)
      try {
        let region = null
        let division = null
        let sub_division = null

        // Reset default zone data
        this.default_regions = [
          {
            id: 1,
            name: this.$t('cameroon')
          }
        ]
        this.default_divisions = [
          {
            id: 0,
            name: this.$t('choose_your_division')
          }
        ]
        this.default_sub_divisions = [
          {
            id: 0,
            name: this.$t('choose_your_subdivision')
          }
        ]

        if (newZone.level_id == 4) {
          const rest = await getZones(null, newZone.parent_id)
          const currentZone = {
            id: newZone.id,
            name: newZone.name
          }
          sub_division = [currentZone, ...rest]
          console.log('Subdivisions updated:', sub_division)

          const spec_division = await getSpecificZones(newZone.parent_id)
          division = await getZones(null, spec_division.parent_id)
          console.log('Divisions updated:', division)

          const spec_region = await getSpecificZones(spec_division.parent_id)
          region = await getZones(null, spec_region.parent_id)
          console.log('region updated:', region)

          this.default_sub_divisions = sub_division
          this.default_divisions = [this.default_divisions[0]]
          this.default_divisions = this.default_divisions.concat(division)
          this.default_regions = [this.default_regions[0]]
          this.default_regions = this.default_regions.concat(region)
          this.componentKey++
          this.isZoneFilterLoading = false
        }

        if (newZone.level_id == 3) {
          const rest = await getZones(null, newZone.parent_id)
          const currentZone = {
            id: newZone.id,
            name: newZone.name
          }
          division = [currentZone, ...rest]
          console.log('Divisions updated:', division)

          this.getSub_divisions(newZone.id)

          const spec_region = await getSpecificZones(newZone.parent_id)
          region = await getZones(null, spec_region.parent_id)
          console.log('region updated:', region)

          this.default_divisions = division
          this.default_regions = [this.default_regions[0]]
          this.default_regions = this.default_regions.concat(region)
          // this.zoneName = currentZone.name
          this.componentKey++
          this.isZoneFilterLoading = false
        }
        if (newZone.level_id == 2 || newZone.level_id == 1) {
          const rest = await getZones(null, newZone.parent_id ?? 1)
          const currentZone = {
            id: newZone.id,
            name: newZone.name
          }
          region = [currentZone, ...rest]
          await this.getDivisions(newZone.id)
          this.default_regions = region
          // this.zoneName = currentZone.name
          this.componentKey++
          this.isZoneFilterLoading = false
        }
      } catch (error) {
        console.error('Failed to load zone data:', error)
      } finally {
        this.isZoneFilterLoading = false
      }
    },

    async getDivisions(parent_id) {
      if (!checkAuthentication()) {
        return
      }

      if (parent_id == 1) {
        this.default_divisions = [this.default_divisions[0]]
        return
      }
      try {
        this.default_divisions = this.default_divisions.concat(await getZones(null, parent_id))
        console.log('this is the size of division ' + this.default_divisions.length)
        // this.sub_divisions = [this.sub_divisions[0]]
      } catch (error) {
        console.log(error)
      } finally {
        this.isDivisionLoading = false
      }
    },

    async getSub_divisions(parent_id) {
      // this.isSubdivisionLoading = true
      try {
        this.default_sub_divisions =
          this.default_sub_divisions.length > 0 ? [this.default_sub_divisions[0]] : []
        this.default_sub_divisions = this.default_sub_divisions.concat(
          await getZones(null, parent_id)
        )
      } catch (error) {
        console.log(error)
      } finally {
        // this.isSubdivisionLoading = false
      }
    },

    async initializeData() {
      console.log('intialising !!!!!!1')
      this.isUserConnected = checkAuthentication()

      if (typeof this.propSectorId === 'string') {
        const propSectorArray = Array.from(this.propSectorId.split(',').map(Number))

        // Assuming getAllSectors() returns an array and not a function property
        const allSectors = this.sectorStore.getAllSectors
        this.sectors = allSectors.map((sector) => ({
          ...sector,
          check: propSectorArray.includes(sector.id)
        }))
      } else {
        this.sectors = this.sectorStore.getAllSectors
      }

      try {
        // const { zoneId, sectorId} = this.$route.params;
        this.sectorId = this.parseSectorIds(this.propSectorId)

        this.zoneId = this.propZoneId === null ? 1 : this.propZoneId

        // if (this.propZoneId != 1) {
        this.topLoading = true
        this.isZoneFilterLoading = true
        await this.fetchEvent()
        await this.handleZoneChange(this.zoneId)
        await this.loadData(this.zoneId, this.sectorId)
      } catch (error) {
        console.error('Initialization failed:', error)
        this.showPageRefresh = true
      } finally {
        this.topLoading = false
      }
    },

    async filterPost(id) {
      if (id != null) {
        this.zoneId = id
      }

      if (this.propZoneId === id) {
        console.error('same zone selected  so no navigation')
        return
      }

      try {
        this.$router.push({
          name: 'community',
          params: {
            propZoneId: this.zoneId,
            propSectorId: this.sectorId.join(',')
          }
        })
        console.log('selected zone !!!! ' + id)
      } catch (error) {
        console.error('Failed to navigate', error)
      }
    },

    updateSectorChecked({ list, checked }) {
      if (!checkAuthentication()) {
        return
      }

      this.showPageRefresh = false

      console.log('This is the list ' + list.id)

      if (!list) {
        console.error("Invalid 'list' object or missing 'id'")
        return
      }

      // Retrieve the current sector IDs from the URL or initialize as empty array
      const urlSectorIds =
        this.propSectorId && this.propSectorId.length > 0
          ? this.propSectorId.split(',').map(Number)
          : []

      let updatedSectorIds

      if (checked) {
        // Add the list.id to sector IDs only if it's not already included
        if (!urlSectorIds.includes(list.id)) {
          updatedSectorIds = [...urlSectorIds, list.id]
        } else {
          updatedSectorIds = urlSectorIds
        }
      } else {
        // Remove the list.id from sector IDs
        updatedSectorIds = urlSectorIds.filter((id) => id !== list.id)
      }

      // Update local sectorId state to trigger reactivity
      this.sectorId = updatedSectorIds
      this.filterPost(null)
    },

    parseSectorIds(sectorIdString) {
      return sectorIdString ? JSON.parse(`[${sectorIdString}]`).map(Number) : []
    },

    async loadData(zoneId, sectorIdArray) {
      this.topLoading = true

      try {
        this.posts = await getFilterPosts(zoneId, sectorIdArray)
        if (this.posts.length < 1) this.showPageRefresh = true
      } catch (error) {
        console.error('Error loading data:', error)
        this.showPageRefresh = true
      }
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

    async checkNewPosts() {
     
      try {
        const latestPosts = await getPosts(0, 10, this.authStore?.user.token, this.isUserConnected)
        this.hasNewPosts = latestPosts.some(
          (post) => !this.posts.find((existingPost) => existingPost.id === post.id)
        )
      } catch (error) {
        console.error('Failed to check new posts:', error)
      }
    },

    updateZone(zone) {
      this.zoneId = zone.id
      if (zone.id != 1) {
        console.log('updating zone name!!!!')
        this.page = 0
        this.zoneName = zone.name
        this.bannerUrlImage = zone.banner
      }
    },

    async fetchPosts() {
      this.hasNewPosts = false

      try {
        this.posts = await getPosts(0, 10, this.authStore.user?.token, this.isUserConnected)
        this.recentPosts = await getPosts(0, 10, this.authStore.user?.token, this.isUserConnected)
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

    async reloadPosts() {
      this.$router.push({ name: 'community' }).then(() => {
        window.location.reload()
      })
    },

    async fetchEvent() {
      try {
        this.events = await getEvents(0, 10, this.authStore.user?.token, this.isUserConnected)
      } catch (error) {
        console.error('Failed to load events:', error)
      } finally {
        this.isloadingEvent = false
      }
    },

    async loadMorePosts() {
      if (this.loadingPosts || this.showPageRefresh) return
      // let nextPagePosts = []

      this.loadingPosts = true
      this.bottomLoading = true
      this.postScrollLocked = true
      try {
        const nextPage = this.page + 1
        const size = 10
        this.nextPagePosts = await getFilterPosts(
          this.zoneId,
          this.sectorId,
          size,
          nextPage,
          this.isUserConnected
        )

        if (this.nextPagePosts.length === 0) {
          console.log('this is the lenght of new post ' + this.nextPagePosts.length)
          this.bottomLoading = false
          this.hasFetchAllPost = true
          return
        }

        this.posts.push(...this.nextPagePosts)
        console.log('this is the new post lenght ' + this.posts.length)
        this.hasFetchAllPost = false
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
        this.loadMorePosts() // Assuming sectorId is in route params
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
    CommunityZoneFilter,
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

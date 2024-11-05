<template>
  <MapComponent
    class="fixed mt-[80px] top-0 left-0 w-full h-full z-0"
    :latitude="dashboard.latitude"
    :longitude="dashboard.longitude"
    :zoomIndex="dashboard.zoomIndex"
    @zoneClick="zoneClick"
    @disasterClick="disasterClick"
    :show-layers="showLayers"
  />

  <div class="w-full optionButton px-5 md:hidden block">
    <div class="grid grid-cols-2 gap-2">
      <button-ui
        :label="$t('Zone statistics')"
        :color="'text-white'"
        :textCss="'text-white font-bold text-center text-[6px]'"
        :customCss="'bg-secondary-normal flex justify-center rounded-lg p-1'"
        @clickButton="toggleZoneStatisticsMobile"
      >
      </button-ui>
      <button-ui
        :label="$t('Navigate by Zone')"
        :color="'text-white'"
        :textCss="'text-white font-bold text-center'"
        :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
        @clickButton="toggleNavigationZone"
      >
      </button-ui>
      <button-ui
        :label="$t('layers')"
        :color="'text-white'"
        :textCss="'text-white font-bold text-center'"
        :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
        @clickButton="toggleLayer"
      >
      </button-ui>
    </div>
  </div>
  <div
    v-if="showLayers && isMobileView"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="toggleLayer"
  >
    <button @click="toggleLayer" class="text-white buttonClose rounded p-2 bg-red-500">
      close
    </button>
  </div>
  <div class="z-10 px-4 md:px-[50px] pt-1 w-full">
    <!-- web view of show zone statistics -->
    <div
      class="grid mt-4 space-y-4 md:space-y-0 md:flex md:space-x-4 row-auto md:justify-between md:h-10 z-1 hidden md:block"
    >
      <div class="lg:w-1/4 md:w-3/4 grid gap-1 left-element">
        <div class="hidden md:block mt-2 w-full min-h-[30vh]">
          <WaterStressChart></WaterStressChart>
        </div>

        <div class="mt-4">
          <button-ui
            :label="$t('show_zone_stats')"
            :color="'text-white'"
            :textCss="'text-white font-bold text-center'"
            :customCss="'bg-secondary-normal flex justify-center rounded-lg hidden md:block'"
            @clickButton="toggleZoneStatistics()"
          >
          </button-ui>
        </div>

        <div :class="{ hidden: isZoneStatistics }">
          <div class="mt-2 max-h-[30vh] md:w-full">
            <ZoneInfo :zone="zone" />
          </div>

          <div class="mt-4 post-slider">
            <post-slider :posts="posts" status="RECENT" />
          </div>
        </div>
      </div>

      <div class="lg:w-1/4" v-if="!isLoadingMap && inSubDivision">
        <div :class="{ hidden: !displayStatistics }">
          <BaseDropdown @selectedOptionValue="updateReportType" :options="hazard" />
        </div>
      </div>
    </div>

    <!-- mobile view of show zone statistics -->
    <div
      v-if="isZoneStatisticsMObile && isMobileView"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      @click.self="toggleZoneStatisticsMobile"
    >
      <div
        class="grid mt-4 space-y-4 md:space-y-0 md:flex md:space-x-4 row-auto md:justify-between md:h-10 z-1"
      >
        <div class="lg:w-1/4 md:w-3/4 grid gap-1 left-element">
          <div class="hidden md:block mt-2 w-full min-h-[30vh]">
            <WaterStressChart></WaterStressChart>
          </div>

          <div>
            <div class="mt-2 max-h-[30vh] md:w-full">
              <ZoneInfo :zone="zone" />
            </div>

            <div class="mt-7">
              <post-slider :posts="posts" status="RECENT" />
            </div>
          </div>
        </div>

        <div class="lg:w-1/4" v-if="!isLoadingMap && inSubDivision">
          <div :class="{ hidden: !displayStatistics }">
            <BaseDropdown @selectedOptionValue="updateReportType" :options="hazard" />
          </div>
        </div>
      </div>
      <button
        @click="toggleZoneStatisticsMobile"
        class="text-white buttonClose rounded p-2 bg-red-500"
      >
        close
      </button>
    </div>

    <!-- <div class="lg:w-1/3 hidden lg:block" v-if="!isLoadingMap && inSubDivision">
        <div class="md:block">
          <div class="">
            <div class="">
              <button-ui
                :label="$t('key_actors')"
                :color="'text-white'"
                :textCss="'text-white font-bold text-center'"
                :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
                @clickButton="toggleShowAllActors()"
              >
              </button-ui>
            </div>
          </div>
        </div>
      </div> -->

    <!-- web version of show navigation zone -->
    <div
      class="flex flex-row flex-wrap gap-2 bottom-72 right-40 relative hidden sm:hidden md:block"
    >
      <div
        class="flex md:col-span-6"
        :class="!inSubDivision ? 'lg:col-span-5 min-h-[90vh]' : 'lg:col-span-5 '"
      ></div>

      <div class="col-span-1 md:col-span-2 lg:col-span-2">
        <div v-if="!isZoneLoading" class="md:mb-4 p-4 bg-white rounded shadow navigator mt-8">
          <zone-post-filter
            :title="$t('select_zone_by_location')"
            :props_regions="default_regions"
            :props_divisions="default_divisions"
            :props_sub_divisions="default_sub_divisions"
            :filterPostFunctionWithId="selectZoneToSearch"
            :updateZone="updateZone"
          ></zone-post-filter>

          <ButtonUi
            :label="$t('search')"
            customCss="bg-secondary-normal text-center flex justify-center px-10 py-3"
            textCss="text-center text-white"
            @clickButton="searchMap"
          ></ButtonUi>
        </div>
      </div>
    </div>

    <!-- mobile view show navigation zone -->
    <div
      v-if="ShowNavigationZone && isMobileView"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      @click.self="toggleNavigationZone"
    >
      <div class="flex flex-row flex-wrap gap-2">
        <div
          class="flex md:col-span-6"
          :class="!inSubDivision ? 'lg:col-span-5 min-h-[90vh]' : 'lg:col-span-5 '"
        ></div>

        <div class="col-span-1 md:col-span-2 lg:col-span-2">
          <div v-if="!isZoneLoading" class="md:mb-4 p-4 bg-white rounded shadow navigator mt-8">
            <zone-post-filter
              :title="$t('select_zone_by_location')"
              :props_regions="default_regions"
              :props_divisions="default_divisions"
              :props_sub_divisions="default_sub_divisions"
              :filterPostFunctionWithId="selectZoneToSearch"
              :updateZone="updateZone"
            ></zone-post-filter>

            <ButtonUi
              :label="$t('search')"
              customCss="bg-secondary-normal text-center flex justify-center px-10 py-3"
              textCss="text-center text-white"
              @clickButton="searchMap"
            ></ButtonUi>
          </div>
        </div>
      </div>
      <button @click="toggleNavigationZone" class="text-white buttonClose rounded p-2 bg-red-500">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
// eslint-disable-next-line no-unused-vars
import BaseBarChart from '../../components/base/Charts/BaseBarChart.vue'
// import InlineSvg from 'vue-inline-svg'
import WaterStressChart from '../../components/base/Charts/WaterStressChart.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'
import { getSpecificZones, getSpecificMapZones, getZones } from '../../services/zoneService'
import { getReport } from '@/services/reportService.js'
import { ReportType } from '@/constants/reportData.js'
import { ChartItemData } from '@/constants/chartData.js'
// import Modal from '@/components/common/Modal/Modal.vue'
// import MapShimmer from '@/components/common/ShimmerLoading/MapShimmer.vue'
import ZonePostFilter from '@/features/Community/components/ZonePostFilter/ZonePostFilter.vue'
import { useToast } from 'vue-toastification'
import MapComponent from '@/features/DashBaord/components/MapComponent.vue'
import ZoneInfo from '@/features/DashBaord/components/ZoneInfo.vue'
import PostSlider from '@/features/DashBaord/components/PostSlider.vue'
import { getFilterPosts } from '@/features/Post/services/postService.js'
import { useDashboardStore } from '@/stores/dashboardStore.js'

export default {
  name: 'DashBoardView',

  components: {
    ZonePostFilter,
    BaseDropdown,
    // KeyActors,
    PostSlider,
    ZoneInfo,
    // InlineSvg,
    WaterStressChart,
    ButtonUi,

    MapComponent
    // MapShimmer
  },

  // async mounted() {
  //   // await this.fetchZoneMarkeds()
  // },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize() // Initial check on mount
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  created() {
    // Access the store instance
    this.dashboardStore = useDashboardStore()

    // Watch for changes in the store's `zoneId` and react accordingly
    this.$watch(
      () => this.dashboardStore.zoneId,
      async (newZoneId) => {
        if (!newZoneId) return

        this.isLoadingMap = true
        this.isErrorLoadMap = false

        if (this.Id === 1) {
          this.zone = await getSpecificZones(this.dashboardStore.zoneId)
          this.posts = await getFilterPosts(this.dashboardStore.zoneId, null, 4)
          this.presentMapId = this.zone.id
          this.mapSvgPath = this.zone.vector.path
          this.vectorKeys = this.zone.vector.keys
        } else {
          const zones = await getSpecificMapZones(
            this.dashboardStore.parentId,
            this.dashboardStore.zoneName,
            1
          )

          if (zones.length > 0) {
            this.zone = zones[0]
            this.geojson = this.zone.geojson
            this.posts = await getFilterPosts(zones[0].id, null, 4)
            this.presentMapId = this.zone.id
            this.mapSvgPath = this.zone.vector?.path
            this.vectorKeys = this.zone.vector?.keys
          } else {
            this.isErrorLoadMap = true
            this.vectorKeys = [0]
          }
        }

        this.isLoadingMap = false
      },
      { immediate: true }
    )
  },

  computed: {
    isSVG() {
      return this.mapSvgPath && this.mapSvgPath.endsWith('.svg')
    },
    errorMessage() {
      return ` ${this.dashboard.zoneName} map not yet available`
    },
    isMobileView() {
      return window.innerWidth < 768 // Adjust this breakpoint according to your design (e.g., md: 768px)
    },

    dashboard() {
      return useDashboardStore()
    }
  },
  data() {
    return {
      toast: useToast(),
      mapSvgPath: null,
      child_component: 'equipment',
      vectorKeys: [],
      hoverMapText: 'Map',
      isModalVisible: false,
      ShowNavigationZone: false,
      showLayers: false,
      graphLabel: '',

      posts: null,
      zone: null,
      geojson: '',
      presentMapId: null,
      zoneIdToSearch: null,
      zoneMarkers: [],
      zoneMapToSearch: null,
      errorImage: '\\assets\\images\\DashBoard\\error-map.svg',
      selectedZone: null,
      defaultMapSize: 1,
      isSubDivisionGraph: false,
      isZoneStatistics: true,
      isZoneStatisticsMObile: false,
      isKeyActorsHidden: false,
      showAllActors: false,
      isLoadingMap: true,
      isErrorLoadMap: false,
      displayStatistics: false,
      reportType: null,
      inSubDivision: true,
      isZoneLoading: false,
      modalStates: {
        healthVisible: false,
        agricultureVisible: false,
        infrastructureVisible: false,
        socialVisible: false,
        foodSecurityVisible: false,
        migrationVisible: false,
        waterStressVisible: false
      },

      climateVulnerabilityIndex: [
        { name: ChartItemData.health, percentage: 100 },
        { name: ChartItemData.agriculture, percentage: 50 },
        { name: ChartItemData.infrastructure, percentage: 25 },
        // { name: 'Business', percentage: 75 },
        { name: ChartItemData.social, percentage: 20 }
      ],
      climateRiskThreats: [
        { name: ChartItemData.foodSecurity, percentage: 100 },
        { name: ChartItemData.waterStress, percentage: 50 },
        { name: ChartItemData.epidemics, percentage: 25 },
        // { name: ChartItemData.business, percentage: 75 },
        { name: ChartItemData.migration, percentage: 20 }
      ],

      horizintalChartOption: {
        indexAxis: 'y'
      },

      hazard: [
        { id: 0, name: 'Chose Environmental Hazard' },
        { id: 1, name: 'Flood', value: ReportType.FLOOD },
        { id: 2, name: 'Drought', value: ReportType.DROUGHT }
      ],

      default_regions: [
        {
          id: 0,
          name: 'Choose a region'
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
      ],

      actors: [
        // {
        //   title: 'Unicef',
        //   logoUrl:
        //     'https://th.bing.com/th/id/R.c215149a745003175ddd655e61354b5d?rik=Pqwr0cNGR4XuXA&pid=ImgRaw',
        //   name: 'Unicef'
        // },
      ],
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      }
    }
  },

  methods: {
    async fetchZoneMarkeds() {
      // Placeholder for actual fetching logic
      try {
        const zones = await getZones(2, null)
        this.zoneMarkers.push(zones)
        // this.zoneMarkers = await getZones(2,null);
        console.log('this is zone mark lengh  ' + this.zoneMarkers)
        // console.log('Type of zoneMarkeds: ' + typeof this.zoneMarkeds);
      } catch (error) {
        console.error('Failed to fetch zone markers:', error)
      }
    },
    zoneClick(zoneMarked, zoomIndex) {
      console.log('navigating after zone click')
      console.log(zoneMarked)

      // Check if zoneMarked is an array and use the first item if it is
      const zone = Array.isArray(zoneMarked) ? zoneMarked[0] : zoneMarked

      const dashboardStore = useDashboardStore()
      // Set the parameters in the store
      dashboardStore.setDashboardParams({
        zoneId: zone.id,
        parentId: zone.parent_id,
        zoneName: zone.name,
        // mapSize: ,
        latitude: zone.latitude,
        longitude: zone.longitude,
        zoomIndex: zoomIndex ?? 8
      })
      this.$router.push({ name: 'dashboard' })
      console.log('The router complete')
    },
    disasterClick(marker) {
      console.log('navigating after disaster click')
      console.log(marker)

      const dashboardStore = useDashboardStore()

      // Set the parameters in the store
      dashboardStore.setDashboardParams({
        zoneId: marker.zone_id,
        zoneName: marker.locality,
        // mapSize: ,
        latitude: marker.latitude,
        longitude: marker.longitude,
        zoomIndex: 10
      })

      // Navigate to the dashboard without parameters in the URL
      this.$router.push({ name: 'dashboard' })

      console.log()

      console.log('The router complete')
    },

    searchMap() {
      if (this.zoneMapToSearch !== null && this.zoneIdToSearch !== 1) {
        const dashboardStore = useDashboardStore()

        // Set the parameters in the store
        dashboardStore.setDashboardParams({
          zoneId: this.zoneMapToSearch.id,
          parentId: this.zoneMapToSearch.parent_id,
          zoneName: this.zoneMapToSearch.name,
          // mapSize: ,
          latitude: this.zoneMapToSearch.latitude,
          longitude: this.zoneMapToSearch.longitude,
          zoomIndex: 9
        })

        this.$router.push({ name: 'dashboard' })
        return
      }

      this.toast.error('Select a zone please')
    },

    async selectZoneToSearch(id) {
      console.log(id)
      this.zoneIdToSearch = id
    },

    async updateZone(zone) {
      this.zoneMapToSearch = zone
      this.searchMap()
    },

    async getReport(zoneId) {
      this.isLoadingMap = true

      try {
        let response = await getReport(zoneId, this.reportType)

        if (response.length == 0) {
          console.log('data is empty 11111111111111111111111111111')

          if (this.zone.vector === null) {
            this.isErrorLoadMap = true
            this.vectorKeys = [0]
            this.isLoadingMap = false
            return
          }

          this.mapSvgPath = this.zone.vector?.path
          this.vectorKeys = this.zone.vector?.keys
          this.isLoadingMap = false
          return
        }
        this.mapSvgPath = response[0].vector.path
        this.vectorKeys = response[0].vector.keys
        this.isLoadingMap = false
      } catch (error) {
        console.error('Error loading map:', error)
        this.isLoadingMap = false
      }
    },

    updateReportType(type) {
      if (type) {
        this.reportType = type
      } else {
        this.reportType = null
      }
      if (this.zone.level_id && this.inSubDivision) this.getReport(this.zone.id)
    },

    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },

    displayChartItemModalStats(label) {
      this.graphLabel = label
      this.showModal()
    },

    goBack() {
      if (this.zoneId == 0) {
        this.$router.go(-1)
      }
    },

    toggleZoneStatistics() {
      this.isZoneStatistics = !this.isZoneStatistics
    },
    toggleZoneStatisticsMobile() {
      this.isZoneStatisticsMObile = !this.isZoneStatisticsMObile
    },
    toggleNavigationZone() {
      this.ShowNavigationZone = !this.ShowNavigationZone
    },
    toggleLayer() {
      this.showLayers = !this.showLayers
      console.log('bonjour')
    },

    toggleKeyActorsVisibility() {
      this.isKeyActorsHidden = !this.isKeyActorsHidden
    },
    toggleShowAllActors() {
      this.showAllActors = !this.showAllActors
    },
    handleResize() {
      // Directly check the window size and update isMobileView
      this.isMobileView = window.innerWidth < 768 // Adjust this breakpoint according to your design
    },

    extractColor(styleString) {
      if (styleString) {
        const match = styleString.match(/fill: (#[0-9a-fA-F]{6})/)
        return match ? match[1] : 'DefaultColor'
      }
      return 'DefaultColor'
    }
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.z-0 {
  z-index: 0; /* Map will be behind other elements */
}

span {
  font-size: 14px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
#tooltip {
  background: #42b983;
  color: white;
  font-size: 0.7em;
  border: 1px solid white;
  border-radius: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
.goback {
  width: auto;
}
.header-nav {
  margin-bottom: 1%;
}
.navigator {
  position: fixed;
  top: 210px;
  z-index: 10;
  right: 2%;
}
.left-element {
  position: absolute;
  top: 120px;
  z-index: 5;
  left: 20px;
}
.buttonClose {
  position: fixed;
  top: 50px;
  right: 40px;
}
.new-checkbox {
  background-color: white;
  position: fixed;
  top: 80px;
  z-index: 1000;
  right: 2%;
}
@media (max-width: 780px) {
  .navigator {
    position: fixed;
    top: 120px;
    z-index: 10;
    right: 10%;
  }

  .optionButton {
    position: fixed;
    top: 100px;
    /* z-index: 5; */
  }
}
</style>

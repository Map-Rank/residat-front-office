<template>
  <MapComponent
    class="fixed mt-[80px] top-0 left-0  z-0"
    :latitude="dashboard.latitude"
    :longitude="dashboard.longitude"
    :zoomIndex="dashboard.zoomIndex"
    @zoneClick="zoneClick"
    @disasterClick="disasterClick"
    :show-layers="showLayers"
    ref="mapComponent"

  />

  <!-- <div class="level-description ">
<div class="p-3">
  <div class=""> <span> float risk level </span> <div class="bg-"></div></div>
  <div> <span> low water level </span></div>
  <div> <span> normal risk level </span></div>
  <div> <span> high risk  </span></div>
  <div> <span> Drought risk  </span></div>



 
</div>

  </div> -->

 
  
  <div class="z-10 px-4 md:px-[50px] pt-1 w-full">
     <!-- web view of show zone statistics -->
   

      <div class="lg:w-[30%]  grid gap-1 left-element md:block hidden">
        <transition name="fade-slide">

          <div class="   min-h-[30vh] relative bottom-[40px] container w-[600px]  h-full max-h-[calc(93vh-10px)] overflow-y-auto bg-red-400 " v-if="showWaterStressChart">
            <button @click="closeWaterStressChart" class="absolute top-[28px] right-9 m-2 text-2xl bg-white  rounded-full">
            ✖
            </button>
        
            <WaterStressChart
              :locality="selectedLocality"
              :data="apiResponseData"
              ></WaterStressChart>
          </div>

        </transition>
        <div class="lg:w-1/4" v-if="!isLoadingMap && inSubDivision">
            <div :class="{ hidden: !displayStatistics }">
              <BaseDropdown @selectedOptionValue="updateReportType" :options="hazard" />
            </div>
        </div>
      </div>

    <!-- mobile view -->
      <div 
      class="lg:w-[30%]  grid gap-1 left-element md:hidden block">
        <transition name="fade-slide">

        <div 
        class="water-stress-chart-container"
      :style="{ height: currentHeight + 'px' }"
      v-if="showWaterStressChart"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
         >
          <button @click="closeWaterStressChart" class="absolute top-2 right-9 m-2 text-2xl bg-white  rounded-full">
           ✖
          </button>
          <div> <FlFilledLineHorizontal1/> <span class="material-symbols-outlined">
</span></div>
          

<WaterStressChart
              :locality="selectedLocality"
              :data="apiResponseData"
              ></WaterStressChart>
        </div>

         </transition>
        <div class="lg:w-1/4" v-if="!isLoadingMap && inSubDivision">
            <div :class="{ hidden: !displayStatistics }">
              <BaseDropdown @selectedOptionValue="updateReportType" :options="hazard" />
        </div>
      </div>
    </div>

    
  
     <div class="moreButton " >  

  <button-ui
        :label="$t('More options')"
        :color="'text-white'"
        :textCss="'text-white font-bold text-center'"
        :customCss="'bg-secondary-normal flex justify-center rounded-lg shadow'"
        @clickButton="toggleOption"
      >
    </button-ui>
</div>
    <div
    v-if="showMore"
      class=" navigator  h-full md:max-h-[calc(100vh-10px)] max-h-[100hv]  flex flex-col gap-2 relative bg-white items-center justify-center w-[28%] overflow-y-auto  pt-[60px]"
    >
    <button @click="closeMoreOption" class="closeButton top-10 right-9 m-2 text-2xl  rounded-full">
        ✖
      </button>
    <div class=" mt-[330px]">
      <label for="hydroPolygonLayer">Show Hydro Polygon Layer</label>

      <label class="flex items-center">
          <input
            type="checkbox"
            v-model="showHydroPolygonLayer"
            @change="toggleHydroPolygonLayer"
            class="form-checkbox h-4 w-4 text-blue-600"
          />
          <span class="ml-2 text-sm">Hydrography map</span>
        </label>
    </div>
      <div
        class="flex md:col-span-6"
        :class="!inSubDivision ? 'lg:col-span-5 min-h-[100vh]' : 'lg:col-span-5 '"
      ></div>

      <div class="col-span-1 md:col-span-2 lg:col-span-2 w-[260px]">
        <div v-if="!isZoneLoading" class="p-4 bg-white rounded shadow  ">
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
            customCss="bg-secondary-normal text-center flex justify-center  px-10 py-3"
            textCss="text-center text-white"
            @clickButton="searchMap"
          ></ButtonUi>
        </div>
      </div>
      <div class="md:w-[80%] w-[76%] " >
  <div class="mt-8 mb-24">
    
    <p class="text-xl font-bold flex justify-center"> show zone stastic</p>
         
        
  <div :class="{  isZoneStatistics }">
          <div class="mt-2 max-h-[30vh] md:w-full">
            <ZoneInfo :zone="zone" />
          </div>

          <div class="mt-4 post-slider">
            <post-slider :posts="posts" status="RECENT" />
          </div>
        </div>
</div>
    </div>
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
import { fetchWaterStressData } from '../../services/graphInfo.js'
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
      showHydroPolygonLayer: false, // To control visibility of hydro layer

      posts: null,
      zone: null,
      geojson: '',
      presentMapId: null,
      zoneIdToSearch: null,
      zoneMarkers: [],
      zoneMapToSearch: null,
      errorImage: '\\assets\\images\\DashBoard\\error-map.svg',
      selectedZone: null,
      selectedLocality: '',
      defaultMapSize: 1,
      showWaterStressChart: false,
      currentHeight: window.innerHeight * 0.3, // Start with 30% of viewport height
      minHeight: window.innerHeight * 0.3, // Minimum height
      maxHeight: window.innerHeight * 1.3, // Maximum height set to 140vh      // maxHeight: 'auto', // Maximum height
      isDragging: false, // Track drag state
      startY: 0, // Starting Y position for drag
      startHeight: 0, // Starting height of the div

      isZoneStatistics: true,
      isZoneStatisticsMObile: false,
      isKeyActorsHidden: false,
      showAllActors: false,
      isLoadingMap: true,
      isErrorLoadMap: false,
      displayStatistics: false,
      reportType: null,
      apiResponseData: [],
      loading: false,
      error: null,
      inSubDivision: true,
      isZoneLoading: false,
      showMore: false,
  
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
        // console.log('this is zone mark lengh  ' + this.zoneMarkers)
        // console.log('Type of zoneMarkeds: ' + typeof this.zoneMarkeds);
      } catch (error) {
        console.error('Failed to fetch zone markers:', error)
      }
    },
    zoneClick(zoneMarked, zoomIndex) {
      // console.log('navigating after zone click')
      // console.log(zoneMarked)

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
      // console.log('The router complete')
    },
    async disasterClick(marker) {
      // console.log('navigating after disaster click')
      // console.log(marker)

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
      this.loading = true;
      this.error = null;
      this.showWaterStressChart = true;
      this.selectedLocality = marker.locality;

      if (!marker.zone_id) {
        this.error = 'Zone ID is required.';
        this.loading = false;
        return;
      }

      try {
        // console.log('Fetching water stress data for zone ID:', marker.zone_id);
        this.apiResponseData = await fetchWaterStressData(marker.zone_id);
        
        // Navigate to the dashboard without parameters in the URL
        this.$router.push({ name: 'dashboard' });
      } catch (error) {
        this.error = error.message || 'Failed to fetch water stress data';
      } finally {
        this.loading = false;
      }
    },
  


    closeWaterStressChart() {
      this.showWaterStressChart = false;
    },
    handleTouchStart(event) {
      this.isDragging = true;
      this.startY = event.touches[0].clientY;
      this.startHeight = this.currentHeight;
    },
    handleTouchMove(event) {
      if (!this.isDragging) return;
      const deltaY = this.startY - event.touches[0].clientY;
      let newHeight = this.startHeight + deltaY;

      // Constrain height within min and max bounds
      if (newHeight < this.minHeight) {
        newHeight = this.minHeight;
      } else if (newHeight > this.maxHeight) {
        newHeight = this.maxHeight;
      }

      this.currentHeight = newHeight;
    },
    handleTouchEnd() {
      this.isDragging = false;
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
      // console.log(id)
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
          // console.log('data is empty 11111111111111111111111111111')

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
    closeMoreOption(){
      this.showMore= false; 
      
    },
    toggleOption(){
      this.showMore= true;

    }, 
    toggleHydroPolygonLayer() {
      // this.$refs.mapComponent.toggleHydroPolygonLayer(this.showHydroPolygonLayer);
      if (this.showHydroPolygonLayer) {
        this.$refs.mapComponent.loadHydroPolygonGeoJson();
      } else {
        this.$refs.mapComponent.removeHydroPolygonLayer();
      }
    },
    toggleZoneStatistics() {
      this.isZoneStatistics = !this.isZoneStatistics
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 2s ease;
}
.goback {
  width: auto;
}
.header-nav {
  margin-bottom: 1%;
}
.navigator {
  position: fixed;
  top: 80px;
  z-index: 5;
  right: 0;
  /* padding-top: 30px;
  padding-bottom: 50px; */
}
.navigatorMobile{
  position: fixed;
  top: 90px;
  z-index: 10;
  right: 10%;


}
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}
.left-element {
  position: fixed;
  top: 100px;
  z-index: 5;
  left: 0px;
}
/* .new-checkbox {
 
} */
.buttonClose {
  position: fixed;
  top: 50px;
  right: 40px;
}
/* .new-checkbox {
  background-color: white;
  position: fixed;
  top: 80px;
  z-index: 1000;
  right: 2%;
} */
.closeButton{
  position: fixed;
  top: 80px;
  z-index: 1000;
  right: 2%;

}
.moreButton{
  position: fixed;
  top: 100px;
  z-index: 3;
  right: 4%;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); */
}
.level-description {
  background-color: white;
  position: fixed;
  top: 80px;
  z-index: 1000;
  right: 20%;
}
.water-stress-chart-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white; /* Adjust as needed */
  min-height: 30vh; /* Minimum height when collapsed */
  max-height: 130vh; /* Maximum height */
  border-radius: 30px 30px 0 0; /* Rounded top corners */
  transition: height 0.03s ease-in-out; /* Smooth height transition */
  overflow-y: hidden; /* Scrollable content */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  z-index: 1000; /* Ensure it's above other elements */
}

.water-stress-chart-container::-webkit-scrollbar {
  width: 8px;
}

.water-stress-chart-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.water-stress-chart-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}

/* Optional: Style drag handle */
.drag-handle {
  height: 10px;
  width: 100px;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 5px;
  cursor: ns-resize;
}
@media (max-width: 780px) {
  .navigator {
  position: fixed;
        top: 78px;
        z-index: 10;
        right: 0%;
        width: auto;
        padding-top: 50px;
        padding-bottom: 90px;

  }

  
}
</style>
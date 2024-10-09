<template>
  <MapComponent 
    class="fixed mt-[80px] top-0 left-0 w-full h-full z-0"
    :latitude="latitude"
    :longitude="longitude"
    :zoomIndex="zoomIndex"    
    :propGeojson="geojson"    
    @markerClick="markerClick"
  />
  <div class="z-10 bg-primary-light px-4 md:px-[50px] pt-1 w-full min-h-screen">


    <div
      class="grid mt-4 space-y-4 md:space-y-0 md:flex md:space-x-4 row-auto md:justify-between md:h-10 z-1 relative header-nav"
    >

      <div class="lg:w-1/4 md:w-3/4 grid gap-1">
        <!-- <div class="">
            <button-ui
              :label="$t('water_risk')"
              :color="'text-white'"
              :textCss="'text-white font-bold text-center'"
              :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
              @clickButton="toggleWaterStressGraphVisibility()"
            >
            </button-ui>
          </div> -->

        <div class="mt-2 w-[100%] max-h-[30vh]" :class="{ hidden: isWaterStressGraphHidden }">
          <WaterStressChart></WaterStressChart>
        </div>

      <div class="mt-2 max-h-[30vh] w-full">
        <ZoneInfo :zone="zone" />
      </div>
      

        <div class="mt-8">


          <post-slider :posts="this.posts" status="RECENT" />
        </div>
      </div>

      <div class="lg:w-1/4" v-if="!isLoadingMap && inSubDivision">
        <div :class="{ hidden: !displayStatistics }">
          <BaseDropdown @selectedOptionValue="updateReportType" :options="hazard" />
        </div>
      </div>

      <div class="lg:w-1/3 hidden lg:block" v-if="!isLoadingMap && inSubDivision">
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

            <!-- <div :class="{ hidden: isKeyActorsHidden }" class="hidden sm:block">
              <key-actors
                :sectionTitle="$t('key_actors')"
                :actors="actors"
                :showAll="showAllActors"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row flex-wrap md:grid md:grid-cols-8 gap-2">
      <div class="w-full">
        <div v-if="!isZoneLoading" class="md:hidden mb-4 p-4 bg-white rounded shadow w-full">
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

        <!-- <div class=" hidden sm:block mt-2 sm:mt-0 z-1 relative bg-white rounded-md py-4" v-if="vectorKeys && vectorKeys.length > 0">
          <div
            v-for="(key, index) in vectorKeys"
            :key="index"
            class="flex items-center gap-3 mb-2 cursor-pointer"
          >
            <img v-if="key.type == 'IMAGE'" :src="key.value" height="30px" width="30px" />
            <span
              v-if="key.type == 'COLOR'"
              class="block w-4 h-4"
              :style="{ backgroundColor: key.value }"
            ></span>
            <span
              @click="handleVectorClick(key)"
              class="text-sm font-semibold"
              :class="{ 'text-gray-700': !key.value, 'text-primary-normal': key.value }"
              >{{ key.name }}</span
            >
          </div>
        </div> -->
      </div>

      <div
        class="flex md:col-span-6"
        :class="!inSubDivision ? 'lg:col-span-5 min-h-[90vh]' : 'lg:col-span-5 min-h-[70vh]'"
      >
        <!-- <div v-if="isLoadingMap" class="flex h-full w-full justify-center items-center">
          <MapShimmer :legendItems="5" />
        </div> -->

        <div
          v-if="isErrorLoadMap && !isLoadingMap"
          class="flex h-full w-full justify-center items-center"
        >
          <RefreshError
            :imageUrl="errorImage"
            :errorMessage="errorMessage"
            @refreshPage="reloadMap()"
            :hideButton="true"
          >
          </RefreshError>
        </div>

        <div id="tooltip" display="none" style="position: absolute; display: none"></div>

        <!-- <div v-if="isSVG && !isLoadingMap && !isErrorLoadMap" class="w-full">
          <div class="h-[80vh]">
             
            <inline-svg
              @mousemove="handleStateHover"
              @mouseout="handleStateLeave"
              fill-opacity="1"
              :color="'#fff'"
              fill="black"
              :src="mapSvgPath"
              @click="handleStateClick"
              width=""
              height=""
            />
          </div>
          <div class="h-[150px] rounded-lg" v-if="!isLoadingMap && inSubDivision">
            <div class="hidden lg:flex justify-between p-4 space-x-3">
              <div class="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src="\assets\images\DashBoard\3d-map.jpg"
                  alt="Image 1"
                  class="w-full h-[120px] object-cover"
                />
              </div>
              <div class="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src="\assets\images\DashBoard\3d-map.jpg"
                  alt="Image 2"
                  class="w-full h-[120px] object-cover"
                />
              </div>
              <div class="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src="\assets\images\DashBoard\3d-map.jpg"
                  alt="Image 3"
                  class="w-full h-[120px] object-cover"
                />
              </div>
              <div class="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                <img
                  src="\assets\images\DashBoard\3d-map.jpg"
                  alt="Image 4"
                  class="w-full h-[120px] object-cover"
                />
              </div>
            </div>
          </div>
        </div> -->
     
     
     
      </div>

      <div class="hidden md:block col-span-1 md:col-span-2 lg:col-span-2">
        <div v-if="!isZoneLoading" class="mb-4 p-4 bg-white rounded shadow new-element">
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

    <div
      class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-10 md:space-x-3"
      :class="{ hidden: !displayStatistics }"
      v-if="!isLoadingMap && inSubDivision"
    >
      <div class="col-span-1">
        <DegreeImpactDoughnutChart
          :label="$t('degree_of_impact')"
          canvasId="impactChart"
          :percentage="20"
        ></DegreeImpactDoughnutChart>
      </div>
      <div class="col-span-1">
        <BaseBarChart
          :canvas-id="'climateVulnerabilityIndex'"
          :data="climateVulnerabilityIndex"
          :label="$t('climate_vulnerability_index')"
          @clickItem="displayChartItemModalStats"
        ></BaseBarChart>
      </div>
      <div class="col-span-1">
        <BaseBarChart
          @clickItem="displayChartItemModalStats"
          :canvas-id="'climateRiskThreats'"
          :data="climateRiskThreats"
          :label="$t('climate_risk_threats')"
          :isHorizontal="true"
          :barSpacing="30"
        ></BaseBarChart>
      </div>
    </div>

    <Modal v-show="isModalVisible" :label="graphLabel" @close="closeModal" />
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import KeyActors from '@/components/common/KeyActors/KeyActor.vue'
import BaseBarChart from '../../components/base/Charts/BaseBarChart.vue'
import DegreeImpactDoughnutChart from '@/components/base/Charts/DegreeImpactDoughnutChart.vue'
// import InlineSvg from 'vue-inline-svg'
import WaterStressChart from '../../components/base/Charts/WaterStressChart.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'
import { getSpecificZones, getSpecificMapZones,getZones } from '../../services/zoneService'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import { getReport } from '@/services/reportService.js'
import { ReportType } from '@/constants/reportData.js'
import { ChartItemData } from '@/constants/chartData.js'
import Modal from '@/components/common/Modal/Modal.vue'
// import MapShimmer from '@/components/common/ShimmerLoading/MapShimmer.vue'
import ZonePostFilter from '@/features/Community/components/ZonePostFilter/ZonePostFilter.vue'
import { useToast } from 'vue-toastification'
import MapComponent from '@/features/DashBaord/components/MapComponent.vue'
import { getZoomIndexByLevel } from '@/utils/formating.js'
import ZoneInfo from '@/features/DashBaord/components/ZoneInfo.vue'
import PostSlider from '@/features/DashBaord/components/PostSlider.vue'
import {  getFilterPosts } from '@/features/Post/services/postService.js'

export default {
  name: 'DashBoardView',

  components: {
    ZonePostFilter,
    BaseDropdown,
    // KeyActors,
    PostSlider,
    ZoneInfo,
    BaseBarChart,
    DegreeImpactDoughnutChart,
    // InlineSvg,
    WaterStressChart,
    ButtonUi,
    RefreshError,
   
    Modal,
    MapComponent
    // MapShimmer
  },

  async mounted() {
    // await this.fetchZoneMarkeds()
  },

  watch: {
    $route: {
      immediate: true,
      async handler() {
        this.isLoadingMap = true
        this.isErrorLoadMap = false
          // await this.fetchZoneMarkeds()
        
        if (this.zoneId === 1) {
          this.zone = await getSpecificZones(this.zoneId)
          this.posts = await getFilterPosts(this.zoneId, null, 4);
          // this.zoneMarkers = this.zone
          this.presentMapId = this.zone.id
          this.mapSvgPath = this.zone.vector.path
          this.vectorKeys = this.zone.vector.keys
        } else {
          const zones = await getSpecificMapZones(this.parentId, this.zoneName, 1)
       

          // console.log(zones)

          if (zones.length > 0) {
            this.posts = await getFilterPosts(zones[0].id, null, 4);
            
            if (zones[0].level_id == 4) {
              this.inSubDivision = true
              this.reportType = null
              this.zone = zones[0]
              this.geojson = this.zone.geojson
              this.displayStatistics = true
              // this.inSubDivision = true
              this.getReport(this.zone.id)
              return
            }
            
            this.zone = zones[0]
            this.geojson = this.zone.geojson
            this.posts = await getFilterPosts(zones[0].id, null, 4);
            this.presentMapId = this.zone.id
            this.mapSvgPath = this.zone.vector?.path
            this.vectorKeys = this.zone.vector?.keys
          } else {
            this.isErrorLoadMap = true
            this.vectorKeys = [0]
          }
        }
        this.isLoadingMap = false
      }
    }
  },

  props: ['zoneId', 'parentId', 'zoneName', 'mapSize', 'latitude', 'longitude', 'zoomIndex'],
  data() {
    return {
      toast: useToast(),
      mapSvgPath: null,
      child_component: 'equipment',
      vectorKeys: [],
      hoverMapText: 'Map',
      isModalVisible: false,
      graphLabel: '',
      posts:null,
      zone: null,
      geojson: '',
      presentMapId: null,
      zoneIdToSearch: null,
      zoneMarkers:[],
      zoneMapToSearch: null,
      errorImage: '\\assets\\images\\DashBoard\\error-map.svg',
      selectedZone: null,
      defaultMapSize: 1,
      isSubDivisionGraph: false,
      isWaterStressGraphHidden: false,
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
        const zones = await getZones(2,null);
        this.zoneMarkers.push(zones);
        // this.zoneMarkers = await getZones(2,null);
        console.log('this is zone mark lengh  ' + this.zoneMarkers)
        // console.log('Type of zoneMarkeds: ' + typeof this.zoneMarkeds);
      } catch (error) {
        console.error('Failed to fetch zone markers:', error);
      }
    }
  ,


    markerClick(zoneMarked){

      console.log('marker is clicked');
      console.log(zoneMarked)
      this.$router.push({
        name: 'dashboard',
        params: {
          zoneId: zoneMarked.id,
          parentId: zoneMarked.parent_id,
          zoneName: zoneMarked.name,
          latitude: zoneMarked.latitude,
          longitude: zoneMarked.longitude,
          zoomIndex: 9
        }
      })

      console.log('the router complte')
    },
    searchMap() {
      if (this.zoneMapToSearch !== null && this.zoneIdToSearch !== 1) {
        const zoomLevelIndex = getZoomIndexByLevel(this.zoneMapToSearch.level_id)

        this.$router
          .push({
            name: 'dashboard',
            params: {
              zoneId: this.zoneMapToSearch.id,
              parentId: this.zoneMapToSearch.parent_id,
              zoneName: this.zoneMapToSearch.name,
              mapSize: this.defaultMapSize,
              latitude: this.zoneMapToSearch.latitude,
              longitude: this.zoneMapToSearch.longitude,
              zoomIndex: zoomLevelIndex
            }
          })
          .then(() => {
            // Using window.location.reload() to reload the entire page
            this.updateMap({
              latitude: this.zoneMapToSearch.latitude,
              longitude: this.zoneMapToSearch.longitude,
              zoomIndex: zoomLevelIndex
            })
          })
          .catch((err) => {
            console.error('Router push failed', err)
          })
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

    handleVectorClick(key) {
      if (key != null && key.name != null) {
        this.selectedZone = key.name
        console.log(this.selectedZone)

        console.log(this.selectedZone)
        console.log(this.presentMapId)
        this.$router.push({
          name: 'dashboard',
          params: {
            zoneId: 0,
            parentId: this.presentMapId,
            zoneName: this.selectedZone,
            mapSize: this.defaultMapSize
          }
        })
        this.vectorKeys = [0]
        this.inSubDivision = false
      }
    },
    handleStateClick: async function (e) {
      if (e.target.tagName === 'path') {
        if (e.target.dataset.name) {
          this.selectedZone = e.target.dataset
          this.hoverMapText = this.selectedZone.name

          console.log(this.selectedZone)
          this.$router.push({
            name: 'dashboard',
            params: {
              zoneId: 0,
              parentId: this.presentMapId,
              zoneName: this.selectedZone.name,
              mapSize: this.defaultMapSize
            }
          })
          this.vectorKeys = [0]
          this.inSubDivision = false
        }
      }
      this.hideTooltip()
    },

    handleStateHover: function (e) {
      if (e.target.tagName === 'path') {
        let name = e.target.dataset.name
        if (typeof name !== 'undefined') {
          this.showTooltip(e, name)
        }

        // Check if the path is marked as active
        // if (e.target.dataset.active === 'true') {
        this.originalFillColor = e.target.style.fill || e.target.getAttribute('fill') // Store original color
        this.originalStrokeColor = e.target.style.stroke || e.target.getAttribute('stroke') // Store original stroke

        // Apply new fill and stroke styles for hover effect
        // e.target.setAttribute('fill', '#42b983'); // Change fill color
        e.target.setAttribute('stroke', '#ffff') // Change stroke color
        e.target.setAttribute('stroke-width', '10') // Increase stroke width
        // }
      }
    },

    handleStateLeave: function (e) {
      if (e.target.tagName === 'path') {
        this.hideTooltip()

        // Reset to original fill and stroke values on mouse out
        // if (e.target.dataset.active === 'true') {
        e.target.setAttribute('fill', this.originalFillColor) // Reset the fill color
        e.target.setAttribute('stroke', this.originalStrokeColor) // Reset the stroke color
        e.target.setAttribute('stroke-width', '0.25px') // Reset stroke width to original value
        // }
      }
    },

    showTooltip: function (evt, text) {
      const tooltip = document.getElementById('tooltip')
      tooltip.innerHTML = text
      tooltip.style.display = 'block'
      tooltip.style.left = evt.pageX + 10 + 'px'
      tooltip.style.top = evt.pageY + 10 + 'px'
    },

    hideTooltip: function () {
      var tooltip = document.getElementById('tooltip')
      tooltip.style.display = 'none'
    },

    reloadMap() {},

    toggleWaterStressGraphVisibility() {
      this.isWaterStressGraphHidden = !this.isWaterStressGraphHidden
    },
    toggleKeyActorsVisibility() {
      this.isKeyActorsHidden = !this.isKeyActorsHidden
    },
    toggleShowAllActors() {
      this.showAllActors = !this.showAllActors
    },

    extractColor(styleString) {
      if (styleString) {
        const match = styleString.match(/fill: (#[0-9a-fA-F]{6})/)
        return match ? match[1] : 'DefaultColor'
      }
      return 'DefaultColor'
    }
  },
  computed: {
    isSVG() {
      return this.mapSvgPath && this.mapSvgPath.endsWith('.svg')
    },
    errorMessage() {
      return ` ${this.zoneName} map not yet available`
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

.z-10 {
  z-index: 10; /* Ensure other elements are above the map */
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
.new-element {
  position: absolute;
  top: 100px;
  z-index: 1000;
  right: 20px;
}
</style>

<template>
  <div class="bg-primary-light px-4 md:px-[50px] pt-1 w-full min-h-screen">
    <div
      class="grid mt-4 space-y-4 md:space-y-0 md:flex md:space-x-4 row-auto md:justify-between md:h-10 z-1 relative"
    >
      <div class="lg:w-2/4 md:w-3/4">
        <div :class="{ hidden: !displayStatistics }">
          <div class="">
            <button-ui
              :label="'Water Risk'"
              :color="'text-white'"
              :textCss="'text-white font-bold text-center'"
              :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
              @clickButton="toggleWaterStressGraphVisibility()"
            >
            </button-ui>
          </div>

          <div :class="{ hidden: isWaterStressGraphHidden }">
            <WaterStressChart></WaterStressChart>
          </div>
        </div>
      </div>

      <div class="lg:w-1/4">
        <div :class="{ hidden: !displayStatistics }">
          <BaseDropdown :options="hazard" />
        </div>
      </div>

      <div class="lg:w-1/3 hidden lg:block">
        <div class="md:block">
          <div class="">
            <div class="">
              <button-ui
                :label="'Key Actors'"
                :color="'text-white'"
                :textCss="'text-white font-bold text-center'"
                :customCss="'bg-secondary-normal flex justify-center rounded-lg'"
                @clickButton="toggleShowAllActors()"
              >
              </button-ui>
            </div>

            <div :class="{ hidden: isKeyActorsHidden }" class="hidden sm:block">
              <key-actors :sectionTitle="'KEY ACTORS'" :actors="actors" :showAll="showAllActors" />
            </div>
          </div>
        </div>
        <!-- <health></health> -->
      </div>
    </div>
    <div class="flex flex-row flex-wrap md:grid md:grid-cols-8 gap-2">
      <div class="col-span-1 md:col-span-2 lg:col-span-1">
        <div></div>
        <div class="mt-2 sm:mt-0">
          <div v-for="(key, index) in vectorKeys" :key="index" class="flex items-center gap-3 mb-2">
            <span class="block w-4 h-4" :style="{ backgroundColor: key.value }"></span>
            <span
              class="text-sm font-semibold"
              :class="{ 'text-gray-700': !key.value, 'text-primary-normal': key.value }"
              >{{ key.name }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex md:col-span-6 lg:col-span-5 h-[70vh]">
        <div v-if="isLoadingMap" class="flex h-full w-full justify-center items-center">
          <LoadingIndicator />
        </div>

        <div
          v-if="isErrorLoadMap && !isLoadingMap"
          class="flex h-full w-full justify-center items-center"
        >
          <!-- <LoadingIndicator /> -->

          <RefreshError
            :imageUrl="errorImage"
            :errorMessage="errorMessage"
            @refreshPage="reloadMap()"
            :hideButton="true"
          ></RefreshError>
        </div>

        <div v-if="isSVG && !isLoadingMap && !isErrorLoadMap" class="w-full">
          <inline-svg
            :title="hoverMapText"
            fill-opacity="1"
            :color="'#fff'"
            fill="black"
            :src="mapSvgPath"
            @click="handleStateClick"
            width=""
            height=""
          />
        </div>
        <div v-else>
          <img :src="mapSvgPath" alt="" />
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 py-10 space-y-2 space-x-3"
      :class="{ hidden: !displayStatistics }"
    >
      <div class="col-span-1">
        <DegreeImpactDoughnutChart
          label="Degree of Impact"
          canvasId="impactChart"
          :percentage="20"
        ></DegreeImpactDoughnutChart>
      </div>
      <div class="col-span-1">
        <BaseBarChart
          :canvas-id="'climateVulnerabilityIndex'"
          :data="climateVulnerabilityIndex"
          label="Climate Vulnerability Index"
          @clickItem="displayChartItemModalStats"
        ></BaseBarChart>
      </div>
      <div class="col-span-1">
        <BaseBarChart
          :canvas-id="'climateRiskThreats'"
          :data="climateRiskThreats"
          label="Climate Risk Threats"
          :isHorizontal="true"
          :barSpacing="30"
        ></BaseBarChart>
      </div>
    </div>

    <div class="mx-auto">
      <health v-if="modalStates.healthVisible"></health>
      <agricultural v-if="modalStates.agricultureVisible"></agricultural>
      <infrastructure v-if="modalStates.infrastructureVisible"></infrastructure>
      <social v-if="modalStates.socialVisible"></social>
      <food-security v-if="modalStates.foodSecurityVisible"></food-security>
      <migration v-if="modalStates.migrationVisible"></migration>
      <water-stress v-if="modalStates.waterStressVisible"></water-stress>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import KeyActors from '@/components/common/KeyActors/KeyActor.vue'
import BaseBarChart from '../../components/base/Charts/BaseBarChart.vue'
import DegreeImpactDoughnutChart from '@/components/base/Charts/DegreeImpactDoughnutChart.vue'
import InlineSvg from 'vue-inline-svg'
import WaterStressChart from '../../components/base/Charts/WaterStressChart.vue'
import ButtonUi from '@/components/base/ButtonUi.vue'
import { getSpecificZones, getSpecificMapZones } from '../../services/zoneService'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import RefreshError from '@/components/common/Pages/RefreshError.vue'
import health from '@/components/vulnerabilities/health.vue'
import agricultural from '@/components/vulnerabilities/agricultural.vue'
import infrastructure from '@/components/vulnerabilities/infrastructure.vue'
import social from '@/components/vulnerabilities/social.vue'
import foodSecurity from '@/components/vulnerabilities/foodSecurity.vue'
import migration from '@/components/vulnerabilities/migration.vue'
import waterStress from '@/components/vulnerabilities/waterStress.vue'

export default {
  name: 'DashBoardView',
  async mounted() {},

  components: {
    BaseDropdown,
    KeyActors,
    BaseBarChart,
    DegreeImpactDoughnutChart,
    InlineSvg,
    WaterStressChart,
    ButtonUi,
    LoadingIndicator,
    RefreshError,
    health,
    agricultural,
    infrastructure,
    social,
    foodSecurity,
    migration,
    waterStress
  },

  watch: {
    $route: {
      immediate: true,
      async handler() {
        this.isLoadingMap = true
        this.isErrorLoadMap = false

        // console.log(this.zoneId);

        if (this.zoneId === 1) {
          this.zone = await getSpecificZones(this.zoneId)
          this.presentMapId = this.zone.id
          this.mapSvgPath = this.zone.vector.path
          this.vectorKeys = this.zone.vector.keys
        } else {
          const zones = await getSpecificMapZones(this.parentId, this.zoneName, this.mapSize)

          console.log(zones)

          if (zones.length > 0) {
            if (this.zone.id > 69) {
              this.displayStatistics = true
            }

            this.zone = zones[0]
            this.presentMapId = this.zone.id
            this.mapSvgPath = this.zone.vector.path
            this.vectorKeys = this.zone.vector.keys
          } else {
            this.isErrorLoadMap = true
            this.vectorKeys = [0]
          }
        }

        this.isLoadingMap = false
      }
    }
  },

  props: ['zoneId', 'parentId', 'zoneName', 'mapSize'],
  data() {
    return {
      mapSvgPath: null,
      vectorKeys: [],
      hoverMapText: 'Map',
      zone: null,
      presentMapId: 1,
      errorImage: '\\assets\\images\\DashBoard\\error-map.svg',
      selectedZone: null,
      defaultMapSize: 1,
      isSubDivisionGraph: false,
      isWaterStressGraphHidden: true,
      isKeyActorsHidden: false,
      showAllActors: false,
      isLoadingMap: false,
      isErrorLoadMap: false,
      displayStatistics: true,
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
        { name: 'Health', percentage: 100 },
        { name: 'Agriculture', percentage: 50 },
        { name: 'Infrastructure', percentage: 25 },
        // { name: 'Business', percentage: 75 },
        { name: 'Social', percentage: 20 }
      ],
      climateRiskThreats: [
        { name: 'food security', percentage: 100 },
        { name: 'water stress', percentage: 50 },
        { name: 'epidemics', percentage: 25 },
        { name: 'Business', percentage: 75 },
        { name: 'migration', percentage: 20 }
      ],

      horizintalChartOption: {
        indexAxis: 'y'
      },

      hazard: [
        { id: 0, name: 'Chose Environmental Hazard' },
        { id: 1, name: 'Floods' },
        { id: 2, name: 'Drought' }
      ],
      actors: [
        {
          title: 'Unicef',
          logoUrl:
            'https://th.bing.com/th/id/R.c215149a745003175ddd655e61354b5d?rik=Pqwr0cNGR4XuXA&pid=ImgRaw',
          name: 'Unicef'
        },
        {
          title: 'Wealth Health Organization',
          logoUrl:
            'https://logos-world.net/wp-content/uploads/2021/03/World-Health-Organization-WHO-Symbol.png',
          name: 'World Health Organization'
        },
        {
          title: 'Event 3',
          logoUrl:
            'https://th.bing.com/th/id/R.16993675fe4104ffd838eaf642447350?rik=z4n%2fwfldXMhA1g&pid=ImgRaw&r=0',
          name: 'Government'
        },
        {
          title: 'Event 3',
          logoUrl: 'https://th.bing.com/th/id/OIP.5k9XKswGsc5diwfswIWqiQHaHa?rs=1&pid=ImgDetMain',
          name: 'Health Aid International Organization'
        },
        {
          title: 'Event 3',
          logoUrl:
            'https://logos-download.com/wp-content/uploads/2018/09/Economic_Cooperation_Organization_Logo.png',
          name: 'Economic Cooperation Organization'
        }
      ]
    }
  },

  methods: {
    displayChartItemModalStats(label) {
      console.log(label)
      console.log('hello i just click')

        // Reset all modal visibility states
  Object.keys(this.modalStates).forEach(key => {
    this.modalStates[key] = false;
  });

  // Activate the modal related to the clicked label
  switch (label.toLowerCase()) {
    case 'health':
      this.modalStates.healthVisible = true;
      break;
    case 'agriculture':
      this.modalStates.agricultureVisible = true;
      break;
    case 'infrastructure':
      this.modalStates.infrastructureVisible = true;
      break;
    case 'social':
      this.modalStates.socialVisible = true;
      break;
    case 'food security':
      this.modalStates.foodSecurityVisible = true;
      break;
    case 'migration':
      this.modalStates.migrationVisible = true;
      break;
    case 'water stress':
      this.modalStates.waterStressVisible = true;
      break;
    default:
      console.log('No matching label found');
      break;
  }
    },

    handleStateClick: async function (e) {
      if (e.target.tagName === 'path') {
        if (e.target.dataset.name) {
          this.selectedZone = e.target.dataset
          this.hoverMapText = this.selectedZone.name

          console.log(this.selectedZone)
          this.$router.push({
            name: 'dashbaord',
            params: {
              zoneId: this.zoneId,
              parentId: this.presentMapId,
              zoneName: this.selectedZone.name,
              mapSize: this.defaultMapSize
            }
          })
        }
      }
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
span {
  font-size: 14px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

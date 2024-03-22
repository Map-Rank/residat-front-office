<template>
  <div class="bg-primary-light px-4 md:px-[50px] pt-1 w-full">
    <div
      class="grid space-y-4 md:space-y-0 md:flex md:space-x-4 row-auto md:justify-between md:h-10 z-1 relative"
    >
      <div class="md:w-2/4">
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
      <div class="md:w-1/4">
        <BaseDropdown :options="hazard" />
      </div>

      <div class="md:w-1/3">
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

            <div :class="{ hidden: isKeyActorsHidden }">
              <key-actors :sectionTitle="'KEY ACTORS'" :actors="actors" :showAll="showAllActors" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row flex-wrap md:grid md:grid-cols-8 gap-2">
      <div class="col-span-1">
        <div class="gap-2 p-4">
          <div v-for="(key, index) in vectorKeys" :key="index" class="flex items-center gap-2">
            <span class="block w-4 h-4 rounded-full" :style="{ backgroundColor: key.color }"></span>
            <span
              class="text-sm font-semibold"
              :class="{ 'text-gray-700': !key.color, 'text-primary-normal': key.color }"
              >{{ key.name }}</span
            >
          </div>
        </div>
      </div>

      <div class="flex md:col-span-5">
          <!-- <div >
            <img :src="mapSvgPath" alt="" />
          </div>

          <inline-svg
            title="Cameroon Map"
            fill-opacity="1"
            :color="'#fff'"
            fill="black"
            :src="mapSvgPath"
            width=""
          />  -->

        <div v-if="isSVG" class="w-full">
          <inline-svg
            title="Cameroon Map"
            fill-opacity="1"
            :color="'#fff'"
            fill="black"
            :src="mapSvgPath"
            width=""
          />
        </div>
        <div v-else>
          <img :src="mapSvgPath" alt="" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 py-10 space-x-3">
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
import { getSpecificZones } from '../../services/zoneService'

export default {
  name: 'DashBoardView',
 mounted()  {
    this.extractSVGKeys()
  //  this.getZone()
  },
  data() {
    return {
      mapSvgPath: '\\assets\\svgs\\far-north.svg',
      // mapSvgPath: 'https://backoffice-dev.residat.com/media/NUxpVudKyygJBNUzsqlgGdIlod8KytNPrt09hqBH.svg',
      // mapSvgPath: null,
      vectorKeys: [],
      zone:null,
      isSubDivisionGraph: false,
      isWaterStressGraphHidden: true,
      isKeyActorsHidden: false,
      showAllActors:false,

      climateVulnerabilityIndex: [
        { name: 'Health', percentage: 100 },
        { name: 'Agriculture', percentage: 50 },
        { name: 'Infrastructure', percentage: 25 },
        { name: 'Business', percentage: 75 },
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
          logoUrl:
            'https://th.bing.com/th/id/OIP.5k9XKswGsc5diwfswIWqiQHaHa?rs=1&pid=ImgDetMain',
          name: 'Health Aid International Organization'
        },
        {
          title: 'Event 3',
          logoUrl:
            'https://logos-download.com/wp-content/uploads/2018/09/Economic_Cooperation_Organization_Logo.png',
          name: 'Economic Cooperation Organization'
        },
      ]
    }
  },

  methods: {

    async getZone(){
      this.zone= await getSpecificZones(4)
      // this.mapSvgPath= this.zone.vector.path
      this.vectorKeys = this.zone.vector.keys
      // console.log(this.zone)

    },
    toggleWaterStressGraphVisibility() {
      this.isWaterStressGraphHidden = !this.isWaterStressGraphHidden
    },
    toggleKeyActorsVisibility() {
      this.isKeyActorsHidden = !this.isKeyActorsHidden
    },
    toggleShowAllActors() {
      this.showAllActors = !this.showAllActors
    },
    async extractSVGKeys() {
      this.vectorKeys.splice(0, this.vectorKeys.length)

      const response = await fetch(this.mapSvgPath)
      const svgText = await response.text()

      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const paths = svgDoc.querySelectorAll('path')

      const extractedData = Array.from(paths).map((path) => ({
        id: path.getAttribute('data-id'),
        value: this.extractColor(path.getAttribute('style') || path.getAttribute('fill')),
        type: this.isSvg ? 'color' : 'image',
        name: path.getAttribute('data-name'),
        color: path.getAttribute('fill') || this.extractColor(path.getAttribute('style'))
      }))

      this.vectorKeys.push(...extractedData)
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
      return this.mapSvgPath.endsWith('.svg')
    }
  },
  components: {
    BaseDropdown,
    KeyActors,
    BaseBarChart,
    DegreeImpactDoughnutChart,
    InlineSvg,
    WaterStressChart,
    ButtonUi
  }
}
</script>

<template>
  <div class="bg-primary-light px-100 pt-10">
    <div class="grid grid-cols-1 md:grid-cols-8 gap-2">
      <div class="col-span-1">

        <div v-for="(key, index) in vectorKeys" :key="index">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              :style="{ backgroundColor: key.color }">@{{ key.id }}</span>
      </div>
      </div>
    
      <div class="col-span-5">
        <div v-if="isSVG">
          <inline-svg
            title="Cameroon Map"
            fill-opacity="1"
            :color="'#fff'"
            fill="black"
            :src="mapSvgPath"
          />
        </div>
        <div v-else>
          <img :src="mapSvgPath" alt="" />
        </div>
      </div>

      <div class="col-span-2">
        <div class="mb-6">
          <BaseDropdown :options="hazard" />
        </div>
        <key-actors :sectionTitle="'KEY ACTORS'" :actors="actors" />
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
          :barThickness="60"
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

export default {
  name: 'DashBoardView',
  mounted() {},
  data() {
    return {
    

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
          name: 'Wealth Health Organization'
        },
        {
          title: 'Event 3',
          logoUrl:
            'https://th.bing.com/th/id/R.16993675fe4104ffd838eaf642447350?rik=z4n%2fwfldXMhA1g&pid=ImgRaw&r=0',
          name: 'Government'
        }
        // Add more events as needed
      ],
      mapSvgPath: 'public\\assets\\svgs\\far-north.svg',
      vectorKeys: [],
    }
  },

  methods: {
    processSVGFile(event) {
      this.vectorKeys.splice(0, this.vectorKeys.length)

      const file = event.target.files[0]
      if (!file) {
        this.imageFile = null
        return
      }

      this.isSvg = file.type === 'image/svg+xml'
      this.imageFile = URL.createObjectURL(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(e.target.result, 'image/svg+xml')
        const paths = svgDoc.querySelectorAll('path')

        const extractedData = Array.from(paths).map((path) => ({
          id: path.getAttribute('data-id'),
          value: this.extractColor(path.getAttribute('style')),
          type: this.isSvg ? 'color' : 'image',
          name: path.getAttribute('data-name'),
          color: this.extractColor(path.getAttribute('style'))
        }))

        this.vectorKeys.push(...extractedData)
      }
      reader.readAsText(file)
    },

    extractColor(styleString) {
      const match = styleString.match(/fill: (\\#[0-9a-fA-F]{6})/)
      return match ? match[1] : 'DefaultColor' // Return a default color or null if no match
    }
  },

  computed: {
    isSVG() {
      return this.mapSvgPath.endsWith('.svg')
    }
  },
  components: {
    // UnderConstruction,
    BaseDropdown,
    KeyActors,
    BaseBarChart,
    DegreeImpactDoughnutChart,
    InlineSvg
  },

}
</script>

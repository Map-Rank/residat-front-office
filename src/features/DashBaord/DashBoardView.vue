<template>
  <div class="bg-primary-light px-100">
    <div class="w-full  justify-between grid-cols-1 sm:grid md:grid-cols-8 gap-2">
      <div class="col-span-6"></div>
      <div class="h-2/3 col-span-2 pt-8">
        <div class="mb-6">
          <BaseDropdown :options="hazard" />
        </div>

        <key-actors :sectionTitle="'KEY ACTORS'" :actors="actors" />
      </div>
    </div>

    <div class="h-full grid grid-cols-3 py-10 space-x-3">
      <div class="col-span-1">
        <DegreeImpactDoughnutChart 
        label="Degree of Impact"
        canvasId="impactChart" :percentage="10"></DegreeImpactDoughnutChart>
      </div>
      <div class="col-span-1">
        <BaseBarChart
          :canvas-id="'climateVulnerabilityIndex'"
          :data="climateVulnerabilityIndex"
          label="Climate Vulnerability Index"
          :barThickness="60"
          >
        </BaseBarChart>
      </div>
      <div class="col-span-1">
        <BaseBarChart
        :canvas-id="'climateRiskThreats'"
        :data="climateRiskThreats"
        label="Climate Risk Threats"
        :isHorizontal="true"
        :barSpacing="30"
        >
        </BaseBarChart>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue'
// import SectionTitle from '@/components/base/SectionTitle.vue'
import KeyActors from '@/components/common/KeyActors/KeyActor.vue'
import BaseBarChart from '../../components/base/Charts/BaseBarChart.vue'
import DegreeImpactDoughnutChart from '@/components/base/Charts/DegreeImpactDoughnutChart.vue'

export default {
  name: 'DashBoardView',
  mounted() {
   
  },
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
      ]
    }
  },
  components: {
    // UnderConstruction,
    BaseDropdown,
    KeyActors,
    BaseBarChart,
    DegreeImpactDoughnutChart,
  },
  methods: {

  }
}
</script>

<script>
import { Chart } from 'chart.js'

export default {
  name: 'resourceCompetition',
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs.canvas, {
      type: 'bar',
      data: {
        labels: [
          'Farmer-Grazer conflicts',
          'Water conflicts',
          'Human-Wildlife conflicts',
          'Land conflicts'
        ],
        datasets: [
          {
            label: 'Current',
            data: [10, 6, 4, 2],
            backgroundColor: 'rgb(54, 162, 235)'
          },
          {
            label: 'Project',
            data: [35, 29, 21, 16],
            backgroundColor: 'rgb(208,47,47)'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    })
  }
}
</script>

<template>
  <div class="w-full mx-auto border-2 border-gray-500 rounded p-2">
    <canvas ref="canvas" />
    <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>
    <a href="#">
      <p class="text-center underline text-blue-700">
        additional data
      </p>
    </a>
  </div>
</template>

<style scoped>

</style>
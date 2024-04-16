<script>
import { Chart } from 'chart.js';

export default {
  name: 'migrationVulnerability',
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = new Chart(this.$refs.canvas, {
      type: 'bar',
      data: {
        labels: ['Urban-to-Rural', 'Rural-to-Urban'],
        datasets: [
          {
            label: 'Adults(>35)',
            data: [1, 4],
            backgroundColor: 'rgb(31,63,110)',
          },
          {
            label: 'Youth(14-35)',
            data: [1,10],
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'Children(0-13)',
            data: [4, 2],
            backgroundColor: 'rgb(208,47,47)',
          }
        ]
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  },
}
</script>

<template>
  <div class="w-1/2 mx-auto border-2 border-gray-500 rounded p-2">
    <canvas ref="canvas"/>
    <input class="w-full border-gray-900 h-16 p-2 rounded-md" type="text" placeholder="Your text here">
    <a href="#">
      <p class="text-center underline text-blue-700">
        additional data
      </p>
    </a>
  </div>
</template>

<style scoped>

</style>
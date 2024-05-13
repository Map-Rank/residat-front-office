<script>
import { Chart } from 'chart.js';

export default {
  name: 'waterStress',
  data() {
    return {
      chart: null,
      chart1: null,
    };
  },
  mounted() {
    this.chart1 = new Chart(this.$refs.canvas1, {
      type: 'pie',
      data: {
        labels: [
          'Low water stress',
          'High water stressed',
          'Sever water stress'
        ],
        datasets: [{
          label: 'Current level',
          data: [15, 30, 55],
          backgroundColor: [
            'rgb(98,192,213)',
            'rgb(50,116,161)',
            'rgb(232,212,72)'
          ],
          hoverOffset: 4
        }]
      },
    });

    this.chart = new Chart(this.$refs.canvas, {
      type: 'pie',
      data: {
        labels: [
          'Low water stress',
          'High water stressed',
          'Sever water stress'
        ],
        datasets: [{
          label: 'Crisis level',
          data: [8.2, 10, 81.8],
          backgroundColor: [
            'rgb(98,192,213)',
            'rgb(50,116,161)',
            'rgb(232,212,72)'
          ],
          hoverOffset: 4
        }]
      },
    });
  },
}
</script>

<template>
  <div class="w-full mx-auto border-2 border-gray-500 rounded p-2">
    <p class="text-center"><b>Current level</b></p>
    <div class="h-1/2 border-2 border-gray-500 rounded p-2">
      <canvas ref="canvas1"></canvas>
    </div>
    <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>

    <p class="mt-5 text-center"><b>Crisis level</b></p>
    <div class="h-1/2 border-2 border-gray-500 rounded p-2">
      <canvas ref="canvas"></canvas>
    </div>
    <label class="w-full h-16 p-2 rounded-md" type="text">Data coming here</label>

    <a href="#">
      <p class="text-center mt-3 underline text-blue-700">
        additional data
      </p>
    </a>
  </div>
</template>

<style scoped>

</style>
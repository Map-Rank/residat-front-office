<script>
import { Chart } from 'chart.js';

export default {
  name: 'foodSecurity',
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
          'Food secure households',
          'Low food secure households',
          'Highly food insecure households'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [9, 11, 80],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(18,63,143)'
          ],
          hoverOffset: 4
        }]
      },
    });

    this.chart = new Chart(this.$refs.canvas, {
      type: 'pie',
      data: {
        labels: [
          'Food Secure households',
          'Highly food insecure households',
          'Low food secure households'
        ],
        datasets: [{
          label: 'Current level',
          data: [40, 50, 20],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(18,63,143)'
          ],
          hoverOffset: 4
        }]
      },
    });
  },
}
</script>

<template>
  <div class="w-1/2 mx-auto border-2 border-gray-500 rounded p-2">
    <p class="text-center"><b>Current level</b></p>
    <div class="h-1/2 border-2 border-gray-500 rounded p-2">
      <canvas ref="canvas"></canvas>
    </div>
    <p class="mt-5 text-center"><b>Crisis level</b></p>
    <div class="h-1/2 border-2 border-gray-500 rounded p-2">
      <canvas ref="canvas1"></canvas>
    </div>
    <a href="#">
      <p class="text-center mt-3 underline text-blue-700">
        additional data
      </p>
    </a>
  </div>
</template>

<style scoped>

</style>
<template>
  <div class="w-full p-5 bg-white rounded-lg">
    <canvas  :id="canvasId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'DegreeImpactDoughnutChart',
  props: {
    canvasId: {
      type: String,
      required: true
    },
    percentages: {
      type: Array,
      required: true,
      validator: function (value) {
        // This validator function ensures that the percentages array has exactly four elements.
        return value.length === 4
      }
    }
  },
  mounted() {
    this.renderDoughnutChart()
  },
  methods: {
    renderDoughnutChart() {
      const chartData = {
        labels: ['Mild', 'Strong', 'Severe', 'Very Severe'],
        datasets: [
          {
            data: [...this.percentages, 100 - this.percentages.reduce((a, b) => a + b, 0)],
            backgroundColor: [
              '#41B9D4', // Mild
              '#7AA64E', // Strong
              '#FFD700', // Severe
              '#DD0303', // Very Severe
              'rgba(211, 211, 211, 0.5)' // Grey for the rest of the doughnut
            ],
            hoverBackgroundColor: [
              '#41B9D4',
              '#7AA64E',
              '#FFD700',
              '#DD0303',
              'rgba(211, 211, 211, 0.5)'
            ]
          }
        ]
      }

      const chartOptions = {
        cutout: '60%',
        rotation: Math.PI,
        // circumference: Math.PI,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'left',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: 'Roboto', // Set the font family
                size: 18, // Set the font size
                color: 'black' // Set the font color
              },
              boxWidth: 20 // Adjust the size of the colored box in the legend
            }
          }
        }
      }

      new Chart(this.canvasId, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions
      })
    }
  }
}
</script>

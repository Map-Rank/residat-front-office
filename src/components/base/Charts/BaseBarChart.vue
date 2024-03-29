// BarChartComponent.vue
<template>
  <div class="flex flex-col space-y-4 items-center justify-center ">
    <div
      class="w-full h-[300px] p-5 flex align-middle justify-center items-center bg-white rounded-lg"
    >
      <canvas :id="canvasId"></canvas>
    </div>

    <span class="barTitle"> {{label}}</span>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'BaseBarChart',
  props: {
    canvasId: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: 'Data Set'
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    barThickness: {
      type: Number,
      default: undefined // If not provided, Chart.js will determine the thickness automatically
    },
    color: {
      type: String,
      default: '#41B9D4'
    },
    labelAlignment: {
      type: String,
      default: 'center' // Can be 'start', 'center', or 'end'
    },
    barSpacing: {
      type: Number,
      default: 0 // Provide a default value for bar spacing
    }
  },
  mounted() {
    this.renderChart(this.canvasId, this.data, this.label, this.chartOptions)
  },
  methods: {
    renderChart(canvasId, data, label, chartOptions) {
      const chartData = {
        labels: data.map((row) => row.name),
        datasets: [
          {
            label: label,
            data: data.map((row) => row.percentage),
            backgroundColor: this.color,
            barThickness: this.barThickness
          }
        ]
      }

      const options = {
        ...chartOptions,
        indexAxis: this.isHorizontal ? 'y' : 'x',
        scales: {
          x: {
            ticks: {
              align: this.labelAlignment
            },
            ...(this.isHorizontal && { grid: { display: false } }) // Hide grid lines for horizontal chart
          },
          y: {
            ticks: {
              align: this.labelAlignment
            },
            ...(!this.isHorizontal && { grid: { display: false } }) // Hide grid lines for vertical chart
          }
        }
      }

      // if (this.isHorizontal && this.barSpacing !== undefined) {
      options.scales.x.barPercentage = 0.8 // Adjust the width of the bars
      options.scales.x.categoryPercentage = 1 - this.barSpacing / 100 // Adjust the space between the bars
      // }

      new Chart(document.getElementById(canvasId), {
        type: 'bar',
        data: chartData,
        options: options
      })
    }
  }
}
</script>

<style scoped>
.barTitle {
  color: #000;

  /* Desktop/H4-Bold */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

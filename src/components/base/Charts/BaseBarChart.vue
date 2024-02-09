// BarChartComponent.vue
<template>
  <div class="w-full h-full p-5 bg-white rounded-lg">
    <canvas :id="canvasId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

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
      default: undefined  // If not provided, Chart.js will determine the thickness automatically
    },
    color: {
      type: String,
      default: '#41B9D4'
    },
    labelAlignment: {
      type: String,
      default: 'center'  // Can be 'start', 'center', or 'end'
    }
  },
  mounted() {
    this.renderChart(this.canvasId, this.data, this.label, this.chartOptions);
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
      };

      const options = {
        ...chartOptions,
        indexAxis: this.isHorizontal ? 'y' : 'x',
        scales: {
          x: {
            ticks: {
              align: this.labelAlignment
            },
            ...(this.isHorizontal && { grid: { display: false } })  // Hide grid lines for horizontal chart
          },
          y: {
            ticks: {
              align: this.labelAlignment
            },
            ...(!this.isHorizontal && { grid: { display: false } })  // Hide grid lines for vertical chart
          }
        }
      };

      new Chart(document.getElementById(canvasId), {
        type: 'bar',
        data: chartData,
        options: options
      });
    }
  }
}
</script>

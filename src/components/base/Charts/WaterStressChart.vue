<template>
  <div class="w-1/2 h-[500px] p-3 flex align-middle justify-center items-center bg-white rounded-lg">
    <canvas ref="waterStressChart"></canvas>
  </div>
</template>

<script>
import { Chart,  } from 'chart.js'
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-annotation';

export default {
  name: 'WaterStressChart',
  data(){
return{
    chartData: [
      { Date: new Date('2024-03-01'), WaterStressLevel: 20 },
      { Date: new Date('2024-03-02'), WaterStressLevel: 35 },
      { Date: new Date('2024-03-03'), WaterStressLevel: 50 },
      { Date: new Date('2024-03-04'), WaterStressLevel: 75 },
      { Date: new Date('2024-03-05'), WaterStressLevel: 65 },
      { Date: new Date('2024-03-06'), WaterStressLevel: 40 },
      { Date: new Date('2024-03-07'), WaterStressLevel: 25 },
      // Add more data points as needed
    ]
  }
},
  props: {
    data: Array // Assuming data is passed as an array of { x: time, y: stressLevel }
  },
  mounted() {
    Chart.register(ChartDataLabels);
    this.renderChart()
  
  },

  methods:{
    renderChart() {
        const options = {
      scales: {
        y: {
          beginAtZero: false,
          max: 100,
          min: 0,
          title: {
            display: true,
            text: 'Percentage'
          }
        },
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          title: {
            display: true,
            text: 'Time'
          }
        }
      },
      plugins: {
  annotation: {
    annotations: {
      box0to10: {
        type: 'box',
        yMin: 0,
        yMax: 10,
        backgroundColor: 'rgba(156, 199, 250, 0.5)',
        borderColor: 'rgba(156, 199, 250, 1)',
        borderWidth: 1,
        label: {
          content: 'Very Low',
          display: true,
          position: 'center',
          fontStyle: 'bold',
          font: {
            size: 14,
            family: 'Helvetica, Arial, sans-serif'
          }
        }
      },
      box10to25: {
        type: 'box',
        yMin: 10,
        yMax: 25,
        backgroundColor: 'rgba(100, 181, 246, 0.8)',
        borderColor: 'rgba(100, 181, 246, 1)',
        borderWidth: 1,
        label: {
          content: 'Low',
          display: true,
          position: 'center',
          fontStyle: 'bold',
          font: {
            size: 14,
            family: 'Helvetica, Arial, sans-serif'
          }
        }
      },
      box25to50: {
        type: 'box',
        yMin: 25,
        yMax: 50,
        backgroundColor: 'rgba(66, 165, 245, 0.8)',
        borderColor: 'rgba(66, 165, 245, 1)',
        borderWidth: 1,
        label: {
          content: 'Moderate',
          display: true,
          position: 'center',
          fontStyle: 'bold',
          font: {
            size: 14,
            family: 'Helvetica, Arial, sans-serif'
          }
        }
      },
      box50to75: {
        type: 'box',
        yMin: 50,
        yMax: 75,
        backgroundColor: 'rgba(33, 150, 243, 0.8)',
        borderColor: 'rgba(33, 150, 243, 1)',
        borderWidth: 1,
        label: {
          content: 'High',
          display: true,
          position: 'center',
          fontStyle: 'bold',
          font: {
            size: 14,
            family: 'Helvetica, Arial, sans-serif'
          }
        }
      },
      box75to100: {
        type: 'box',
        yMin: 75,
        yMax: 100,
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 1,
        label: {
          content: 'Very High',
          display: true,
          position: 'center',
          fontStyle: 'bold',
          font: {
            size: 14,
            family: 'Helvetica, Arial, sans-serif'
          }
        }
      }
    }
  }
}

    }

    const data = {
        labels: this.chartData.map(d => d.Date),
        datasets: [{
          label: 'Water Stress Level',
          data: this.chartData.map(d => ({ x: d.Date, y: d.WaterStressLevel })),
          fill: false,
          borderColor: '#FF0000',
          tension: 0.7
        }]
      }
    

new Chart(this.$refs.waterStressChart, {
  type: 'line',
  data: data,
  options: options
});
    }
  }
}
</script>

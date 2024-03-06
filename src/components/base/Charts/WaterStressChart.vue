<template>
  <div class="w-1/2 h-[500px] p-3 flex align-middle justify-center items-center bg-white rounded-lg">
    <canvas ref="waterStressChart"></canvas>
  </div>
</template>

<script>
import { Chart,  } from 'chart.js'
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-annotation';

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
            tooMuchWater: {
              type: 'line',
              yMin: 75,
              yMax: 100,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                content: 'Too much water',
                enabled: true,
                position: 'end'
              }
            },
            tooLittleWater: {
              type: 'line',
              yMin: 0,
              yMax: 50,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                content: 'Too little water',
                enabled: true,
                position: 'start'
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
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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

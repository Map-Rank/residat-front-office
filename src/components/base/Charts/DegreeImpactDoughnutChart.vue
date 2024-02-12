<template>

    <div class="flex flex-col space-y-4 items-center justify-center ">
        <div class="w-full h-[300px] p-5 flex align-middle justify-center items-center bg-white rounded-lg">
            <canvas :id="canvasId"></canvas>
          </div>
    
        <span class="barTitle"> {{label}}</span>
      </div>
 
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'DegreeImpactDoughnutChart',
  data() {
    return {
      mildPercentage: 0,
      strongPercentage: 0,
      severePercentage: 0,
      verySeverePercentage: 0
    }
  },
  props: {
    canvasId: {
      type: String,
      required: true
    },
    label:String,
    percentage: {
      type: Number,
      required: true,
      validator: function (value) {
        // The percentage must be between 0 and 100.
        return value >= 0 && value <= 100
      }
    }
  },
  computed: {
      
      
},

mounted() {
    this.setLabelPercentage()
    this.renderDoughnutChart()
},
methods: {
      setLabelPercentage() {
        if (this.percentage <= 25) {
          this.mildPercentage = this.percentage
        } else if (this.percentage <= 50) {
            this.strongPercentage = this.percentage
        } else if (this.percentage <= 75) {
            this.severePercentage = this.percentage
        } else {
          this.verySeverePercentage = this.percentage
        }
      },
    renderDoughnutChart() {
      const chartData = {
        labels: ['Mild', 'Strong', 'Severe', 'Very Severe'],
        datasets: [
          {
            data: [
              this.mildPercentage,
              this.strongPercentage,
              this.severePercentage,
              this.verySeverePercentage,
              100 - this.percentage
            ],
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
        radius:'70%',
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
                size: 14,
                color: 'black'
              },
            //   boxWidth: 20
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

<template>

<div
  class="container  h-full max-h-[calc(93vh-10px)] px-5 pb-5 py-5 flex flex-col justify-center items-center bg-white rounded-lg overflow-y-auto"
>  
<div class=" relative top-[15px]">
<p class="text-xl font-bold">{{locality}}</p>
</div>
  <div class="w-full relative top-[60px]" style="height: 500px; ">
    <canvas ref="waterStressChart" class="w-full h-full"></canvas>
  </div>
  
  <!-- Additional content -->
  <div class="relative top-[90px]">
    <p>Additional content here...</p>
    <p>This section will scroll if the content exceeds the view height. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit aut molestias iste, quia non eius. Voluptatibus exercitationem accusantium neque deleniti placeat culpa ratione suscipit iusto eligendi aliquid! Quis, doloremque dolore! lorent
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nesciunt earum, totam eos temporibus natus amet dignissimos molestiae aliquam, nam ipsa, quas deserunt a tempora voluptate repudiandae illo dolores vitae!
    </p>
  </div>
</div>
</template>

<script>
import { Chart } from 'chart.js'
import 'chartjs-adapter-date-fns'
import 'chartjs-plugin-annotation'
import ChartDataLabels from 'chartjs-plugin-annotation'
import { format, subDays, addDays } from 'date-fns'

export default {
  name: 'WaterStressChart',
  data() {
    const today = new Date()
    return {
      today,
      chartData: this.generateChartData(today)
    }
  },
  props: {
    data: Array,
    locality: String,
  },
  mounted() {
    Chart.register(ChartDataLabels)
    this.renderChart()
  },

  methods: {
    generateChartData(today) {
      const startDate = subDays(today, 2)
      const endDate = addDays(today, 3)
      const chartData = []

      for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        chartData.push({
          Date: d,
          WaterStressLevel: this.getRandomWaterLevel() // Implement this method to get water level
        })
      }

      return chartData
    },

    getRandomWaterLevel() {
      return Math.floor(Math.random() * 101)
    },
    renderChart() {
      const todayFormatted = format(this.today, 'yyyy-MM-dd')

      const fontStyle11 = {
        display: true,
        position: 'start',
        fontStyle: 'thin',
        color:"#000",
        font: {
          size: 11,
          family: 'Roboto, Arial, sans-serif', // Light-looking font
          weight: '380', // Light font weight

        }
      }
      const fontStyleLine = {
        display: true,
        position: 'end',
        borderWidth: 0,
        backgroundColor: '#ff0000',
        color: '#fff',
        fontStyle: 'bold',
        font: {
          size: 12,
          family: 'Helvetica, Arial, sans-serif'
        }
      }

      const options = {
        responsive: true,
  maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              callback: function (value, index, values) {
          // Show only specific values
          const importantValues = [0, 30, 45, 55, 65, 80, 100];
          return importantValues.includes(value) ? "" : null;
        },            stepSize: 5, // Optional: Controls spacing
        color: '#000', // Optional: Customize tick label color
        font: {
          size: 11, // Optional: Customize tick font size
        },

      },
      grid: {
        color: '#e0e0e0', // Optional: Customize gridline color
      },
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
              line90: {
                type: 'line',
                yMin: 90,
                yMax: 90,
                borderColor: 'yellow',
                borderWidth: 0,
                label: {
                  content: 'flood risk',
                  ...fontStyleLine
                }
              },
              line10: {
                type: 'line',
                borderDash: [5, 5],
                yMin: 10,
                yMax: 10,
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 0,
                label: {
                  content: 'drought risk',
                  ...fontStyleLine
                }
              },
              todayLine: {
                type: 'line',
                xMin: todayFormatted,
                xMax: todayFormatted,
                borderColor: 'blue',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  content: 'Today',
                  enabled: true,
                  position: 'top'
                }
              },
              line50: {
                type: 'line',
                yMin: 55,
                yMax: 55,
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 2
              },
              box0to10: {
                type: 'box',
                yMin: 0,
                yMax: 30,
                backgroundColor: 'rgba(205, 133, 63, 0.5)',

                borderWidth: 0,
                label: {
                  content: 'Very Low Water',
                  ...fontStyle11
                }
              },
              box10to30: {
                type: 'box',
                yMin: 30,
                yMax: 45,
                backgroundColor: 'rgba(205, 133, 63, 0.3)',
                borderWidth: 0,
                label: {
                  content: 'Low Water',
                  ...fontStyle11
                }
              },
              // box30to50: {
              //   type: 'box',
              //   yMin: 30,
              //   yMax: 50,
              //   backgroundColor: 'rgba(205, 133, 63, 0.2)',
              //   borderWidth: 0,
              //   label: {
              //     content: 'Normal',
              //     ...fontStyle11
              //   }
              // },
              box50to70: {
                type: 'box',
                yMin: 55,
                yMax: 65,
                backgroundColor: 'rgba(66, 165, 245, 0.4)',
                borderWidth: 0,
                label: {
                  content: 'Normal (Raining season)',
                  ...fontStyle11
                }
              },
              box45to55: {
                type: 'box',
                yMin: 45,
                yMax: 55,
                backgroundColor: 'rgba(235, 183, 133, 0.15)'
,
                borderWidth: 0,
                label: {
                  content: 'Normal (dry season)',
                  ...fontStyle11
                }
              },
              box70to90: {
                type: 'box',
                yMin: 65,
                yMax: 80,
                backgroundColor: 'rgba(33, 150, 243, 0.5)',
                borderWidth: 0,
                label: {
                  content: 'High Water',
                  ...fontStyle11
                }
              },
              box90to100: {
                type: 'box',
                yMin: 80,
                yMax: 100,
                backgroundColor: 'rgba(25, 118, 210, 0.6)',

                borderWidth: 0,
                label: {
                  content: 'very height Water',
                  ...fontStyle11
                }
              }
            }
          }
        }
      }

      const data = {
        labels: this.chartData.map((d) => d.Date),
        datasets: [
          {
            label: 'Water Risk Level',
            data: this.chartData.map((d) => ({ x: d.Date, y: d.WaterStressLevel })),
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0, // Removes the circles
            pointHoverRadius: 0 // Ensures no hover effect on points
          }
        ]
      }

      new Chart(this.$refs.waterStressChart, {
        type: 'line',
        data: data,
        options: options
      })
    }
  }
}
</script>

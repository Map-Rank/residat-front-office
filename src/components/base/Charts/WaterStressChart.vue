<template>
  <div class="md:w-[500px] md:h-[300px] p-3 flex align-middle justify-center items-center bg-white rounded-lg">
   <canvas ref="waterStressChart" style="width: 100%;"></canvas>
   
  </div>
</template>

<script>
import { Chart } from 'chart.js'
import 'chartjs-adapter-date-fns'
import 'chartjs-plugin-annotation'
import ChartDataLabels from 'chartjs-plugin-annotation'
import { format, subDays, addDays } from 'date-fns';

export default {
  name: 'WaterStressChart',
  data() {
    const today = new Date();
    return {
      today,
      chartData: this.generateChartData(today),
    }
  },
  props: {
    data: Array 
  },
  mounted() {
    Chart.register(ChartDataLabels)
    this.renderChart()
  },

  methods: {

    generateChartData(today) {
      const startDate = subDays(today, 3);
      const endDate = addDays(today, 2); 
      const chartData = [];

      for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
        chartData.push({
          Date: d,
          WaterStressLevel: this.getRandomWaterLevel(), // Implement this method to get water level
        });
      }

      return chartData;
    },

    getRandomWaterLevel() {
      return Math.floor(Math.random() * 101);
    },
    renderChart() {
      const todayFormatted = format(this.today, 'yyyy-MM-dd');

      const fontStyle11 = {
  display: true,
  position: 'start',
  fontStyle: 'regular',
  font: {
    size: 11,
    family: 'Helvetica, Arial, sans-serif'
  }
};

      const options = {
        scales: {
          y: {
            beginAtZero: false,
            max: 100,
            min: 0,
            ticks: {
        display: false, // Set this to false to hide the y-axis values
      },

            title: {
              display: false,
              text: 'Percentage'
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
                  position: 'top',
                }
              },
              line90: {
                type: 'line',
                yMin: 90,
                yMax: 90,
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 3,
                label: {
                  content: 'Today',
                  enabled: true,
                  position: 'end ',
                }
              },
              line10: {
                type: 'line',
                yMin: 10,
                yMax: 10,
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 3
              },
              line50: {
                type: 'line',
                yMin: 50,
                yMax: 50,
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 3
              },
              box0to10: {
                type: 'box',
                yMin: 0,
                yMax: 10,
                backgroundColor: 'rgba(205, 133, 63, 0.5)',

                borderWidth: 0,
                label: {
                  content: 'Too little Water',
                  ...fontStyle11
                }
              },
              box10to30: {
                type: 'box',
                yMin: 10,
                yMax: 30,
                backgroundColor: 'rgba(205, 133, 63, 0.3)', 
                borderWidth: 0,
                label: {
                  content: 'Low Water',
                  ...fontStyle11
                }
              },
              box30to50: {
                type: 'box',
                yMin: 30,
                yMax: 50,
                backgroundColor: 'rgba(205, 133, 63, 0.2)',
                borderWidth: 0,
                label: {
                  content: 'Normal',
                  ...fontStyle11
                }
              },
              box50to70: {
                type: 'box',
                yMin: 50,
                yMax: 70,
                backgroundColor: 'rgba(66, 165, 245, 0.4)',
                borderWidth: 0,
                label: {
                  content: 'Normal',
                  ...fontStyle11
                }
              },
              box70to90: {
                type: 'box',
                yMin: 70,
                yMax: 90,
                backgroundColor: 'rgba(33, 150, 243, 0.5)',
                borderWidth: 0,
                label: {
                  content: 'High Water',
                  ...fontStyle11
                }
              },
              box90to100: {
                type: 'box',
                yMin: 90,
                yMax: 100,
                backgroundColor: 'rgba(25, 118, 210, 0.6)',

                borderWidth: 0,
                label: {
                  content: 'Too much Water',
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
            label: 'Water Stress Level',
            data: this.chartData.map((d) => ({ x: d.Date, y: d.WaterStressLevel })),
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth:2,
            tension: 0.7
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

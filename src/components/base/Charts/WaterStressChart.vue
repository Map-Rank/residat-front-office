<template>
  <div class="md:w-[600px] md:h-[300px] p-3 flex align-middle justify-center items-center bg-white rounded-lg">
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
      const startDate = subDays(today, 3); // 3 days before today
      const endDate = addDays(today, 2); // 3 days after today
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

      const options = {
        scales: {
          y: {
            beginAtZero: false,
            max: 100,
            min: 0,
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
                borderDash: [5, 5], // Array representing the length of dashes and gaps
                label: {
                  content: 'Today',
                  enabled: true,
                  position: 'top',
                }
              },
              line70: {
                type: 'line',
                yMin: 70,
                yMax: 70,
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 3
              },
              line30: {
                type: 'line',
                yMin: 30,
                yMax: 30,
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 3
              },
              box0to10: {
                type: 'box',
                yMin: 0,
                yMax: 10,
                backgroundColor: 'rgba(205, 133, 63, 0.1)',

                borderWidth: 0,
                label: {
                  content: 'To little Water',
                  display: true,
                  position: 'start',
                  fontStyle: 'bold',
                  font: {
                    size: 12,
                    family: 'Helvetica, Arial, sans-serif'
                  }
                }
              },
              box10to30: {
                type: 'box',
                yMin: 10,
                yMax: 30,
                backgroundColor: 'rgba(205, 133, 63, 0.2)', 
                borderWidth: 0,
                label: {
                  content: 'Low Water',
                  display: true,
                  position: 'start',
                  fontStyle: 'bold',
                  font: {
                    size: 12,
                    family: 'Helvetica, Arial, sans-serif'
                  }
                }
              },
              box30to50: {
                type: 'box',
                yMin: 30,
                yMax: 50,
                backgroundColor: 'rgba(205, 133, 63, 0.4)',
                borderWidth: 0,
                label: {
                  content: 'Normal',
                  display: true,
                  position: 'start',
                  fontStyle: 'bold',
                  font: {
                    size: 12,
                    family: 'Helvetica, Arial, sans-serif'
                  }
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
                  display: true,
                  position: 'start',
                  fontStyle: 'bold',
                  font: {
                    size: 12,
                    family: 'Helvetica, Arial, sans-serif'
                  }
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
                  display: true,
                  position: 'start',
                  fontStyle: 'bold',
                  font: {
                    size: 12,
                    family: 'Helvetica, Arial, sans-serif'
                  }
                }
              },
              box90to100: {
                type: 'box',
                yMin: 90,
                yMax: 100,
                backgroundColor: 'rgba(25, 118, 210, 0.6)',

                borderWidth: 0,
                label: {
                  content: 'To much Water',
                  display: true,
                  position: 'start',
                  fontStyle: 'bold',
                  font: {
                    size: 12,
                    family: 'Helvetica, Arial, sans-serif'
                  }
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
            borderColor: '#FF0000',
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

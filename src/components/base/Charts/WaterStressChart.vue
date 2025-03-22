<template>
  <div
    class="px-5 py-10 flex flex-col justify-center items-center bg-white rounded-lg"
  >  
    <div class="">
      <p class="text-2xl font-bold">{{locality}}</p>
    </div>
    <div class="w-full md:h-[430px] h-[300px] relative top-[20px]">
      <canvas ref="waterStressChart" style="box-sizing: border-box;display: block;width: 312px;" class="md:h-[400px] w-full h-[100px]"></canvas>
    </div>

    <!-- Additional content -->
    <div class="mt-10 pb-10 fex flex-col justify-center gap-2">
      <p class="text-[1rem] font-semibold">Current Water Level: <span class="text-[1rem]">{{ currentWaterLevel }}</span></p>
      <p class="text-[1rem] font-semibold mt-5">Projection: <span class="text-[1.1rem]"></span></p>
      <p class="text-[1rem] font-semibold mt-5">Description: <span class="text-[0.9rem]">{{descriptionWaterLevel}}</span> <span class="text-[1.1rem]"></span></p>
      
      <div class="mt-8">
        <p class=""> For more information click here<span> <button @click="navigateToSimulation" class="bg-secondary-normal ml-8 text-[1rem] px-4 py-2 rounded text-white font-bold text-center">similulation</button></span></p> 
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js'
import 'chartjs-adapter-date-fns'
import 'chartjs-plugin-annotation'
import ChartDataLabels from 'chartjs-plugin-annotation'
import { format, parseISO } from 'date-fns'
import { descriptionWaterLevel } from '../../../constants/descriptionWaterLevel'

export default {
  name: 'WaterStressChart',
  data() {
    return {
      today: new Date(),
      chartInstance: null,
      loading: true,
      error: null
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    locality: {
      type: String,
      required: true
    },
  },
  mounted() {
    Chart.register(ChartDataLabels)
    this.renderChart()
  },
  computed: {
    chartData() {
      // Utiliser les données reçues en props directement
      return this.data || [];
    },
    currentWaterLevel() {
      if (!this.chartData.length) return "No Data";
      
      // Get today's data (should be the first item in the array)
      const todayData = this.chartData[0];
      
      if (!todayData) return "No Data";
      
      const level = todayData.waterLevelIndex;
      if (level >= 0 && level < 30) return "Very Low Water";
      if (level >= 30 && level < 45) return "Low Water";
      if (level >= 45 && level < 55) return "Normal (Dry Season)";
      if (level >= 55 && level < 65) return "Normal (Raining Season)";
      if (level >= 65 && level < 80) return "High Water";
      if (level >= 80) return "Very High Water";
      
      return "Unknown Level";
    },
    descriptionWaterLevel() {
      // Fix the key to match the constants file
      const key = this.currentWaterLevel === "Normal (Dry Season)" ? "Normal Water Level (Dry Season)" :
                 this.currentWaterLevel === "Normal (Raining Season)" ? "Normal Water level (Rainy Season)" :
                 this.currentWaterLevel;
      
      return descriptionWaterLevel[key]?.description || "No description available";
    }
  },
  methods: {
    navigateToSimulation() {
      this.$router.push({
        name: 'simulation',
      });
    },
    
    getTimeUnit() {
      return "day"; // We're showing 5 days of data, so day is appropriate
    },
    
    renderChart() {
      if (!this.chartData.length) return;
      
      const todayFormatted = format(this.today, 'yyyy-MM-dd');
      
      const fontStyle11 = {
        display: true,
        position: 'start',
        fontStyle: 'thin',
        color: "#000",
        font: {
          size: 11,
          family: 'Roboto, Arial, sans-serif',
          weight: '380',
        }
      };
      
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
      };
      
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
                const importantValues = [0, 30, 45, 55, 65, 80, 100];
                return importantValues.includes(value) ? "" : null;
              },
              stepSize: 5,
              color: '#000',
              font: {
                size: 11,
              },
            },
            grid: {
              color: '#e0e0e0',
            },
          },
          x: {
            type: 'time',
            time: {
              unit: this.getTimeUnit(),
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
                  content: 'Very Low',
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
                  content: 'Low ',
                  ...fontStyle11
                }
              },
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
                backgroundColor: 'rgba(235, 183, 133, 0.15)',
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
                  content: 'High ',
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
                  content: 'very high',
                  ...fontStyle11
                }
              }
            }
          }
        }
      };
      
      const data = {
        labels: this.chartData.map(d => parseISO(d.date)),
        datasets: [
          {
            label: 'Water Risk Level',
            data: this.chartData.map(d => ({ 
              x: parseISO(d.date), 
              y: d.waterLevelIndex 
            })),
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0
          }
        ]
      };
      
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      
      this.chartInstance = new Chart(this.$refs.waterStressChart, {
        type: "line",
        data,
        options,
      });
    }
  },
  watch: {
    data: {
      handler: 'renderChart',
      deep: true
    }
  }
}
</script>
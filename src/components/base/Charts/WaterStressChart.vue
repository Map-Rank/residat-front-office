<template>

<div
  class=" px-5  py-10 flex flex-col justify-center items-center bg-white rounded-lg "
  
  >  
<div class=" ">
<p class="text-2xl font-bold">{{locality}}</p>
</div>
  <div class="w-full md:h-[430px] h-[300px] relative top-[20px]" >
    <canvas ref="waterStressChart" style="box-sizing: border-box;display: block;width: 312px;" class="md:h-[400px] w-full h-[100px]"></canvas>
  </div>
   <!-- Time Range Checkboxes -->
   <div class=" flex flex-row text-center justify-items-center gap-5 mt-10">
      <label
      class="text-center"
      >
        <input
        class="w-[25px] h-[25px] font-normal"
          type="checkbox"
          value="1week"
          v-model="selectedRange"
          @change="updateChart"
        />
Current      </label>
      <label>
        <input
        class="w-[25px] h-[25px]"

          type="checkbox"
          value="1month"
          v-model="selectedRange"
          @change="updateChart"
        />
        1 Month Ago
      </label>
      <label class="">
        <input
        class="w-[25px] h-[25px]"

          type="checkbox"
          value="1year"
          v-model="selectedRange"
          @change="updateChart"
        />
        1 Year Ago
      </label>
      <label>
        <input
        class="w-[25px] h-[25px]"

          type="checkbox"
          value="5years"
          v-model="selectedRange"
          @change="updateChart"
        />
        5 Years Ago
      </label>
    </div>

  <!-- Additional content -->
  <div class="mt-10 pb-10 fex flex-col justify-center gap-2 ">
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
import { format, subDays, addDays } from 'date-fns'
import { descriptionWaterLevel } from '../../../constants/descriptionWaterLevel'
import { fetchWaterStressData } from '../../../services/graphInfo'

export default {
  name: 'WaterStressChart',
  data() {
    const today = new Date()
    
    return {
      today,
      selectedRange: ["default"], // Default time range
      chartInstance: null,
      chartData: this.generateChartData(today, "default"),
      floodRiskData: [],
      droughtRiskData: []
    }
  },
  props: {
    data: Array,
    locality: String,
  },
  mounted() {
    Chart.register(ChartDataLabels)
    this.fetchData()
  },
  computed:{
    currentWaterLevel() {
      const todayFormatted = format(this.today, 'yyyy-MM-dd');
      const todayData = this.chartData.find(
        (d) => format(d.Date, 'yyyy-MM-dd') === todayFormatted
      );

      if (!todayData) return "No Data";

      const level = todayData.WaterStressLevel;
      if (level >= 0 && level < 30) return "Very Low Water";
      if (level >= 30 && level < 45) return "Low Water";
      if (level >= 45 && level < 55) return "Normal (Dry Season)";
      if (level >= 55 && level < 65) return "Normal (Raining Season)";
      if (level >= 65 && level < 80) return "High Water";
      if (level >= 80) return "Very High Water";

      return "Unknown Level";
    },
    descriptionWaterLevel(){
      return descriptionWaterLevel[this.currentWaterLevel].description
    }
  },
  methods: {
    async fetchData() {
      try {
        // const data = await fetchWaterStressData(this.locality);
        // this.floodRiskData = data.floodRisk;
        // this.droughtRiskData = data.droughtRisk;
        this.chartData = this.generateChartData(this.today, "1month");
        this.renderChart();
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },
    navigateToSimulation() {
      this.$router.push({
        name: 'simulation',
      });
    },
    generateChartData(today, range) {
      let startDate;
      let endDate;

      switch (range) {
        case "1week":
          startDate = subDays(today, 7);
          break;
        case "1month":
          startDate = subDays(today, 30);
          break;
        case "1year":
          startDate = subDays(today, 365);
          break;
        case "5years":
          startDate = subDays(today, 365 * 5);
          break;
        default:
          startDate = subDays(today, 2); // Default range from your existing code
          endDate = addDays(today, 3);
      }
      const chartData = [];
      for (let d = startDate; d <= today; d = subDays(d, -1)) {
        chartData.push({
          Date: d,
          WaterStressLevel: this.getRandomWaterLevel(),
        });
      }
      if (endDate > today) {
        for (let d = addDays(today, 1); d <= endDate; d = addDays(d, 1)) {
          chartData.push({
            Date: d,
            WaterStressLevel: this.getRandomWaterLevel(), // You can adjust this for future data
          });
        }
      }
      return chartData;
    },
    getRandomWaterLevel() {
      return Math.floor(Math.random() * 101);
    },
    getTimeUnit() {
      const lastSelectedRange = this.selectedRange.slice(-1)[0]; // Get the last selected range
      switch (lastSelectedRange) {
        case "1year":
          return "month"; // Display intervals of 1 month
        case "5years":
          return "year"; // Display intervals of 1 year
        default:
          return "day"; // Default interval for shorter ranges
      }
    },
    calculateCurrentWaterLevel() {
      const today = format(this.today, 'yyyy-MM-dd');
      const todayData = this.chartData.find((d) => format(d.Date, 'yyyy-MM-dd') === today);
      
      if (!todayData) return null;

      const level = todayData.WaterStressLevel;

      if (level >= 0 && level < 30) return "Very Low Water";
      if (level >= 30 && level < 45) return "Low Water";
      if (level >= 45 && level < 55) return "Normal (dry season)";
      if (level >= 55 && level < 65) return "Normal (Raining season)";
      if (level >= 65 && level < 80) return "High Water";
      if (level >= 80) return "Very High Water";
      
      return "Unknown";
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
              unit: this.getTimeUnit(), // Dynamically determine the interval
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
          },
          {
            label: 'Niveau de risque d\'inondation',
            data: this.floodRiskData.map((d) => ({ x: d[0], y: d[1] })),
            fill: false,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0
          },
          {
            label: 'Niveau de risque de sécheresse',
            data: this.droughtRiskData.map((d) => ({ x: d[0], y: d[1] })),
            fill: false,
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0
          }
        ]
      }
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new Chart(this.$refs.waterStressChart, {
        type: "line",
        data,
        options,
      });
    },
    updateChart() {
      const lastSelectedRange = this.selectedRange.slice(-1)[0]; // Get the last checked range
      this.chartData = this.generateChartData(this.today, lastSelectedRange); // Update chart data
      this.renderChart(); // Re-render the chart
    },
  },
}
</script>

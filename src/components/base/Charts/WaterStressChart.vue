<template>
  <div class="px-5 py-10 flex flex-col justify-center items-center bg-white rounded-lg">  
    <div>
      <p class="text-2xl font-bold">{{ locality }}</p>
    </div>
    <div class="w-full md:h-[430px] h-[300px] relative top-[20px]">
      <Line :data='chartData' :options='chartOptions' />
    </div>

    <!-- Additional content -->
    <div class="mt-10 pb-10 flex flex-col justify-center gap-2">
      <p class="text-[1rem] font-semibold">Current Water Level: <span class="text-[1rem]">{{ currentWaterLevel.toFixed(2) }}%</span></p>
      <p class="text-[1rem] font-semibold mt-5">Description: <span class="text-[0.9rem]">{{ descriptionWaterLevel }}</span></p>
      
      <div class="mt-8">
        <p>For more information click here
          <span>
            <button @click="navigateToSimulation" class="bg-secondary-normal ml-8 text-[1rem] px-4 py-2 rounded text-white font-bold text-center">
              Simulation
            </button>
          </span>
        </p> 
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { useRouter } from 'vue-router'
import { defineComponent, computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Plugin pour colorer le fond du graphique selon le niveau d'eau et ajouter les descriptions
const waterLevelBackgroundPlugin = {
  id: 'waterLevelBackground',
  beforeDraw: (chart) => {
    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { y } } = chart;

    // Définition des niveaux avec couleurs et descriptions
    const levelColors = [
      { max: 30, color: "#f4d3c4", description: "Very low water" },
      { max: 45, color: "#f7e3c3", description: "Low water" },
      { max: 55, color: "#ffffff", description: "Normal Dry season" },
      { max: 65, color: "#c4e2ff", description: "Normal Rainy season" },
      { max: 80, color: "#76baff", description: "High Water" },
      { max: 100, color: "#357ABD", description: "Very High Water" }
    ];

    // Dessiner les zones de couleur et ajouter les descriptions
    levelColors.forEach(({ max, color, description }, index) => {
      const minValue = index > 0 ? levelColors[index - 1].max : 0;
      const maxValue = max;
      
      // Dessiner le fond de la zone
      ctx.fillStyle = color;
      const yMaxPixel = y.getPixelForValue(maxValue);
      const yMinPixel = y.getPixelForValue(minValue);
      const rectHeight = yMinPixel - yMaxPixel;
      
      ctx.fillRect(left, yMaxPixel, right - left, rectHeight);
      
      // Ajouter le texte de description
      ctx.save();
      ctx.fillStyle = "#555555";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      const textY = yMaxPixel + rectHeight / 2;
      
      // Positionnement du texte à l'intérieur de la zone
      const padding = 10;
      ctx.fillText(description, right - padding, textY);
      ctx.restore();
    });
  }
};

ChartJS.register(waterLevelBackgroundPlugin);

export default defineComponent({
  name: 'WaterStressChart',
  components: { Line },
  props: {
    locality: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartData = computed(() => ({
      labels: props.data.map(entry => entry.date),
      datasets: [
        {
          label: `Water Level - ${props.locality}`,
          data: props.data.map(entry => entry.waterLevelIndex),
          borderColor: 'rgb(0, 102, 153)',
          backgroundColor: 'rgba(0, 102, 153, 0.2)',
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(0, 102, 153)',
          fill: false,
          tension: 0.3
        }
      ]
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        waterLevelBackground: true,
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              let description = "";
              
              if (value < 30) description = "Very low water";
              else if (value < 45) description = "Low water";
              else if (value < 55) description = "Normal Dry season";
              else if (value < 65) description = "Normal Rainy season";
              else if (value < 80) description = "High Water";
              else description = "Very High Water";
              
              return [`Level: ${value}%`, `Status: ${description}`];
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: "Niveau d'eau (%)"
          },
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    };

    const currentWaterLevel = computed(() => {
      const lastFiveDays = props.data.slice(-5);
      if (lastFiveDays.length === 0) return 0;
      const sum = lastFiveDays.reduce((acc, entry) => acc + entry.waterLevelIndex, 0);
      return sum / lastFiveDays.length;
    });

    const descriptionWaterLevel = computed(() => {
      if (currentWaterLevel.value < 30) return "Very low water";
      if (currentWaterLevel.value < 45) return "Low water";
      if (currentWaterLevel.value < 55) return "Normal Dry season";
      if (currentWaterLevel.value < 65) return "Normal Rainy season";
      if (currentWaterLevel.value < 80) return "High Water";
      return "Very High Water";
    });

    const router = useRouter();

    const navigateToSimulation = () => {
      router.push({ name: 'simulation' }).then(() => {
        window.location.reload();
      });
    };

    return { chartData, chartOptions, currentWaterLevel, descriptionWaterLevel, navigateToSimulation };
  }
});
</script>
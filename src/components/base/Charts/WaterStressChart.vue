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
    const { ctx, chartArea: { top, bottom, left, right, height }, scales: { y } } = chart;

    // Créer un dégradé avec les nouvelles couleurs
    const gradient = ctx.createLinearGradient(left, top, left, bottom);
    gradient.addColorStop(0, "#90CAF9"); // Couleur 1
    gradient.addColorStop(0.25, "#64B5F6"); // Couleur 2
    gradient.addColorStop(0.5, "#BBDEFB"); // Couleur 3
    gradient.addColorStop(0.75, "#FFE0B2"); // Couleur 4
    gradient.addColorStop(1, "#FFCC80"); // Couleur 5

    // Dessiner le fond de la zone avec le dégradé
    const yMaxPixel = y.getPixelForValue(100); // Max value
    const yMinPixel = y.getPixelForValue(0);   // Min value

    ctx.fillStyle = gradient;
    ctx.fillRect(left, yMinPixel, right - left, yMaxPixel - yMinPixel);
    
    // Ajouter le texte "Flood Risk" en haut à droite
    ctx.save();
    ctx.fillStyle = "#FF0000"; // Fond rouge
    const floodText = "Flood Risk";
    const floodMetrics = ctx.measureText(floodText);
    const floodTextWidth = floodMetrics.width + 10; // Ajout de padding
    const floodTextHeight = 20; // Hauteur approximative

    // Dessiner le rectangle de fond rouge
    ctx.fillRect(right - floodTextWidth - 10, top + 10, floodTextWidth, floodTextHeight);
    
    // Écrire le texte "Flood Risk"
    ctx.fillStyle = "#FFFFFF"; // Texte en blanc
    ctx.font = "bold 12px Arial";
    ctx.fillText(floodText, right - floodTextWidth - 5, top + 10 + (floodTextHeight / 2));

    // Ajouter le texte "Drought Risk" en bas à droite
    const droughtText = "Drought Risk";
    const droughtMetrics = ctx.measureText(droughtText);
    const droughtTextWidth = droughtMetrics.width + 10; // Ajout de padding

    // Dessiner le rectangle de fond orange
    ctx.fillStyle = "#FFA500"; // Fond orange
    ctx.fillRect(right - droughtTextWidth - 10, bottom - 30, droughtTextWidth, floodTextHeight);
    
    // Écrire le texte "Drought Risk"
    ctx.fillStyle = "#FFFFFF"; // Texte en blanc
    ctx.fillText(droughtText, right - droughtTextWidth - 5, bottom - 15);

    // Afficher les étiquettes des niveaux d'eau à l'intérieur du graphique
    const labels = [
      { value: 0, text: "Very low water" },
      { value: 30, text: "Low water" },
      { value: 55, text: "Normal Dry season" },
      { value: 65, text: "Normal Rainy season" },
      { value: 80, text: "High Water" },
      { value: 100, text: "Very High Water" }
    ];

    ctx.fillStyle = "#000000"; // Texte en noir
    ctx.font = "bold 12px Arial"; // Augmenter la taille de la police
    labels.forEach((label, index) => {
      const yPos = y.getPixelForValue(label.value);
      const margin = (label.value === 0) ? 10 : (label.value === 100) ? -10 : 5; // Marge pour Very low water et Very High Water
      ctx.fillText(label.text, left + 15, yPos - margin); // Positionner le texte légèrement à gauche
    });

    ctx.restore();
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
          borderColor: '#000000', // Ligne noire
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1.5, // Ligne plus fine
          pointRadius: 0, // Cacher les points
          pointBackgroundColor: '#000000',
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
            color: 'rgba(0, 0, 0, 0.1)',
            drawTicks: false, // Cacher les traits de graduation
            drawBorder: false, // Cacher la bordure
            lineWidth: 0 // Cacher les lignes verticales
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
            color: 'rgba(0, 0, 0, 0.1)',
            drawTicks: false,
            drawBorder: false,
            lineWidth: 0
          },
          ticks: {
            display: false
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
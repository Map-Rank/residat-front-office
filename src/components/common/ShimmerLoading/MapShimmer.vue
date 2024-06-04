<!-- src/components/MapShimmer.vue -->
<template>
    <div class="map-shimmer w-full h-full flex flex-row">
        <div>

            <!-- <div v-for="index in legendItems" :key="index" class="shimmer-legend-item mb-4">
                <div class="shimmer-circle"></div>
                <div class="shimmer-line"></div>
            </div> -->
        </div>
        <div class="shimmer-map h-full w-full flex justify-center items-center">
            <p>Loading Map...</p>
            
        </div>

        <div class="shimmer-legend">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MapShimmer',
    props: {
      legendItems: {
        type: Number,
        default: 5, // Default number of legend items
      },
    },
  };
  </script>
  
  <style scoped>
  .map-shimmer {
    display: flex;
    gap: 20px;
    border-radius: 10px;
  }
  
  .shimmer-map {
  
  
    background: linear-gradient(
      to right,
      #eeeeee 8%,
      #dddddd 18%,
      #eeeeee 33%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite linear;
    border-radius: 10px;
  }
  
  .shimmer-legend {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .shimmer-legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .shimmer-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(
      to right,
      #eeeeee 8%,
      #dddddd 18%,
      #eeeeee 33%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite linear;
  }
  
  .shimmer-line {
    width: 100px;
    height: 15px;
    background: linear-gradient(
      to right,
      #eeeeee 8%,
      #dddddd 18%,
      #eeeeee 33%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite linear;
    border-radius: 5px;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  </style>
  
<!-- src/components/DropdownShimmer.vue -->
<template>
    <div class="dropdown-shimmer" :style="{ height: componentHeight }">
      <div v-for="index in numDropdowns" :key="index" class="shimmer-dropdown">
        <div class="shimmer-label"></div>
        <div class="shimmer-line"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DropdownShimmer',
    props: {
      numDropdowns: {
        type: Number,
        default: 3, // Default number of dropdowns
      },
      componentHeight: {
        type: String,
        default: 'auto', // Default height of the component
      },
    },
  };
  </script>
  
  <style scoped>
  .dropdown-shimmer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .shimmer-dropdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .shimmer-label {
    width: 150px; /* Adjust as needed for label width */
    height: 20px; /* Adjust as needed for label height */
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
  
  .shimmer-line {
    height: 40px; /* Adjust as needed for dropdown height */
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
  
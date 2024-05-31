<!-- src/components/AvatarShimmer.vue -->
<template>
    <div class="avatar_post-shimmer mb-3 " :style="{ height: componentHeight }">
      <div v-for="index in numShimmers" :key="index" class="shimmer-card">
        <div class="shimmer-avatar"></div>
        <div class="shimmer-content">
          <div class="shimmer-line shimmer-line-title"></div>
          <div class="shimmer-line shimmer-line-text"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AvatarPostShimmer',
    props: {
      numShimmers: {
        type: Number,
        default: 3, // Default number of shimmer placeholders
      },
      componentHeight: {
        type: String,
        default: 'auto', // Default height of the component
      },
    },
  };
  </script>
  
  <style scoped>
  .avatar_post-shimmer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .shimmer-card {
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    gap: 15px;
  }
  
  .shimmer-avatar {
    width: 60px;
    height: 60px;
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
  
  .shimmer-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .shimmer-line {
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
  
  .shimmer-line-title {
    width: 70%;
  }
  
  .shimmer-line-text {
    width: 90%;
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
  
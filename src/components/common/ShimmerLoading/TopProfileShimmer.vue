<!-- src/components/ProfileShimmer.vue -->
<template>
    <div class="profile-shimmer w-full">
      <div class="shimmer-avatar"></div>
      <div class="shimmer-text shimmer-name"></div>
      <div class="shimmer-text shimmer-info"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopProfileShimmer.',
  };
  </script>
  
  <style scoped>
  .profile-shimmer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
  }
  
  .shimmer-avatar {
    width: 100px;
    height: 100px;
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
  
  .shimmer-text {
    width: 60%;
    height: 20px;
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
  
  .shimmer-name {
    width: 50%;
    height: 25px;
  }
  
  .shimmer-info {
    width: 70%;
    height: 15px;
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
  
<!-- src/components/ShimmerLoading.vue -->
<template>
    <div class="shimmer-loading">
      <div class="shimmer-post">
        <div class="shimmer-header">
          <div class="shimmer-avatar shimmer"></div>
          <div class="shimmer-lines mb-4">
            <div class="shimmer-line shimmer shimmer-line-short mb-2"></div>
            <div class="shimmer-line shimmer shimmer-line-long mb-2"></div>
          </div>
        </div>
        <div class="shimmer-image shimmer h-[350px] mb-4"></div>

        <div class="shimmer-circle-lines ">
          <div class="shimmer-circle shimmer "></div>
          <div class="shimmer-circle shimmer"></div>
          <div class="shimmer-circle shimmer "></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShimmerLoading',
  };
  </script>
  
  <style scoped>
  .shimmer-loading {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .shimmer-circle-lines {
    display: flex;
    justify-content: space-between;

  }
  
  .shimmer-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .shimmer-post {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .shimmer-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .shimmer-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .shimmer-lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .shimmer-line {
    height: 15px;
    border-radius: 5px;
  }
  
  .shimmer-line-short {
    width: 40%;
  }
  
  .shimmer-line-long {
    width: 60%;
  }
  
  .shimmer-line-full {
    width: 100%;
  }
  
  .shimmer-line-half {
    width: 50%;
  }
  
  .shimmer-image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
  }
  
  .shimmer {
    background: linear-gradient(
      to right,
      #eeeeee 8%,
      #dddddd 18%,
      #eeeeee 33%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite linear;
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
  
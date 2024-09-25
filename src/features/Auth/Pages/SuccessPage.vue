<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <!-- Loader Bar -->
        <div class="relative w-full h-2 bg-gray-300">
          <div class="absolute top-0 left-0 h-2 bg-secondary-normal" :style="{ width: loaderWidth } "></div>
        </div>
        <img src="/assets/images/AuthView/success.svg" alt="Success" class="mx-auto min-w-40 h-[150px] mt-6">
        <h1 class="text-2xl font-semibold text-secondary-normal mt-6">Submission Successful!</h1>
        <p class="text-gray-700 mt-2">Your information has been successfully submitted.</p>
        <button @click="goHome" class="mt-6 px-6 py-2 bg-primary-normal text-white rounded-lg hover:bg-primary-hover">
          Continue
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuccessPage',
    data() {
      return {
        loaderWidth: '0%',
      };
    },
    mounted() {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        this.loaderWidth = `${(count / 12) * 100}%`; 
        if (count >= 12) {
          clearInterval(interval);
          this.goHome();
        }
      }, 1000); 
    },
    methods: {
      goHome() {
        this.$router.push('/authentication'); 
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  
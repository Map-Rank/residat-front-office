<template>
    <div>
      <HeaderLanding  ></HeaderLanding>
  
      <!-- Hero Section -->
      <section class="bg-blue-900 text-white text-center py-16">
        <div class="container mx-auto px-4">
          <div class="flex justify-center mb-8">
            <img src="@/assets/image.png" alt="Hero Image" class="h-48 w-48 rounded-full object-cover" />
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-4">Empowering Communities with Actionable Climate Data for Effective Adaptation</h1>
        </div>
      </section>
    </div>
  </template>
  
  <script>
import HeaderLanding from '../../components/common/Header/HeaderLanding.vue';

  export default {
    name: 'LandingPage',
    components:{
      HeaderLanding
    }
  }
  </script>
  
  <style scoped>
  header {
    background-color: #3a7d44; /* Customize the green color as needed */
  }
  
  section {
    background-color: #123456; /* Customize the blue color as needed */
  }
  </style>
  
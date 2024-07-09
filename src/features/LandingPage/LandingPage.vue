<template>
    <div>
      <HeaderLanding  ></HeaderLanding>
  
      <section class="grid items-center text-white text-center py-16 h-auto md:h-[80vh]">
        <div class="container mx-auto px-4">
          <div class="flex justify-center items-center mb-8">
            <img src="/assets/images/LandingPage/hero-image.png" alt="Hero Image" class="object-cover" />
          </div>
          <div class="w-full text-center text-white  text-[24px] lg:text-[48px] font-bold font-['Poppins']  leading-[34px] lg:leading-[64px]">Empowering Communities with <br/>Actionable Climate Data for Effective Adaptation</div>
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
  section {
    background: linear-gradient(180deg, rgba(2, 39, 87, 0.85) 0%, #021D40 71.5%);
  }
  </style>
  
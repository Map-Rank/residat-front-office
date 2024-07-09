<template>
  <div>
    <HeaderLanding></HeaderLanding>

    <section class="grid items-center text-white text-center py-16 h-auto md:h-[80vh]">
      <div class="container mx-auto px-4">
        <div class="flex justify-center items-center mb-8">
          <img
            src="/assets/images/LandingPage/hero-image.png"
            alt="Hero Image"
            class="object-cover"
          />
        </div>
        <div
          class="w-full text-center text-white text-[24px] lg:text-[48px] font-bold font-['Poppins'] leading-[34px] lg:leading-[64px]"
        >
          Empowering Communities with <br />Actionable Climate Data for Effective Adaptation
        </div>
      </div>
    </section>

    <!-- about us -->
    <div
      class="w-full px-4 sm-[50px] md:px-[80px] lg:px-[120px] py-8 lg:py-[70px] flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-[57px]"
    >
      <div class="flex flex-col w-full lg:w-[52%] justify-start items-start gap-8 lg:gap-[30px]">
        <div
          class="self-stretch text-primary-normal text-5xl font-bold font-['Poppins'] leading-[44px]"
        >
          ABOUT US
        </div>
        <div class="w-full text-black text-lg font-normal font-['Poppins'] leading-7">
          Residat is an integrated Geospatial web service profiling climate hazards of vulnerable
          communities in Cameroon. It displays analyzed climate risks data in GIS format and
          provides climate hazard models that inform risk recommendations for community
          stakeholders. Its interactive maps serve both as dashboards for forecasting and
          visualizing updated community climate hazard models and as a data pool for community
          climate reality.
        </div>
        <div class="self-stretch h-full flex flex-col justify-start items-start gap-5">
          <div class="flex justify-start items-start gap-2.5">
            <img src="/assets/images/LandingPage/check-icon.svg" class="w-[30px] h-[30px]" />
            <div class="text-black text-lg font-normal font-['Poppins'] leading-7">
              Connect with key actors for adaptation advice
            </div>
          </div>
          <div class="flex justify-start items-start gap-2.5">
            <img src="/assets/images/LandingPage/check-icon.svg" class="w-[30px] h-[30px]" />
            <div class="text-black text-lg font-normal font-['Poppins'] leading-7">
              Monitor in real time local climate risk data
            </div>
          </div>
          <div class="self-stretch flex justify-start items-start gap-2.5">
            <img src="/assets/images/LandingPage/check-icon.svg" class="w-[30px] h-[30px]" />
            <div class="text-black text-lg font-normal font-['Poppins'] leading-7">
              Share local sightings of climate risks impact climate risk data
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-[45%] flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          class="h-auto max-h-[556px] w-full object-cover"
          src="/assets/images/LandingPage/about.png"
        />
      </div>
    </div>

    <!-- solution section  -->

    <div>
      <div
        class="w-full h-auto md:px-[60px] lg:px-[80px] py-[35px] flex-col justify-start items-center gap-[49px] inline-flex"
      >
        <div
          class="self-stretch text-center text-primary-normal text-5xl font-bold font-['Poppins'] leading-[44px]"
        >
          Solution
        </div>

        <div
          class="w-full px-5 lg:w-[90%] grid items-center md:flex justify-between md:items-start my-10"
        >
          <div class="md:w-[45%] py-5 flex-col justify-start items-start gap-[30px] inline-flex">
            <div
              class="text-black text-[30px] lg:text-[48px] font-bold font-['Poppins'] leading-[44px]"
            >
              Community Intelligence Reports
            </div>
            <div
              class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7"
            >
              A dedicated space for stakeholders to publish, manage, and interact with reports on
              climate adaptation efforts. These reports provide valuable insights into local
              initiatives and challenges.
            </div>
          </div>

          <div class="md:w-[55%] flex justify-center">
            <img class="" src="\assets\images\LandingPage\community-display.svg" />
          </div>
        </div>

        <div
          class="w-full px-5 lg:w-[90%] grid items-center md:flex justify-between md:items-start my-10"
        >
          <div class="md:w-[45%] py-5 flex-col justify-start items-start gap-[30px] inline-flex">
            <div
              class="text-black text-[30px] lg:text-[48px] font-bold font-['Poppins'] leading-[44px]"
            >
              Community Intelligence Reports
            </div>
            <div
              class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7"
            >
              A dedicated space for stakeholders to publish, manage, and interact with reports on
              climate adaptation efforts. These reports provide valuable insights into local
              initiatives and challenges.
            </div>
          </div>

          <div class="md:w-[55%] flex justify-center">
            <img class="" src="\assets\images\LandingPage\community-display.svg" />
          </div>
        </div>
      </div>
    </div>

    <!-- statistics  -->


    <div class="w-full h-auto px-4 lg:px-16 py-8 bg-sky-950 flex flex-col justify-start items-center gap-8">
        <div class="flex flex-col justify-start items-center gap-2 text-white text-center">
            <div class="text-2xl md:text-4xl font-medium font-['Poppins'] leading-snug md:leading-9">
                Improving communities better climatic change adaptation
            </div>
            <div class="max-w-lg md:max-w-2xl text-base md:text-lg font-normal font-['Poppins'] leading-normal">
                With over 3 years of constant community engagement and data collection, we the RESIDAT team succeeded to rise up with the following statistics:
            </div>
        </div>
    
        <div class="w-full flex flex-wrap justify-around items-center gap-6 lg:gap-12">
            <div class="flex flex-col justify-start items-center gap-3 text-center text-white">
                <img class="w-12 h-12" src="\assets\images\LandingPage\community.svg" />
                <div class="text-4xl font-medium font-['Poppins'] leading-9">300</div>
                <div class="text-xl font-normal font-['Poppins'] leading-normal">Field works</div>
            </div>
    
            <div class="flex flex-col justify-start items-center gap-3 text-center text-white">
                <img class="w-12 h-12" src="\assets\images\LandingPage\society.svg" />
                <div class="text-4xl font-medium font-['Poppins'] leading-9">250</div>
                <div class="text-xl font-normal font-['Poppins'] leading-normal">Communities</div>
            </div>
    
            <div class="flex flex-col justify-start items-center gap-3 text-center text-white">
                <img class="w-12 h-12" src="\assets\images\LandingPage\society.svg" />
                <div class="text-4xl font-medium font-['Poppins'] leading-9">2000</div>
                <div class="text-xl font-normal font-['Poppins'] leading-normal">User Engaged</div>
            </div>
        </div>
    </div>

 <div class="w-full h-auto py-16 bg-sky-950 flex flex-col justify-start items-center gap-10">
     
  <div class="w-full h-auto  bg-sky-950 flex flex-col justify-start items-center gap-10">
      <div class="self-stretch text-center text-white text-3xl md:text-5xl font-bold font-['Poppins'] leading-snug md:leading-[44px]">Demo</div>
      
      <!-- Container for embedding YouTube video -->
      <div class="relative w-full max-w-screen-xl aspect-video">
          <!-- Embed YouTube video -->
          <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/your-video-id" frameborder="0" allowfullscreen></iframe>
      </div>
  </div>
  


 


  </div>



  <!-- improve and join  -->
  <div
  class="w-full px-4 sm-[50px] md:px-[80px] lg:px-[120px] py-8 lg:py-[70px] flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-[57px]"
>
  <div class="flex flex-col w-full lg:w-[52%] justify-start items-start gap-8 lg:gap-[30px]">
    <div class="text-sky-950 text-[54px] font-bold font-['Poppins'] leading-[49px]">Join us to improve <br/>climate change <br/>Adaptation</div>

    <div class="w-full text-black text-lg font-normal font-['Poppins'] leading-7">
      Residat is an integrated Geospatial web service profiling climate hazards of vulnerable
      communities in Cameroon. It displays analyzed climate risks data in GIS format and
      provides climate hazard models that inform risk recommendations for community
      stakeholders. Its interactive maps serve both as dashboards for forecasting and
      visualizing updated community climate hazard models and as a data pool for community
      climate reality.
    </div>
    <div class="mt-4 flex w-3/4  space-x-2">
      <ButtonUi
        label="Register"
        colorObject="bg-primary-normal text-center w-auto"
        customCss="text-center flex justify-center px-10 py-4"
        textCss="text-center text-white"
        :isRoundedFull="true"
      ></ButtonUi>
      <ButtonUi
        label="Sign In"
        colorObject="bg-primary-normal text-center w-auto"
        customCss="text-center flex justify-center px-10 py-4"
        textCss="text-center text-white"
        :isRoundedFull="true"
      ></ButtonUi>
      
    </div>
  </div>

  <div class="w-full lg:w-[45%] flex justify-center lg:justify-end mt-6 lg:mt-0">
    <img
      class="h-auto max-h-[556px] w-full object-cover"
      src="/assets/images/LandingPage/about.png"
    />
  </div>
</div>


<!-- sponsors -->

<div class="container mx-auto px-4 pt-12 pb-10 flex flex-col justify-center items-center gap-8">
  <div class="w-full text-center text-sky-950 text-5xl font-bold font-poppins leading-tight">
    Our Trusted Partners
  </div>
  <div class="w-full flex justify-around items-center flex-wrap">
      <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      <div class="flex justify-start items-center max-w-xs h-auto p-2.5">
        <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      </div>
      <div class="flex justify-start items-center max-w-xs h-auto p-2.5">
        <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      </div>
      <div class="flex justify-start items-center max-w-xs h-auto p-2.5">
        <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      </div>
      <div class="flex justify-start items-center max-w-xs h-auto p-2.5">
        <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      </div>
      <div class="flex justify-start items-center max-w-xs h-auto p-2.5">
        <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      </div>
  
  </div>
</div>



<!-- footer 
  -->
  <div class="w-full h-[329px] px-[209px] pt-[61px] pb-4 bg-sky-950 flex-col justify-end items-center gap-[77px] inline-flex">
    <div class="self-stretch justify-between items-start inline-flex">
        <div class="w-[211px] flex-col justify-start items-start gap-1 inline-flex">
            <div class="w-[146px] h-[101px] pb-px justify-end items-center inline-flex">
                <img class="w-[150px] h-[100px]" src="\assets\images\Logos\logo-small-white.svg" />
            </div>
            <div class="w-[211px] text-white text-lg font-normal font-['Nunito Sans']">Your climate adaptation resilience solution</div>
        </div>
        <div class="w-[95px] flex-col justify-start items-start gap-7 inline-flex">
            <div class="self-stretch text-white text-lg font-semibold font-['Poppins']">Quick links</div>
            <div class="h-[88px] flex-col justify-start items-start gap-[11px] flex">
                <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">Solution</div>
                <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">About Us</div>
                <div class="w-[83px] text-white text-base font-normal font-['Nunito Sans']">Contact Us</div>
            </div>
        </div>
        <div class="w-[138px] flex-col justify-start items-start gap-[17px] inline-flex">
            <div class="self-stretch text-white text-lg font-normal font-['Poppins']">Resources</div>
            <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">Term and condition</div>
            <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">Cookies policy</div>
        </div>
        <div class="w-[111px] flex-col justify-start items-start gap-[19px] inline-flex">
            <div class="self-stretch text-white text-lg font-semibold font-['Metropolis']">Social Media</div>
            <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">Facebook</div>
            <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">Twitter</div>
            <div class="self-stretch text-white text-base font-normal font-['Nunito Sans']">Whatsapp</div>
        </div>
    </div>
    <div class="text-white text-sm font-normal font-['Nunito Sans'] leading-tight">Residat © Copyright 2024, Inc. All rights reserved</div>
</div>


  </div>
</template>

<script>
import HeaderLanding from '../../components/common/Header/HeaderLanding.vue'
import ButtonUi from '@/components/base/ButtonUi.vue';

export default {
  name: 'LandingPage',
  components: {
    HeaderLanding,
    ButtonUi
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(180deg, rgba(2, 39, 87, 0.85) 0%, #021d40 71.5%);
}
</style>

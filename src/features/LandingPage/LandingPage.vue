<template>
  <div class="overflow-hidden">
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
        Connecting communities to  <br />actionable climate and environmental data
        </div>
      </div>
    </section>

    <!-- about us -->
    <div
    id="about-us"
      class="w-full px-4 sm-[50px] md:px-[80px] lg:px-[120px] py-8 lg:py-[70px] flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-[57px]"
    >
      <div class="flex flex-col w-full lg:w-[52%] justify-start items-start gap-8 lg:gap-[30px]">
        <div class="self-stretch text-primary-normal text-5xl font-bold font-['Poppins'] leading-[44px]">
          ABOUT US
        </div>
        <div class="w-full text-black text-[16px] md:text-lg font-normal font-['Poppins'] md:leading-7">
          Residat is Africa’s premier open data web service to profile climate and environmental risks of vulnerable communities. It models and displays location-based climate risks data to inform risks recommendations and anticipatory actions for community stakeholders. This platform is enabling a growing number of communities in Cameroon to monitor and forecast climate risks and providing actionable adaption insights to build resilience across varying sectors.
        </div>
        <div class="self-stretch h-full flex flex-col justify-start items-start gap-5">
          <div v-for="(item, index) in aboutUs.listItems" :key="index" class="flex justify-start items-start gap-2.5">
            <img :src="aboutUs.icon" class="w-[30px] h-[30px]" />
            <div class="text-black text-[16px] md:text-lg font-normal font-['Poppins'] leading-7">
              {{ item.text }}
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

    <div
    id="solution"
    >
      <div class="w-full h-auto md:px-[60px] lg:px-[80px] py-[35px] flex-col justify-start items-center inline-flex">
        <div class="self-stretch text-center text-primary-normal text-5xl font-bold font-['Poppins'] leading-[44px]">
          Solution
        </div>
  
        <div
          v-for="(solution, index) in solutions"
          :key="index"
          class="w-full px-5 lg:w-[90%] grid items-center md:flex justify-between md:items-start my-10"
        >
          <div class="md:w-[45%] py-5 flex-col justify-start items-start gap-[10px] inline-flex">
            <div class="text-black text-[28px] md:text-[30px] lg:text-[48px] font-bold font-['Poppins'] sm:leading-[44px]">
              {{ solution.title }}
            </div>
            <div class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7">
              {{ solution.description }}
            </div>
          </div>
  
          <div class="md:w-[55%] flex justify-center">
            <img :src="solution.image" />
          </div>
        </div>
      </div>
    </div>

    <!-- statistics  -->


    <div 
    id="impact"
    class="w-full h-auto px-4 lg:px-16 py-8 bg-sky-950 flex flex-col justify-start items-center gap-8">
        <div class="flex flex-col justify-start items-center gap-2 text-white text-center">
            <div class="text-[24px] md:text-4xl font-bold font-['Poppins'] leading-snug md:leading-9">
              Our Impact
            </div>
            <!-- <div class="w-[80%]  lg:max-w-[60%] text-[10px]  md:text-[16px] font-normal font-['Poppins'] leading-normal">
                With over 3 years of constant community engagement and data collection, we the RESIDAT team succeeded to rise up with the following statistics:
            </div> -->
        </div>
    
        <div class="w-full flex flex-wrap justify-around items-center gap-6 lg:gap-12">
          <div 
          v-for="(item, index) in statistics" 
          :key="index" 
          class="flex flex-col justify-start items-center md:gap-3 text-center text-white"
        >
          <img :src="item.imgSrc" class="w-12 h-12" />
          <div class="text-[24px] md:text-[36px] font-medium font-['Poppins'] leading-9">{{ item.number }}</div>
          <div class="text-[16px] md:text-[20px] font-normal font-['Poppins'] leading-normal">{{ item.description }}</div>
        </div>
        </div>
    </div>

 <div class="w-full h-auto py-16 bg-sky-950 flex flex-col justify-start items-center gap-10">
     
  <div class="w-full h-auto  bg-sky-950 flex flex-col justify-start items-center gap-10">
      <div class="self-stretch text-center text-white text-3xl md:text-5xl font-bold font-['Poppins'] leading-snug md:leading-[44px]">Demo</div>
      
      <!-- Container for embedding YouTube video -->
      <div class="relative w-full w-full aspect-video">
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
    <div class="text-start text-sky-950 text-[34px] md:text-[54px] font-bold font-['Poppins'] leading-[35px] md:leading-[50px]">Join us to improve climate change adaptation </div>

    <div class="w-full text-black text-[16px] md:text-lg font-normal font-['Poppins']  md:leading-7">
      Join a growing community of users improving livelihoods and growing resilience with actionable climate risks data. 
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
  <div class="text-sky-950 text-[38px] md:text-[54px] font-bold font-['Poppins'] leading-[35px] md:leading-[50px]">They Support us</div>
  <div class="w-full flex justify-around items-center flex-wrap">
      <img class="max-w-xs h-auto" src="\assets\images\Logos\logo-small.svg" />
      <div class="flex justify-start items-center max-w-xs h-auto p-2.5">
        <img class="w-auto h-auto" src="\assets\images\Logos\logo-small.svg" />
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
<FooterLanding></FooterLanding>


  </div>
</template>

<script>
import HeaderLanding from '../../components/common/Header/HeaderLanding.vue'
import ButtonUi from '@/components/base/ButtonUi.vue';
import FooterLanding from './components/FooterLanding.vue'

export default {
  name: 'LandingPage',
  components: {
    HeaderLanding,
    ButtonUi,
    FooterLanding
  },
  data() {
    return {
      aboutUs: {
        icon: "/assets/images/LandingPage/check-icon.svg",
        listItems: [
          { text: "Share your sightings of local climate risks impacts" },
          { text: "Monitor in real time hyper local climate risks data" },
          { text: "Connect with key stakeholders for adaptation advice." }
        ]
      },
      solutions: [
        {
          title: "Community intelligence reports",
          description:
            "A dedicated space for stakeholders to publish, manage and interact with reports on climate adaptation. ",
          image: "\\assets\\images\\LandingPage\\community-display.svg",
        },
        {
          title: "Interactive geospatial dashboard",
          description:
            "Smart and interactive spatial maps (granular drone maps) profiling and forecasting climate risks (floods and droughts) in space and time. ",
          image: "\\assets\\images\\LandingPage\\community-display.svg",
        },
        {
          title: "Mass alert infrastructure",
          description:
            "Place-based alerts and early warning services to keep users upend on imminent hazard and risks scenarios. ",
          image: "\\assets\\images\\LandingPage\\community-display.svg",
        },
      ],
        
      statistics: [
        {
          imgSrc: "\\assets\\images\\LandingPage\\community.svg",
          number: 25,
          description: "Communities mapped"
        },
        {
          imgSrc: "\\assets\\images\\LandingPage\\society.svg",
          number: 10 ,
          description: "local partnerships"
        },
        {
          imgSrc: "\\assets\\images\\LandingPage\\society.svg",
          number: 50000,
          description: "People reached"
        }
      ]
    };
  }
}
</script>

<style scoped>
section {
  background: linear-gradient(180deg, rgba(2, 39, 87, 0.85) 0%, #021d40 71.5%);
}
</style>

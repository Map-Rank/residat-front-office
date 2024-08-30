<template>
  <div class="overflow-hidden">
    <HeaderLanding class="fixed top-0 w-full z-10"></HeaderLanding>
    <section class="grid items-center text-white text-center py-16 h-auto md:h-[40vh]">
      <div class="container mx-auto px-4">
        <div class="flex justify-center mb-8 max-h-full max-w-full overflow-hidden">
          <!-- <img
            src="/assets/images/LandingPage/hero-image.png"
            :alt="$t('connecting_communities')"
            class="object-contain max-h-[30vh] lg:max-h-[300px]"
          /> -->
        </div>
        <div
          class="w-full text-center text-white text-[20px] sm:text-[24px] lg:text-[38px] font-bold font-['Poppins'] lg:leading-auto"
        >
          {{ $t('connecting_communities') }}
        </div>
      </div>
    </section>

    <!-- about us -->
    <div
      id="about-us"
      class="w-full px-4 sm-[50px] md:px-[80px] lg:px-[120px] py-8 lg:py-[70px] flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-[57px]"
    >
      <div class="flex flex-col w-full lg:w-[52%] justify-start items-start gap-8 lg:gap-[30px]">
        <TitleLanding :text="$t('about_us')" class="text-start"></TitleLanding>
        <div class="w-full text-black text-[16px] md:text-lg font-normal font-['Poppins'] md:leading-7">
          {{ $t('about_us_description') }}
        </div>
     
      </div>

      <div class="w-full lg:w-[45%] flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          class="h-auto max-h-[380px] w-full object-cover"
          src="/assets/images/LandingPage/about.png"
        />
      </div>
    </div>


    <div
    class="w-full px-4 sm-[50px] md:px-[80px] lg:px-[120px] py-8 lg:pb-[50px] flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-[47px]"
  >
   
  <div>
    
    <div class="self-stretch h-full flex flex-col justify-start items-start gap-5">
      <div class="flex justify-center text-center w-full">

    <p class="text-center text-[18] md:text-[20] lg:text-xl font-semibold text-gray-800 ">
      Register as a community user
    </p>
    
      </div>
      <div v-for="(item, index) in aboutUs.listItems" :key="index" class="flex justify-start items-start gap-2.5">
        <img :src="aboutUs.icon" class="w-[30px] h-[30px]" />
        <div class="text-black text-[16px] md:text-lg font-normal font-['Poppins'] leading-7">
          {{ $t(item.text) }}
        </div>
      </div>
    </div>
  </div>

  <div class="self-stretch h-full flex flex-col justify-start items-start gap-5">

    <div class="flex justify-center text-center w-full">

      <p class="text-center text-[18] md:text-[20] lg:text-xl font-semibold text-gray-800 ">
        Register as institutional user (Goverment , NGOs, Business etc..)
      </p>
    </div>
    <div v-for="(item, index) in aboutUsInst.listItems" :key="index" class="flex justify-start items-start gap-2.5">
      <img :src="aboutUs.icon" class="w-[30px] h-[30px]" />
      <div class="text-black text-[16px] md:text-lg font-normal font-['Poppins'] leading-7">
        {{ $t(item.text) }}
      </div>
    </div>
  </div>

    
  </div>


    <!-- solution section -->
    <!-- <div id="solution" class="px-4">
      <div class="w-full h-auto md:px-[60px] lg:px-[80px] py-[35px] flex-col justify-start items-center inline-flex">
        <TitleLanding :text="$t('solution')"></TitleLanding>
        <div
          v-for="(solution, index) in solutions"
          :key="index"
          class="w-full lg:w-[90%] grid items-center md:flex justify-between md:items-start my-10"
        >
          <template v-if="index % 2 === 0">
            <div class="md:hidden md:w-[45%] py-5 flex-col justify-start items-start gap-[10px] inline-flex">
              <div class="text-black pb-3 md:pb-10 text-[28px] md:text-[30px] lg:text-[48px] font-bold font-['Poppins'] sm:leading-[44px]">
                {{ $t(solution.title) }}
              </div>
              <div class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7">
                {{ $t(solution.description) }}
              </div>
            </div>
            <div class="md:hidden md:w-[55%] flex justify-center">
              <img :src="solution.image" />
            </div>
            <div class="hidden md:block md:w-[45%] py-5 flex-col justify-start items-start gap-[10px] inline-flex">
              <div class="text-black pb-3 md:pb-10 text-[28px] md:text-[30px] lg:text-[48px] font-bold font-['Poppins'] sm:leading-[44px]">
                {{ $t(solution.title) }}
              </div>
              <div class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7">
                {{ $t(solution.description) }}
              </div>
            </div>
            <div class="hidden md:flex md:w-[55%] justify-end">
              <img :src="solution.image" />
            </div>
          </template>
          <template v-else>
            <div class="md:hidden md:w-[45%] py-5 flex-col justify-start items-start gap-[10px] inline-flex">
              <div class="text-black pb-3 md:pb-10 text-[28px] md:text-[30px] lg:text-[48px] font-bold font-['Poppins'] sm:leading-[44px]">
                {{ $t(solution.title) }}
              </div>
              <div class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7">
                {{ $t(solution.description) }}
              </div>
            </div>
            <div class="md:hidden md:w-[55%] flex justify-center">
              <img :src="solution.image" />
            </div>
            <div class="hidden md:block md:w-[55%] flex justify-end">
              <img :src="solution.image" />
            </div>
            <div class="hidden md:block md:w-[45%] py-5 flex-col justify-start items-start gap-[10px] inline-flex">
              <div class="text-black pb-3 md:pb-10 text-[28px] md:text-[30px] lg:text-[48px] font-bold font-['Poppins'] sm:leading-[44px]">
                {{ $t(solution.title) }}
              </div>
              <div class="self-stretch h-[118px] text-black text-[16px] lg:text-[18px] font-normal font-['Poppins'] leading-7">
                {{ $t(solution.description) }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div> -->

    <!-- statistics
    <div id="impact" class="w-full px-4 lg:px-16 py-8 bg-primary-normal flex flex-col justify-start items-center gap-8">
      <div class="flex flex-col justify-start items-center gap-2 text-white text-center">
        <div :class="classes" class="self-stretch text-center text-white text-[28px] md:text-[38px] font-bold font-['Poppins'] leading-[44px]">
          {{ $t('impact') }}
        </div>
      </div>
      <div class="w-full flex flex-wrap justify-center md:justify-around items-center gap-6 lg:gap-12">
        <div v-for="(item, index) in statistics" :key="index" class="flex flex-col w-full md:w-auto justify-start items-center md:gap-3 text-center text-white">
          <img :src="item.imgSrc" class="w-10 h-10 md:w-12 md:h-12" />
          <div class="text-[24px] md:text-[36px] font-medium font-['Poppins'] leading-9">{{ item.number }}</div>
          <div class="text-[14px] md:text-[20px] font-normal font-['Poppins'] leading-normal">{{ $t(item.description) }}</div>
        </div>
      </div>
    </div>

    <div class="w-full py-16 bg-white flex flex-col justify-start items-center gap-10">
      <div class="w-full bg-white flex flex-col justify-start items-center gap-10">
        <div :class="classes" class="self-stretch text-center text-primary-normal text-[28px] md:text-[38px] font-bold font-['Poppins'] leading-[44px]">
          {{ $t('demo') }}
        </div>
        <div class="relative w-full aspect-video">
          <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/your-video-id" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div> -->

    <!-- improve and join -->
    <!-- <div class="w-full px-4 sm-[50px] md:px-[80px] lg:px-[120px] py-8 lg:py-[70px] flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-[57px]">
      <div class="flex flex-col w-full lg:w-[52%] justify-start items-start gap-8 lg:gap-[30px]">
        <TitleLanding :text="$t('join_us')" class="text-start"></TitleLanding>
        <div class="w-full text-black text-[16px] md:text-lg font-normal font-['Poppins'] md:leading-7">
          {{ $t('join_us_description') }}
        </div>
        <div class="mt-4 flex w-3/4 space-x-2">
          <ButtonUi
            :label="$t('register')"
            colorObject="bg-secondary-normal text-center w-auto"
            customCss="text-center flex justify-center px-10 py-4"
            textCss="text-center text-white"
            :isRoundedFull="true"
            @clickButton="navigateTo('register')"
          ></ButtonUi>
          <ButtonUi
            :label="$t('sign_in')"
            colorObject="bg-secondary-normal text-center w-auto"
            customCss="text-center flex justify-center px-10 py-4"
            textCss="text-center text-white"
            :isRoundedFull="true"
            @clickButton="navigateTo('signIn')"
          ></ButtonUi>
        </div>
      </div>
      <div class="w-full lg:w-[45%] flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img class="h-auto max-h-[556px] w-full object-cover" src="/assets/images/LandingPage/about.png" />
      </div>
    </div> -->

    <!-- sponsors -->
    <!-- <div class="container mx-auto px-4 pt-12 pb-10 flex flex-col justify-center items-center gap-10">
      <div :class="classes" class="self-stretch text-center text-secondary-normal text-[28px] md:text-[38px] font-bold font-['Poppins'] leading-[44px]">
        {{ $t('they_support_us') }}
      </div>
      <div class="w-full flex flex-col md:flex-row gap-10 justify-center md:justify-around items-center">
        <img v-for="src in suppoterLogos" :key="src" :src="src" class="w-auto h-10 md:h-24" />
      </div>
    </div> -->

    <FooterLanding></FooterLanding>
  </div>
</template>

<script>
import ButtonUi from '@/components/base/ButtonUi.vue';
import FooterLanding from './components/FooterLanding.vue';
import HeaderLanding from '@/components/common/Header/HeaderLanding.vue';
import TitleLanding from './components/TitleLanding.vue';

export default {
  name: 'LandingPage',
  components: {
    ButtonUi,
    FooterLanding,
    HeaderLanding,
    TitleLanding,
  },
  data() {
    return {
      aboutUs: {
        icon: '/assets/images/LandingPage/check-icon.svg',
        listItems: [
          { text: 'about_us_list_1' },
          { text: 'about_us_list_2' },
          { text: 'about_us_list_3' },
        ],
      },
      aboutUsInst: {
        icon: '/assets/images/LandingPage/check-icon.svg',
        listItems: [
          { text: 'Send mass messages to users in target locations' },
          { text: 'Inform decision making with location/sector specific climate risks data' },
          { text: 'Collaborate with key stakeholders to drive adaptation impacts' },
        ],
      },
      suppoterLogos: [
        '/assets/images/LandingPage/WR logotype Red.jpg',
        '/assets/images/LandingPage/image001 (1).png',
        '/assets/images/LandingPage/Unicef venture fund.png',
      ],
      solutions: [
        {
          title: 'solution_1_title',
          description: 'solution_1_description',
          image: '\\assets\\images\\LandingPage\\community-display.svg',
        },
        {
          title: 'solution_2_title',
          description: 'solution_2_description',
          image: '\\assets\\images\\LandingPage\\dashboard-display.svg',
        },
        {
          title: 'solution_3_title',
          description: 'solution_3_description',
          image: '\\assets\\images\\LandingPage\\community-display.svg',
        },
      ],
      statistics: [
        {
          imgSrc: '\\assets\\images\\LandingPage\\community.svg',
          number: 25,
          description: 'impact_1_description',
        },
        {
          imgSrc: '\\assets\\images\\LandingPage\\society.svg',
          number: 10,
          description: 'impact_2_description',
        },
        {
          imgSrc: '\\assets\\images\\LandingPage\\society.svg',
          number: 50000,
          description: 'impact_3_description',
        },
      ],
    };
  },
  methods: {
    navigateTo(tab) {
      console.log('object' + tab);
      const newTabUrl = this.$router
        .resolve({
          name: 'authentication',
          params: { tab: tab },
        })
        .href;

      window.open(newTabUrl, '_blank');
    },
  },
};
</script>

<style scoped>
section {
  background: linear-gradient(180deg, rgba(2, 39, 87, 0.85) 0%, #021d40 71.5%);
}
</style>

<template>
  <footer class="text-white p-4">
    <div class="mx-100 flex flex-col md:flex-row justify-between items-center">
      <!-- Left Side -->
      <div class="flex flex-col md:space-y-10">
        <div class="flex flex-col items-center md:flex-row mb-4 md:mb-0">
          <app-link v-for="(link, index) in links" :key="index" :text="link" />
        </div>

        <div class="flex flex-col md:flex-row items-center">
          <div class="flex mb-4 md:mb-0">
            <social-icon v-for="(imgSrc, index) in imgSrcs" :key="index" :imgSrc="imgSrc" />
          </div>
          <!-- Copyright -->
          <div>
            <span class="text"> © {{ currentYear }} Map and Rank </span>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex flex-col md:flex-row items-center sm:mt-5">
        <img src="@\assets\images\Logos\logo-medium-white.svg" alt="" />
      </div>
    </div>
  </footer>
</template>

<script>
import AppLink from './appLink.vue'
import SocialIcon from './socialIcon.vue'

export default {
  name: 'FooterApp',
  components: { AppLink, SocialIcon },
  data() {
    return {
      links: ['Privacy', 'Terms', 'Contact', 'About'],
      imgSrcs: [
        'assets\\icons\\insta.svg',
        'assets\\icons\\linkedin.svg',
        'assets\\icons\\facebook.svg',
      ]
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
footer {
  background-color: #021d40;
}

.text {
  color: var(--white-normal, #fff);

  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
</style>

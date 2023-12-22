<template>
  <div class="grid content-center">
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="`${imageHost}${currentImg.url}`" />
        <!-- <img :src="currentImg.url" /> -->
      </div>
    </transition-group>
    <div class="flex justify-center">
      <button
        @click="prev"
        class="px-4 py-2 bg-transparent text-white font-semibold hover:text-white hover:border-transparent rounded"
      >
        &lt;
      </button>
      <button
        @click="next"
        class="px-4 py-2 bg-transparent text-white font-semibold hover:text-white hover:border-transparent rounded"
      >
        >
      </button>
    </div>
  </div>
</template>

<script>
import { URL_LINK } from '@/constants'

export default {
  name: 'ImageSlider',
  data() {
    return {
    //   images: [
    //     'https://th.bing.com/th/id/OIP.--fIfxVLQzY5x-9ew68KeQHaEo?w=327&h=180&c=7&r=0&o=5&pid=1.7',
    //     'src/assets/images/AuthView/auth-background.png',
    //     'src/assets/images/AuthView/auth-background.png',
    //     'src/assets/images/AuthView/auth-background.png'
    //   ],
      timer: null,
      imageHost: URL_LINK.imageHostLink,
      currentIndex: 0
    }
  },

  props:{
    images:Array
  },

  //   mounted: function () {
  //     this.startSlide()
  //   },

  methods: {
    // startSlide: function () {
    //   this.timer = setInterval(this.next, 5000)
    // },

    next: function () {
      this.currentIndex += 1
    },
    prev: function () {
      this.currentIndex -= 1
    }
  },

  computed: {
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length]
    }
  }
}
</script>

<style scoped>
.w {
  color: aliceblue;
}
</style>

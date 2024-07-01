<template>
  <div class="grid content-center">
    <transition-group class=" " name="fade" tag="div">
      <div 
      class=""
      v-for="i in [currentIndex]" :key="i">
        <img 
        class="w-full  max-h-[40vh] md:max-h-[50vh] object-cover"
        :src="`${currentImg.url}`" />
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
      timer: null,
      imageHost: URL_LINK.imageHostLink,
      currentIndex: 0
    }
  },

  props:{
    images:Array
  },


  methods: {

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

/* Add styles within your component's <style> tag */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

</style>

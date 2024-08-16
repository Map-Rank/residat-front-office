<template>
  <div class="grid content-center">
    <transition-group name="fade" tag="div">
      <div v-if="currentIndex >= 0 && currentIndex < images.length" :key="currentIndex">
        <img class="w-full max-h-[40vh] md:max-h-[50vh] object-cover" :src="currentImg.url" />
      </div>
    </transition-group>
    <div class="flex justify-center">
      <button
        @click="prev"
        :disabled="currentIndex <= 0"
        class="px-4 py-2 bg-transparent text-white font-semibold hover:text-white hover:border-transparent rounded"
      >
        &lt;
      </button>
      <button
        @click="next"
        :disabled="currentIndex >= images.length - 1"
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
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex += 1
      }
    },
    prev: function () {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1
      }
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
/* Add styles within your component's <style> tag */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>

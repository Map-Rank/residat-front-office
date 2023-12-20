<template>
  <div class="flex gap-0.5 overflow-hidden" v-if="images.length > 2">
    <img
      v-for="(image, index) in imagesToDisplay"
      :key="index"
      :src="getImageSrc(image)"
      :alt="image.alt"
      class="flex-grow h-auto w-4 object-cover"
      :style="{ 'flex-basis': calculateFlexBasis(index) }"
    />
    <div
      v-if="images.length > 4"
      class="flex-grow h-auto flex justify-center items-center bg-black opacity-50 cursor-pointer"
    >
      +{{ images.length - 4 }} more
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleImagesComponent',
  props: {
    images: Array,
    imageHost: String
  },
  computed: {
    imagesToDisplay() {
      return this.images.slice(1, 4) // Adjust as needed
    }
  },
  methods: {
    getImageSrc(image) {
      return this.imageHost ? `${this.imageHost}${image.url}` : image.src
    },
    calculateFlexBasis() {
      const numberOfImages = this.imagesToDisplay.length
      return `${100 / numberOfImages}%`
    }
  }
}
</script>

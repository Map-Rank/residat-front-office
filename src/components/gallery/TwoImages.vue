<template>
    <div class="flex mb-0.5" v-if="images.length === 2">
      <img v-for="(image, index) in images" :key="index" :src="getImageSrc(image)" :alt="image.alt" class="w-1/2 h-1/2" />
    </div>
  </template>
  
  <script>
  export default {
    name: "TwoImagesComponent",
    props: {
      images: Array,
      imageHost: String
    },
    methods: {
      getImageSrc(image) {
        return this.imageHost ? `${this.imageHost}${image.url}` : image.src;
      }
    }
  };
  </script>
  
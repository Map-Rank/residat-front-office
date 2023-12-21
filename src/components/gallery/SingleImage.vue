<template>
    <div class="flex mb-0.5" v-if="image">
      <img :src="getImageSrc(image)" :alt="image.alt" class="w-full h-auto object-cover" />
    </div>
  </template>
  
  <script>
  export default {
    name: "SingleImageComponent",
    props: {
      image: Object,
      imageHost: String
    },
    methods: {
      getImageSrc(image) {
        return this.imageHost ? `${this.imageHost}${image.url}` : image.src;
      }
    }
  };
  </script>
  
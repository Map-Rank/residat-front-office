<template>
    <div>
      <single-image-component v-if="Images.length === 1" :image="Images[0]" :imageHost="imageHost" />
      <two-images-component v-else-if="Images.length === 2" :images="Images" :imageHost="imageHost" />
      <multiple-images-component v-else-if="Images.length > 2" :images="Images" :imageHost="imageHost" />
        
    </div>
  </template>
  
  <script>
  import SingleImageComponent from './SingleImage.vue';
  import TwoImagesComponent from './TwoImages.vue';
  import MultipleImagesComponent from './MultipleImages.vue';
  
  export default {
    name: "ImageGallery",
    components: {
      SingleImageComponent,
      TwoImagesComponent,
      MultipleImagesComponent
    },
    props: {
      Images: Array,
      imageHost: String
    }
  };
  </script>
  
<template>
  <div class="hover:cursor-pointer" @click.prevent="handleClick" v-if="Images">
    <!-- Container for the first image -->
    <div v-if="Images.length === 1" class="flex mb-0.5 h-[350px]">
      <img
        :src="Images[0].url"
        :alt="Images[0].alt"
        class="w-full h-auto object-cover"
      />
    </div>

    <!-- Container for two images side by side -->
    <div v-if="Images.length === 2" class="flex mb-0.5 h-[350px]">
      <img :src="Images[0].url" :alt="Images[0].alt" class="w-1/2 display_img" />
      <img :src="Images[1].url" :alt="Images[1].alt" class="w-1/2 display_img" />
    </div>

    <div v-if="Images.length === 3" class="grid grid-cols-3 gap-0.5 h-[350px]">
      <img
        v-for="(image, index) in Images.slice(0, 3)"
        :src="image.url"
       :alt="image.alt"
        :key="index"
        class="h-full w-full object-cover"
      />
      <div
        v-if="Images.length > 3"
        class="flex items-center justify-center bg-black text-white opacity-75 cursor-pointer"
      >
        +{{ Images.length - 3 }} more
      </div>
    </div>

    <!-- Container for the rest of the images displayed in a single row -->
    <div v-if="Images.length > 3" class="flex gap-0.5 overflow-hidden  h-[350px]">
      <img
        v-for="(image, index) in Images.slice(1, 4)"
        :src="image.url"
       :alt="image.alt"
        :key="image.src"
        class="flex-grow h-auto w-4 object-cover"
        :style="{ 'flex-basis': calculateFlexBasis(index) }"
      />

      <!-- "See more" box if there are more images than can be shown -->
      <div
        v-if="Images.length > 4"
        class="flex-grow h-auto flex justify-center items-center bg-black opacity-50 cursor-pointer "
      >
        +{{ Images.length - 4 }} more
      </div>
    </div>
  </div>
</template>

<script>
import { URL_LINK } from '@/constants'
// import { formatHostImageUrl } from '@/utils/formating'

export default {
  name: 'ImagePostGallery',
  data() {
    return {
      imageHost: URL_LINK.imageHostLink,
      // formatHostImageUrl
    }
  },
  props: {
    Images: {
      type: Array,
      required: true
    }
  },

  methods: {
    showDetails() {
      console.log('Showing image details...')
    },

    handleClick() {
      this.$emit('customFunction')
    },
    calculateFlexBasis() {
      // Calculate the flex-basis based on the number of images
      const numberOfImages = this.Images.length - 1 // minus the first image
      const maxImagesToShow = 3
      if (numberOfImages > maxImagesToShow) {
        // If more than 3 images, each gets an equal share of space
        return `${100 / maxImagesToShow}%`
      }
      // If fewer than 3 images, they grow equally to fill the space
      return `${100 / numberOfImages}%`
    }
  }
}
</script>

<style scoped>
.display_img{
  object-fit: cover;
}
/* Add your styles here if necessary */
</style>

<template>
  <div  class="" @click.prevent="handleClick" v-if="Images">
    <!-- Container for the first image -->
    <div v-if="Images.length > 2 || Images.length === 1" class="flex mb-0.5">
      <img :src="Images[0].src" :alt="Images[0].alt" class="w-full h-auto object-cover" />
    </div>

    <!-- Container for two images side by side -->
    <div v-if="Images.length === 2" class="flex mb-0.5">
      <img :src="Images[0].src" :alt="Images[0].alt" class="w-1/2 h-1/2" />
      <img :src="Images[1].src" :alt="Images[1].alt" class="w-1/2 h-1/2" />
    </div>

    <!-- Container for the rest of the images displayed in a single row -->
    <div v-if="Images.length > 2" class="flex gap-0.5 overflow-hidden">
      <img
        v-for="(image, index) in Images.slice(1, 4)"
        :src="image.src"
        :alt="image.alt"
        :key="image.src"
        class="flex-grow h-auto w-4 object-cover"
        :style="{ 'flex-basis': calculateFlexBasis(index) }"
      />
      
      <!-- "See more" box if there are more images than can be shown -->
      <div
        v-if="Images.length > 4"
        class="flex-grow h-auto flex justify-center items-center bg-black opacity-50 cursor-pointer"
      >
        +{{ Images.length - 4 }} more
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePostGallery",
  props: {
    Images: {
      type: Array,
      required: true
    }
  },
  methods: {
    showDetails() {
      // Logic to show image details or perform any action on click
      console.log('Showing image details...');
    },

    handleClick() {
      this.$emit('customFunction')
      console.log(this.routerName)
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
};
</script>

<style scoped>
/* Add your styles here if necessary */
</style>

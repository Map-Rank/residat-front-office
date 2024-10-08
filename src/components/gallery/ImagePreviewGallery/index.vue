<template>
  <div class=" " @click.prevent="handleClick" v-if="Images">
    <!-- Container for the first image -->
    <div v-if="Images.length > 2 || Images.length === 1" class="flex mb-0.5">
      <div class="image-container">
        <button class="delete-icon" @click.stop="removeImage(index)">❌</button>
        <img :src="Images[0].src" :alt="Images[0].alt" class="w-full h-auto object-cover" />
      </div>
    </div>

    <div v-if="ImagesFromHostToPreview != null">
      <div
        v-if="ImagesFromHostToPreview.length > 2 || ImagesFromHostToPreview.length === 1"
        class="flex mb-0.5"
      >
        <div class="image-container">
          <button class="delete-icon" @click.stop="removeImage(index)">❌</button>
          <img
            :src="
              ImagesFromHostToPreview != null
                ? ImagesFromHostToPreview[0].url
                : Images[0].url
            "
            :alt="'image'"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Container for two images side by side -->
    <div v-if="Images.length === 2" class="flex mb-0.5">
      <div class="image-container w-2/5 h-1/2">
        <button class="delete-icon" @click.stop="removeImage(index)">❌</button>
        <img :src="Images[0].src" :alt="Images[0].alt" class="" />
      </div>
      <div class="image-container w-2/5 h-1/2">
        <button class="delete-icon" @click.stop="removeImage(index)">❌</button>

        <img :src="Images[1].src" :alt="Images[1].alt" class="" />
      </div>
    </div>

    <div v-if="ImagesFromHostToPreview != null">
      <div v-if="ImagesFromHostToPreview != null">
        <div v-if="ImagesFromHostToPreview.length === 2" class="flex mb-0.5">
          <div class="image-container w-2/5 h-1/2">
            <button class="delete-icon" @click.stop="removeImage(index)">❌</button>
            <img
              :src="ImagesFromHostToPreview[0].url"
              :alt="'image'"
              class=""
            />
          </div>
          <div class="image-container w-2/5 h-1/2">
            <button class="delete-icon" @click.stop="removeImage(index)">❌</button>

            <img
              :src="ImagesFromHostToPreview[1].url"
              :alt="'image'"
              class=""
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="Images.length > 2" class="flex gap-0.5 overflow-hidden">
      <img
        v-for="image in Images.slice(1, 4)"
        :src="image.src"
        :alt="image.alt"
        :key="image.src"
        class="flex-grow h-auto w-4 object-cover"
        :style="{ 'flex-basis': calculateFlexBasis() }"
      />

      <!-- "See more" box if there are more images than can be shown -->
      <div
        v-if="Images.length > 4"
        class="flex-grow h-auto flex justify-center items-center bg-black opacity-50 cursor-pointer"
      >
        +{{ Images.length - 4 }} more
      </div>
    </div>

    <div v-if="ImagesFromHostToPreview != null">
      <div v-if="ImagesFromHostToPreview.length > 2" class="flex gap-0.5 overflow-hidden">
        <img
          v-for="image in ImagesFromHostToPreview.slice(1, 4)"
          :src="image.url"
          :alt="image.alt"
          :key="image.url"
          class="flex-grow h-auto w-4 object-cover"
          :style="{ 'flex-basis': calculateFlexBasisFromHost() }"
        />

        <!-- "See more" box if there are more images than can be shown -->
        <div
          v-if="ImagesFromHostToPreview.length > 4"
          class="flex-grow h-auto flex justify-center items-center bg-black opacity-50 cursor-pointer"
        >
          +{{ ImagesFromHostToPreview.length - 4 }} more
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatHostImageUrl } from '@/utils/formating'

export default {
  name: 'ImagePreviewGallery',
  data() {
    return {
      formatHostImageUrl
    }
  },
  emits: ['removeImage'],
  props: {
    Images: {
      type: Array,
      required: true
    },
    ImagesFromHostToPreview: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    showDetails() {
      // Logic to show image details or perform any action on click
      console.log('Showing image details...')
    },

    handleClick() {
      this.$emit('customFunction')
      console.log(this.routerName)
    },
    removeImage(index) {
      // Emit an event to remove the image from the array
      this.$emit('removeImage', index)
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
    },
    calculateFlexBasisFromHost() {
      // Calculate the flex-basis based on the number of images
      const numberOfImages = this.ImagesFromHostToPreview.length - 1 // minus the first image
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
.image-container {
  position: relative;
  display: inline-block; /* or 'block' depending on layout */
  margin: 0.5rem; /* adjust as needed */
}

.delete-icon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  background-color: rgba(255, 255, 255, 0.7); /* semi-transparent white */
  border: none;
  cursor: pointer;
  z-index: 10;
}
</style>

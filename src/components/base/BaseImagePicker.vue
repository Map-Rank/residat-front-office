<template>
  <div class="flex items-center ">
    <label
      class="flex items-center px-3 md:px-4 py-2 bg-white text-green-600 rounded-full  tracking-wide  border border-green cursor-pointer  hover:text-white"
    >
      <img :src="iconImg" v-if="iconImg" alt="input icon">
      <span class="ml-2  text-sm sm:text-base leading-normal">{{ label }}</span>
      <input :type="type" class="hidden" @change="handleFileChange" :accept="accept" multiple />
    </label>
    <!-- <div v-if="selectedImages.length">
      <ul class="flex mt-2">
        <li v-for="(image, index) in selectedImages" :key="index">
          <img :src="createObjectURL(image)" alt="selected image" class="w-16 h-16 object-cover mr-2">
          <button @click="removeImage(index)">Remove</button>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'BaseImagePicker',
  props: {
    accept: {
      type: String,
      default: 'image/*,video/*',
    },
    iconImg: {
      type: String,
    },
    type: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      selectedImages: [],
    };
  },
  methods: {
    handleFileChange(event) {
      const newFiles = event.target.files;
      this.selectedImages = [...this.selectedImages, ...newFiles];
      this.$emit('handleFileChange', this.selectedImages); // Emit the updated array
    },
    removeImage(index) {
      // Create a copy of the array to avoid mutating the original
      const updatedImages = [...this.selectedImages];
      updatedImages.splice(index, 1); // Remove the image at the specified index
      this.selectedImages = updatedImages;
    },
    createObjectURL(image) {
      return URL.createObjectURL(image);
    },
  },
};
</script>


<style scoped>
span {
  font-size: 14px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.3px;
}
</style>


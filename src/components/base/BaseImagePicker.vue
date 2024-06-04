<template>
  <div class="flex items-center">
    <label
      class="flex items-center px-3 md:px-4 py-2 bg-white text-green-600 rounded-full tracking-wide border border-green cursor-pointer hover:text-white"
    >
      <img :src="iconImg" v-if="iconImg" alt="input icon" />
      <span class="ml-2 text-sm sm:text-base leading-normal">{{ label }}</span>
      <input :type="type" class="hidden" @change="handleFileChange" :accept="accept" multiple />
    </label>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  name: 'BaseImagePicker',
  data() {
    const toast = useToast()

    return {
      toast
    }
  },
  props: {
    accept: {
      type: String,
      default: 'image/*,video/*'
    },
    iconImg: {
      type: String
    },
    type: {
      type: String
    },
    label: {
      type: String
    },
    maxSize: {
      type: Number,
      default: 2000 // default max size set to 2048KB
    }
  },
  methods: {
    handleFileChange(event) {
      const files = Array.from(event.target.files)
      const isValidSize = files.every((file) => file.size <= this.maxSize * 1024) // Check if all files are of valid size

      if (files.length > 0 && isValidSize) {
        // Emit an array of selected files
        this.$emit('handleFileChange', files)
      } else {
        this.toast.error('One or more files exceed the specified max size');
        // console.error('One or more files exceed the specified max size.')
      }
    }
  }
}
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

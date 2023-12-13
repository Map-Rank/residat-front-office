<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-center mb-9">
      <h3 class="uppercase font-semibold">Share your thoughts</h3>
    </div>

    <div class="mb-4 mx-auto p-6 bg-white rounded-lg shadow">
      <div class="grid mb-5">
        <label class="inline-block mb-2">Sector</label>
        <span>Select your sector of interest</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-7 content-between">
        <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
          <base-checkbox :key="sector.name" :list="sector" @change="updateCheckedItems"></base-checkbox>
        </div>
      </div>
    </div>

    <div class="mx-auto p-6 space-y-4 bg-white rounded-lg shadow">
      <div class="flex items-center space-x-4">
        <img src="public\images\profile.png" alt="" />
        <h2 class="text-sm md:text-lg font-light text-gray-normal mb-4">
          Hello happy to share to our community
        </h2>
      </div>
      <form @submit.prevent="submitPost">
        <div class="mb-4">
          <textarea v-model="formData.content" placeholder="what will you share today ..."
            class="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-normal" rows="4"></textarea>
        </div>
        <div class="mb-4">
          <label class="block mb-2">Attach images (optional):</label>
          <div class="flex space-x-4">
            <base-image-picker :iconImg="'src\\assets\\icons\\colored\\image-icon.svg'" :type="'file'"
              :label="'Add Image'" @handleFileChange="handleImageUpload">
            </base-image-picker>

            <base-image-picker :iconImg="'src\\assets\\icons\\colored\\video-clip.svg'" :type="'file'"
              :label="'Add Video'" @handleFileChange="handleImageUpload">
            </base-image-picker>
          </div>
        </div>

        <div class="flex justify-center mt-5">
          <div class="flex w-full sm:w-1/2">
            <button type="submit" @click.prevent="submitPost" :class="this.isLoading
                ? 'bg-gray-400 cursor-wait'
                : 'bg-secondary-normal hover:bg-secondary-hover'
              " :disabled="this.isLoading" class="block w-full text-white py-1.5 rounded-full transition">
              {{ this.isLoading ? 'Creating...' : 'Create Post' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseImagePicker from '@/components/base/BaseImagePicker.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { createPost } from '../../services/postService'
import { useRouter } from 'vue-router'


export default {
  name: 'CreatePost',
  data() {
    const router = useRouter()

    return {
      router,
      isLoading: false,
      formData: {
        content: '',
        images: [],
        videos: []
      },
      sectors: [
        {
          name: 'agriculture',
          label: 'Agriculture',
          checked: false,
          value: 'Agriculture',
          required: true
        },
        {
          name: 'agriculture',
          label: 'Agriculture',
          checked: false,
          value: 'Agriculture',
          required: true
        },
        {
          name: 'education',
          label: 'Education',
          checked: false,
          value: 'Education',
          required: true
        },
        { name: 'socials', label: 'Socials', checked: false, value: 'Socials', required: true }
        // Add more sectors as needed
      ]
    }
  },
  components: {
    BaseImagePicker,
    // ButtonUi,
    BaseCheckbox
  },
  methods: {
    async submitPost() {
      // console.log('form data:', this.formData)
      this.isLoading = true;
      const response = await createPost(this.formData, this.handleSuccess, this.handleError)
      this.isLoading = false;
      if (response.status) {
        this.$router.push({ name: 'community' })
      } else {
        console.log(response.data.errors)
        this.isLoading = false;
      }
      // Clear the form
      this.content = ''
      this.images = []
    },

    handleImageUpload(files) {
      if (!files || !Array.isArray(files)) {
        console.error('No files provided or the provided data is not an array');
        return;
      }

      files.forEach((file) => {
        if (file.type.startsWith('image/')) {
          this.formData.images.push(file);
        } else if (file.type.startsWith('video/')) {
          this.formData.videos.push(file);
        }
      });
    },


    resetForm() {
      this.formData.content = ''
      this.formData.images = []
      this.formData.videos = []
      this.sectors.forEach((sector) => (sector.checked = false))
    },

    updateCheckedItems({ name, checked }) {
      if (checked) {
        this.checkedItems.push(name)
      } else {
        this.checkedItems = this.checkedItems.filter((item) => item !== name)
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>

<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-center mb-9">
      <h3 class="uppercase font-semibold">
        {{ isEditing ? 'Your Editing a post' : 'Share your thoughts' }}
      </h3>
    </div>

    <div class="mb-4 mx-auto p-6 bg-white rounded-lg shadow">
      <div class="grid mb-5">
        <label class="inline-block mb-2">Sector</label>
        <span>Select your sector of interest</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-7 content-between">
        <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
          <base-checkbox
            :key="sector.name"
            :list="sector"
            @change="updatesectorChecked"
          ></base-checkbox>
        </div>
      </div>
    </div>

    <div class="mx-auto h-3/4 p-6 space-y-4 bg-white rounded-lg shadow">
      <div class="flex items-center space-x-4">
        <img src="public\images\profile.png" alt="" />
        <h2 class="text-sm md:text-lg font-light text-gray-normal mb-4">
          Hello happy to share to our community
        </h2>
      </div>
      <vee-form class="h-3/4" :validation-schema="schema" @submit.prevent="submitPost">
        <ErrorMessage class="text-danger-normal" name="content" />
        <div class="flex mb-4 flex-col space-y-2 sm:flex-row sm:space-x-2">
          <vee-field
            name="content"
            :rules="schema.content"
            as="textarea"
            v-model="formData.content"
            placeholder="what will you share today ..."
            class="w-full rounded-lg focus:outline-none focus:ring-2"
            rows="4"
          ></vee-field>
          <div class="sm:w-1/2">
            <image-post-gallery class="" :Images="imagesToPreview"> </image-post-gallery>
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-2">Attach images (optional):</label>
          <div class="flex space-x-4">
            <base-image-picker
              :iconImg="'src\\assets\\icons\\colored\\image-icon.svg'"
              :type="'file'"
              :label="'Add Image'"
              @handleFileChange="handleImageUpload"
            >
            </base-image-picker>

            <!-- <base-image-picker
              :iconImg="'src\\assets\\icons\\colored\\video-clip.svg'"
              :type="'file'"
              :label="'Add Video'"
              @handleFileChange="handleImageUpload"
            >
            </base-image-picker> -->
          </div>
        </div>

        <div class="flex justify-center mt-5">
          <div class="flex w-full sm:w-1/2">
            <button
              type="submit"
              @click.prevent="submitPost"
              :class="
                this.isLoading
                  ? 'bg-gray-400 cursor-wait'
                  : 'bg-secondary-normal hover:bg-secondary-hover'
              "
              :disabled="this.isLoading"
              class="block w-full text-white py-1.5 rounded-full transition"
            >
              {{
                !isEditing
                  ? this.isLoading
                    ? 'Creating...'
                    : 'Create Post'
                  : this.isLoading
                    ? 'Updating Post...'
                    : 'Update Post'
              }}
            </button>
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
import BaseImagePicker from '@/components/base/BaseImagePicker.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import { createPost, updatePost } from '../../services/postService'
import { useRouter } from 'vue-router'
import useSectorStore from '@/stores/sectorStore.js'
import usePostStore from '../../store/postStore.js'
import ImagePostGallery from '@/components/common/ImagePostGallery/index.vue'

export default {
  name: 'CreatePost',
  async created() {
    const sectorStore = useSectorStore()
    const postStore = usePostStore()

    if (postStore.postToEdit) {
      this.isEditing = true
      this.formData = postStore.postToEdit
    }

    // postStore.postToEdit != null ? (this.isEditing = true) : (this.isEditing = false)

    try {
      this.sectors = sectorStore.getAllSectors
    } catch (error) {
      console.error('Failed to load sector:', error)
    }
  },

  data() {
    const router = useRouter()
    const postStore = usePostStore()

    return {
      schema: {
        content: 'required'
      },
      router,
      postStore,
      isLoading: false,
      isEditing: false,
      imagesToPreview: [],
      formData: {
        content: '',
        images: [],
        videos: [],
        sectorChecked: [],
        sectorId: []
      },
      sectors: []
    }
  },
  components: {
    BaseImagePicker,
    // ButtonUi,
    BaseCheckbox,
    ImagePostGallery
  },
  methods: {

    handleError(){

      this.isLoading = false
    },
    async submitPost() {
      if (this.formData.content == '') {
        return
      }

      let response
      this.isLoading = true

      if (this.isEditing) {
        response = await updatePost(this.formData, this.handleSuccess, this.handleError)
        console.log(response.status)
        response.status ? (this.postStore.postToEdit = null) : null
        console.log('update post complete')
        this.resetForm()
        this.$router.push({ name: 'community' })
        return
      }

      response = await createPost(this.formData, this.handleSuccess, this.handleError)

      if (response.status) {
        this.resetForm()
        this.$router.push({ name: 'community' })
      }

      if (response.data.status) {
        // console.log(response.data.errors)
      }
    },

    handleImageUpload(files) {
      if (!files || !files.length) {
        console.error('No files provided or the provided data is not an array')
        return
      }

      // Reset existing images and previews
      this.formData.images = []
      this.imagesToPreview = []

      files.forEach((file) => {
        if (file.type.startsWith('image/')) {
          this.formData.images.push(file)

          // Create a URL for the image and add it to imagesToPreview
          const imageUrl = URL.createObjectURL(file)
          this.imagesToPreview.push({ src: imageUrl, alt: file.name })
        } else if (file.type.startsWith('video/')) {
          this.formData.videos.push(file)
        }
      })
    },

    resetForm() {
      this.formData.content = ''
      this.formData.images = []
      this.formData.videos = []
      this.sectors.forEach((sector) => (sector.checked = false))
    },

    //TODO corncidered the fact that unchecked sectors should be remove an updated
    updatesectorChecked({ list, checked }) {
      if (checked) {
        this.formData.sectorChecked.push(list)
        this.formData.sectorId.push(list.id)
      } else {
        this.formData.sectorChecked = this.formData.sectorChecked.filter((item) => item !== name)
      }
    }
  }
}
</script>

<style scoped></style>

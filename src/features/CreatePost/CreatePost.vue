<template>
  <div class="container m-auto w-full lg:w-1/2 p-2 sm:p-6">
    <div class="flex justify-center mb-9">
      <h2 class="uppercase font-semibold">
        {{ isEditing ?  $t('your_editing_post') : $t('share_your_thoughts') }}
      </h2>
    </div>
   

    <div class="mx-auto mb-4 h-3/4 p-6 space-y-4 bg-white rounded-lg shadow">
      <TopContentForm :userProfileImage="userProfileImage" />
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
            <image-preview-gallery
              class=""
              :Images="imagesToFromLocalPreview"
              :ImagesFromHostToPreview="imagesFromHostToPreview"
              @removeImage="removeImage"
            >
            </image-preview-gallery>
          </div>
        </div>

        <div class="mb-4">
          <label class="block mb-2">{{ $t('attach_images_optional') }}:</label>
          <div class="flex space-x-4">
            <base-image-picker
              :iconImg="'assets\\icons\\colored\\image-icon.svg'"
              :type="'file'"
              :label="$t('add_image')"
              @handleFileChange="handleImageUpload"
            >
            </base-image-picker>
          </div>
        </div>
      </vee-form>
    </div>

    <div class="mx-auto mb-4 p-6 h-3/4 space-y-4 bg-white rounded-lg shadow">
      <PostSpecificInformation
        :sectors="sectors"
        :updatesector-checked="updateSectorChecked"
        :update-zone-id="updateZoneId"
      />
      <div class="flex justify-center mt-5">
        <div class="flex w-full sm:w-1/2">
          <button
            type="submit"
            @click.prevent="submitPost"
            :class="
              this.isLoading
                ? 'bg-gray-400 cursor-wait '
                : 'bg-secondary-normal hover:bg-secondary-hover'
            "
            :disabled="this.isLoading"
            class="submit block w-full text-white py-1.5 rounded-full transition"
          >
            {{
              !isEditing
                ? this.isLoading
                  ?  $t('creating_post')
                  : $t('create_post')
                : this.isLoading
                  ? $t('updating_post')
                  : $t('update_post')
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseImagePicker from '@/components/base/BaseImagePicker.vue'
import { createPost, updatePost } from '../Post/services/postService'
import { useRouter } from 'vue-router'
import useSectorStore from '@/stores/sectorStore.js'
import usePostStore from '../Post/store/postStore.js'
import ImagePreviewGallery from '@/components/gallery/ImagePreviewGallery/index.vue'
import PostSpecificInformation from '@/features/CreatePost/components/PostSpecificInformation.vue'
import TopContentForm from '@/features/CreatePost/components/TopContentForm.vue'
import useAuthStore from '@/stores/auth.js'
import { getSpecificPost } from '@/features/Post/services/postService'
import { useToast } from "vue-toastification";


export default {
  name: 'CreatePost',

  watch: {
    $route: {
      immediate: true,
      async handler() {
        if (this.postId != null) {
          this.isEditing = true

          this.post = await getSpecificPost(this.postId)
          this.formData.id = this.post.id
          this.formData.content = this.post.content
          this.imagesFromHostToPreview = this.post.images
        }
        if(this.prePostContent != null){
          this.formData.content = this.prePostContent
        }

        const sectorStore = useSectorStore()

        try {
          this.sectors = sectorStore.getAllSectors
        } catch (error) {
          console.error('Failed to load sector:', error)
        }
      }
    }
  },
  props: ['postId','prePostContent'],
  data() {
    const router = useRouter()
    const postStore = usePostStore()
    const authStore = useAuthStore()
    const toast = useToast();

    return {
      schema: {
        content: 'required'
      },
      router,
      toast,
      authStore,
      userProfileImage: authStore.user.avatar,
      postStore,
      isLoading: false,
      isEditing: false,
      imagesToFromLocalPreview: [],
      imagesFromHostToPreview: [],
      zoneId: '',
      formData: {
        id:'',
        content: '',
        images: [],
        videos: [],
        zoneId: ' ',
        sectorChecked: [],

        sectorId: []
      },
      sectors: []
    }
  },
  components: {
    TopContentForm,
    PostSpecificInformation,
    BaseImagePicker,
    ImagePreviewGallery,
  },
  methods: {
    handleError() {
      this.isLoading = false
    },
    removeImage(index) {
      this.imagesToFromLocalPreview.splice(index, 1)
    },
    async submitPost() {
      this.formData.zoneId = this.zoneId
if (this.formData.content == '') {
  this.toast.error(this.$t('please_input_content'));
  return;
}
if (this.zoneId == '') {
  this.toast.error(this.$t('premium_user_specify_zone'));
  return;
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
        this.toast.success('Post successfuly created');
      }
    },

    handleImageUpload(files) {
      if (!files || !files.length) {
        console.error('No files provided or the provided data is not an array')
        return
      }

      this.formData.images = []
      // this.imagesToFromLocalPreview = []

      files.forEach((file) => {
        if (file.type.startsWith('image/')) {
          this.formData.images.push(file)

          const imageUrl = URL.createObjectURL(file)
          this.imagesToFromLocalPreview.push({ src: imageUrl, alt: file.name })
        } else if (file.type.startsWith('video/')) {
          this.formData.videos.push(file)
        }
      })

      this.imagesFromHostToPreview = null
    },

    resetForm() {
      this.formData.content = ''
      this.formData.images = []
      this.formData.videos = []
      this.sectors.forEach((sector) => (sector.checked = false))
    },

    updateSectorChecked({ list, checked }) {
      if (checked) {
        this.formData.sectorChecked.push(list)
        this.formData.sectorId.push(list.id)
      } else {
        this.formData.sectorChecked = this.formData.sectorChecked.filter((item) => item !== name)
      }
    },
    updateZoneId(zoneId) {
      // console.log('this is the selected soneId'+ zoneId)
      this.zoneId = zoneId
      console.log(this.zoneId)
    }
  }
}
</script>
<style scoped>
label {
  font-size: 14px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

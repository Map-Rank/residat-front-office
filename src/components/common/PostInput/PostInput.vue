<template>
  <div class="grid gap-8 items-center p-4  sm:mx-2 sm:mt- bg-white rounded-lg shadow-md mb-3">
    <div class="flex">
     <div class="mr-4">
       <img :src='profilePictureUrl' alt="Profile" class="w-10 h-10 rounded-full" />
     </div>
     
      <!-- Input Field -->
      <input
        type="text"
        v-model="content"
        placeholder="What's on your mind?"
        class="flex-grow px-4 py-2 border rounded-full focus:outline-none"
      />
    </div>
    <!-- Action Buttons -->
    <div class="flex mdspace-x-2 md:space-x-6 lg:space-x-14 justify-between">
      <!-- Live Video -->

      <ButtonUi
        :label="'Post'"
        color="bg-secondary-normal "
        :isRoundedFull="true"
        customCss="justify-center item-center  hover:bg-secondary-hover font-medium"
        textCss="font-medium text-white "
        @clickButton="navigateCreatePost"
        >
      </ButtonUi>
      <ButtonUi
        :label="'Create Event'"
        color="bg-secondary-normal "
        :isRoundedFull="true"
        customCss="justify-center item-center  hover:bg-secondary-hover font-medium"
        textCss="font-medium text-white"
        @clickButton="navigateCreatePost"
      >
      </ButtonUi>
    </div>
  </div>
</template>
<script>
import ButtonUi from '../../base/ButtonUi.vue'
import { useRoute } from 'vue-router'
import usePostStore from '@/features/Post/store/postStore';

export default {
  name: 'PostInput',

  data() {
    const route = useRoute()
    const postStore = usePostStore()
    return {
      route,
      postStore,
      content:'',
    }
  },

  props: {
    profilePictureUrl: {
      type: String,
      default: '\\assets\\images\\smile.png' 
    }
  },

  methods: {
    navigateCreatePost(){
      // console.log(this.content)
      this.postStore.setContentFromPostInput(this.content)
      this.$router.push({ name: 'create-post' })
    }
  },
  components: {
    ButtonUi
  }
}
</script>
<style scoped>
/* Additional custom styles if needed */
</style>

<template>
  <div class="d-flex gap-8 items-center p-4  sm:mx-2 sm:mt- bg-white rounded-lg shadow-md mb-3">
    <div class="flex w-full">
     <div class="mr-4">
       <img :src='profilePictureUrl' alt="Profile" class="w-10 h-10 rounded-full" />
     </div>
     
      <!-- Input Field -->
      <input
        type="text"
        v-model="content"
        :placeholder="$t('input_placeholder')"
        class="px-4 py-2 border rounded-full focus:outline-none w-full" 
      />
    </div>
    <!-- Action Buttons -->
    <div class="flex space-x-2 md:space-x-6 lg:space-x-14 justify-between w-full pt-5">
      <!-- Live Video -->

      <ButtonUi
      :label="$t('post')"
        color="bg-secondary-normal "
        :isRoundedFull="true"
        customCss="justify-center item-center  hover:bg-secondary-hover font-medium"
        textCss="font-medium text-white "
        @clickButton="navigateCreatePost"
        >
      </ButtonUi>
      <ButtonUi
      :label="$t('create_event')"
        color="bg-secondary-normal "
        :isRoundedFull="true"
        customCss="justify-center item-center  hover:bg-secondary-hover font-medium"
        textCss="font-medium text-white"
        @clickButton="navigateCreateEvent"
      >
      </ButtonUi>
    </div>
  </div>
</template>
<script>
import ButtonUi from '../../base/ButtonUi.vue'
import { useRoute } from 'vue-router'
import usePostStore from '@/features/Post/store/postStore';
import { checkAuthentication } from '@/utils/authUtils.js';

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

      if(checkAuthentication()){
        this.postStore.setContentFromPostInput(this.content)
        this.$router.push({ name: 'create-post', params:{prePostContent: this.content } })
      }
    },
    navigateCreateEvent(){

      if(checkAuthentication()){
        this.$router.push({ name: 'create-event', params:{preEventTitle: this.content } })
      }
      
    },
  },
  components: {
    ButtonUi
  }
}
</script>
<style scoped>
.mobile-button-post {
 
}
</style>

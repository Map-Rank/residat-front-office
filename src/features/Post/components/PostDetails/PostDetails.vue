<template>
  <div class="">
    <div class="fixed z-10 inset-0 back overflow-y-auto" id="modal">
      <div class="flex  min-h-screen pt-4 sm:px-4 pb-10 mt-8 sm:block sm:p-0">
      <div
        :class="`box grid ${
          post && post.medias && post.medias.length === 0? 'grid-cols-auto' : 'md:grid-cols-2'
        } bg-black shadow rounded-lg w-4/5 mx-auto`"
      >
      
          <!-- Display post images  -->
          <div
            class="flex items-center justify-center mt-1"
            v-if="post.images && post.images.length > 0"
          >
            <ImageSlider class="w-full" :images="post.images"></ImageSlider>
          </div>

          <!-- Post details and information  -->

          <div class="info grid grid-rows-custom pl-5 py-3">
            <!-- user informations -->
            <div class=" relative pb-4 mr-5 items-start">
              <button @click="dismiss()  " class="flex justify-end w-full">
                <img src="@\assets\icons\dismiss.svg" alt=""  class=""/>
              </button>
              <div class="flex items-start justify-between border-b-2">
                <UserInfoPostDetails :image-host="imageHost" :post="post" />

              </div>
            </div>

            <!-- list of Comment  -->
            <div class="overflow-auto ">
              <div v-if="!loading" class="space-y-2">
                <div
                  v-for="(comment, index) in post.comments"
                  :key="index"
                  class="flex items-start space-x-4"
                >
                  <CommentInfoBox   :comment="comment" :image-host="imageHost" />
                </div>
              </div>

              <div v-if="loading" class="flex justify-center items-center">
                <loading-indicator />
              </div>
            </div>

            <!-- comment interaction section -->
            <div class=" space-y-2 w-full mr-3">
              <div class="flex justify-between mr-3">
                
                
                <div>
                  <icon-with-label
                  :svgContentHover="'\\assets\\icons\\heart-fill.svg'"
                  :svgContent="'\\assets\\icons\\heart-outline.svg'"
                  :labelTextRight="'Like'"
                  :iconDesktopSize="'w-6 h-6'"
                  :iconMobileSize="'w-5 h-5'"
                  :isActive="post.liked"
                  :right="true"
                  @customFunction="likePost()"

                  ></icon-with-label>
                </div>
                <div class="flex justify-between  pb-2">
                  <div class="flex items-center space-x-1">
                    <img 
                    
                    src="@\assets\icons\heart-fill.svg" alt="" />
                    <span class="caption-c1-bold">{{ post.like_count }}  likes</span>
                    <img 
                    
                    
                    src="@\assets\icons\share-fill.svg" alt="" />
                    <span @click="openShareModal()" class="ml-4 caption-c1-bold cursor-pointer">{{ post.share_count }} Shares</span>
                  </div>
                </div>
              </div>

              </div>

              <div class="flex justify-between space-x-4 mr-3">
                <input
                  v-model="commentText"
                  type="text"
                  placeholder="Add a comments"
                  class="w-full p-2 border border-2 bg-white border-secondary-normal rounded-lg focus:outline-none focus:border-secondary-hover"
                />

                <!-- Post button -->
                <button
                  @click="
                    () => {
                      commentPost();
                    }
                  "
                  class=" text-white  px-6 py-2 rounded-lg bg-secondary-normal hover:bg-secondary-hover focus:outline-none"
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from "pinia";
import usePostStore from "../../store/postStore";
import { URL_LINK } from "@/constants";
import ImageSlider from "../../../../components/gallery/ImageSlider.vue";
import CommentInfoBox from "@/features/Post/components/PostDetails/components/CommentInfoBox.vue";
import UserInfoPostDetails from "@/features/Post/components/PostDetails/components/UserInfoPostDetails.vue";
import LoadingIndicator from "@/components/base/LoadingIndicator.vue";
import { commentPost ,getSpecificPost } from "@/features/Post/services/postService";
import IconWithLabel from '@/components/common/IconWithLabel/index.vue'
import { likePost } from "../../services/postService";
import useModalStore from '@/stores/modalStore.js'

export default {
  name: "PostDetails",

  async created() {
    const postStore = usePostStore();

    this.postId = postStore.postIdToShowDetail
    this.post = postStore.postToShowDetails;
  },
  components: {
    LoadingIndicator,
    UserInfoPostDetails,
    CommentInfoBox,
    ImageSlider,
    IconWithLabel
  },
  data() {

    const modalStore = useModalStore()

    return {
      modalStore,
      currentImageIndex: 0,
      post: null,
      commentText: "",
      loading: false,
      postId:null,
      imageHost: URL_LINK.imageHostLink,
    };
  },

  computed: {
    currentImage() {
      return this.post.medias[this.currentImageIndex].url;
    },
  },
  methods: {
    ...mapActions(usePostStore, ["togglePostDetails"]),

    openShareModal() {
      // this.modalStore.openModal(`https://dev.residat.com/show-post/${this.post.id}`)
      this.modalStore.openModal(`https://dev.residat.com/show-post`)
    },

    async commentPost() {
      this.loading = true;
      
      try {
        await commentPost(this.postId, { text: this.commentText });
    this.post = await getSpecificPost(this.postId)
      } catch (error) {
        this.loading = false;
      }
      finally{
        this.commentText=''
        this.loading = false;
      }
    },

    async likePost(){

      this.loading = true;
      
      try {
        await likePost(this.postId)
    this.post = await getSpecificPost(this.postId)
      } catch (error) {
        this.loading = false;
      }
      finally{
        this.commentText=''
        this.loading = false;
      }

    },
    dismiss() {
      this.togglePostDetails();
    },
    nextImage() {
      if (this.currentImageIndex < this.post.medias.length - 1) {
        this.currentImageIndex + 1;
      }
      console.log(this.currentImageIndex);
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      }
    },
  },
};
</script>

<style scoped>
.back {
  background: rgba(13, 13, 13, 0.155);
}

.grid-rows-custom {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.btn {
  text-align: center;
  font-feature-settings: "clig" off, "liga" off;

  /* Desktop / Link Small */
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 175% */
  letter-spacing: 0.75px;
}
.info {
  background: #f5f2f2;
}
.info {
  height: 80vh;
}

@media only screen and (max-width: 600px) {
  .info {
    height: 60vh;
  }
}
</style>

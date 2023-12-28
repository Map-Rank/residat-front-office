<template>
  <div class="">
    <div class="fixed z-10 inset-0 back overflow-y-auto" id="modal">
      <div class="flex items-end min-h-screen pt-4 sm:px-4 pb-10 mt-8 sm:block sm:p-0">
      <div
        :class="`box grid ${
          post && post.medias && post.medias.length === 0? 'grid-cols-auto' : 'md:grid-cols-2'
        } bg-black shadow rounded-lg w-4/5 mx-auto`"
      >
      
          <!-- Display post images  -->
          <div
            class="flex items-center justify-center mt-1"
            v-if="post.medias && post.medias.length > 0"
          >
            <ImageSlider class="w-full" :images="post.medias"></ImageSlider>
          </div>

          <!-- Post details and information  -->

          <div class="info grid grid-rows-custom pl-5 py-3">
            <!-- user informations -->
            <div class="mt-5 relative pb-4 mr-5 items-start">
              <div class="flex items-start justify-between border-b-2">
                <UserInfoPostDetails :image-host="imageHost" :post="post" />

                <button @click="dismiss()">
                  <img src="src\assets\icons\dismiss.svg" alt="" />
                </button>
              </div>
            </div>

            <!-- list of Comment  -->
            <div class="overflow-auto">
              <div v-if="!loading" class="space-y-2">
                <div
                  v-for="(comment, index) in post.post_comments"
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
            <div class="mt-auto space-y-4 w-full">
              <div class="flex space-x-4">
                <img src="src\assets\icons\heart.svg" alt="" />
                <img src="src\assets\icons\bookmark.svg" alt="" />
              </div>

              <div class="flex justify-between space-x-4">
                <input
                  v-model="commentText"
                  type="text"
                  placeholder="Add a comments"
                  class="w-full p-2 border bg-white-gray border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                <!-- Post button -->
                <button
                  @click="
                    () => {
                      commentPost();
                    }
                  "
                  class="btn text-green-500 px-6 py-2 rounded-lg hover:bg-white focus:outline-none"
                >
                  send
                </button>
              </div>
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

export default {
  name: "PostDetails",

  async created() {
    const postStore = usePostStore();

    // this.post = await getSpecificPost(postStore.postIdToShowDetail)
    this.postId = postStore.postIdToShowDetail
    this.post = postStore.postToShowDetails;
  },
  components: {
    LoadingIndicator,
    UserInfoPostDetails,
    CommentInfoBox,
    ImageSlider,
  },
  data() {
    return {
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
  background: rgba(13, 13, 13, 0.3);
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

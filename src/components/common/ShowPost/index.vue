<template>
  <div
    :class="`mt-5 grid md:grid-cols-3 ${
      post && post.images && post.images.length === 0 ? 'grid-cols-auto' : 'md:grid-cols-2'
    } bg-black shadow rounded-lg md:w-[90%] h-full mx-auto relative`"
  >
    <!-- Close Button for Mobile View -->
    <button
      @click="goBack()"
      class="flex justify-center   md:hidden absolute top-1 left-1 z-20 bg-white p-2 rounded-full shadow"
    >
      <span class="text-[32px] text-center text-red-600">×</span>
    </button>

    <!-- Display post images -->
    <div
      class="md:col-span-2 flex items-center justify-center mt-1"
      v-if="post.images && post.images.length > 0"
    >
      <ImageSlider class="w-full" :images="post.images"></ImageSlider>
    </div>

    <!-- Post details and information -->
    <div class="md:col-span-1 info grid grid-rows-custom md:pl-5 px-3 py-3">
      <!-- user informations -->
      <div class="mt-5 relative pb-4 mr-5 items-start">
        <div class="flex items-start justify-between border-b-2">
          <UserInfoPostDetails :image-host="imageHost" :post="post" />
        </div>
      </div>

      <!-- list of Comments -->
      <div class="overflow-auto">
        <div v-if="!loading" class="space-y-2">
          <div
            v-for="(comment, index) in post.comments"
            :key="index"
            class="flex items-start space-x-4"
          >
            <CommentInfoBox :comment="comment" :image-host="imageHost" />
          </div>
        </div>
        <div v-if="loading" class="flex justify-center items-center">
          <LoadingIndicator />
        </div>
      </div>

      <!-- Comment interaction section -->
      <div class="mt-auto space-y-4 w-full">
        <div class="comment-section flex justify-between space-x-4 md:static fixed inset-x-0 bottom-0 md:bg-transparent bg-white md:p-0 py-2.5 px-2.5 md:shadow-none shadow-md z-10">
          <input
            v-model="commentText"
            type="text"
            placeholder="Add a comment"
            class="w-full p-2 border-2 bg-white border-secondary-normal rounded-lg focus:outline-none focus:border-secondary-hover"
          />
          <button
            @click="commentPost"
            class="text-white px-6 py-2 rounded-lg bg-secondary-normal hover:bg-secondary-hover focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from "pinia";
import usePostStore from "@/features/Post/store/postStore";
import { URL_LINK } from "@/constants";
import ImageSlider from "@/components/gallery/ImageSlider.vue";
import CommentInfoBox from "@/features/Post/components/PostDetailModal/components/CommentInfoBox.vue";
import UserInfoPostDetails from "@/features/Post/components/PostDetailModal/components/UserInfoPostDetails.vue";
import LoadingIndicator from "@/components/base/LoadingIndicator.vue";
import { commentPost ,getSpecificPost } from "@/features/Post/services/postService";
export default {
  name: "ShowPost",

  async created() {
    this.post = await getSpecificPost(this.id)
    console.log(this.post)
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
      id: this.$route.params.id,
      commentText: "",
      loading: false,
      postId:null,
      imageHost: URL_LINK.imageHostLink,
    };
  },

  computed: {
    currentImage() {
      return this.post.images[this.currentImageIndex].url;
    },
  },
  methods: {
    ...mapActions(usePostStore, ["togglePostDetails"]),

    async commentPost() {
      this.loading = true;
      
      try {
        await commentPost(this.id, { text: this.commentText });
    this.post = await getSpecificPost(this.id)
      } catch (error) {
        this.loading = false;
      }
      finally{
        this.commentText=''
        this.loading = false;
      }
    },

    goBack() {
    if (window.history.length > 1) {
      this.$router.go(-1);
    } else {
      this.$router.push({ path: 'community' }); 
    }
  },
    dismiss() {
      this.togglePostDetails();
    },
    nextImage() {
      if (this.currentImageIndex < this.post.images.length - 1) {
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

}
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

.comment-section {

  z-index: 100; /* high index to stay above other content */
}


</style>
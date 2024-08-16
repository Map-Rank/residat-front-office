<template>
  <transition name="modal-fade ">
    <div v-if="show" class="modal-backdrop z-100 p-4 items-center">
      <div class="flex pt-4 sm:px-4 pb-10 mt-8 sm:block sm:p-0 w-full">
        <div
          :class="`box grid ${
            post && post.medias && post.medias.length === 0
              ? 'grid-cols-auto'
              : 'md:grid-cols-2'
          }  bg-black shadow rounded-lg md:w-4/5  mx-auto`"
        >
          <!-- Display post images  -->
          <div v-if="loading" class="flex justify-center items-center">
            <loading-indicator />
          </div>
          <div
            class="flex items-center justify-center mt-1"
            v-if="!loading && post.images && post.images.length > 0"
          >
            <ImageSlider class="w-full" :images="post.images"></ImageSlider>
          </div>

          <!-- Post details and information  -->

          <div class="info h-[40vh] md:h-[70vh] grid grid-rows-custom pl-5 py-3">
            <!-- user informations -->
            <div class="relative pb-4 mr-5 items-start">
              <button @click="dismiss()" class="flex justify-end w-full">
                <img src="@\assets\icons\dismiss.svg" alt="" class="" />
              </button>
              <div
                v-if="!loading"
                class="max-h-[200px] overflow-y-auto flex items-start justify-between border-b-2"
              >
                <UserInfoPostDetails :image-host="imageHost" :post="post" />
              </div>
            </div>

            <!-- list of Comment  -->
            <div class="overflow-auto md:hidden">
              <div v-if="!loading" class="space-y-2">
                <div class="flex items-start space-x-4" v-if="post.comments.length > 0">
                  <CommentInfoBox :comment="post.comments[0]" :image-host="imageHost" />
                </div>
                <div class="flex items-start space-x-4" v-else>
                  <p class="text-blue-600">Be the first to comment.</p>
                </div>
                <div class="flex items-start space-x-4" v-if="post.comments.length > 1">
                  <a href="#" @click="NavigateToPostDetail()" class="text-secondary-normal">See all comments</a>
                </div>
              </div>

              <div v-if="loading" class="flex justify-center items-center">
                <loading-indicator />
              </div>
            </div>

            <div class="overflow-auto hidden md:block">
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
                <loading-indicator />
              </div>
            </div>

            <!-- comment interaction section -->
            <div v-if="!loading" class="space-y-2 w-full mr-3">
              <div class="flex justify-between mr-3">
                <div>
                  <icon-with-label
                    :svgContentHover="'\\assets\\icons\\heart-fill.svg'"
                    :svgContent="'\\assets\\icons\\heart-outline.svg'"
                    :labelTextRight="$t('like')"
                    :iconDesktopSize="'w-6 h-6'"
                    :iconMobileSize="'w-5 h-5'"
                    :isActive="post.liked"
                    :right="true"
                    @customFunction="likePost()"
                  ></icon-with-label>
                </div>
                <div  class="md:hidden">
                  <icon-with-label
                    :svgContentHover="'\\assets\\icons\\comment-fill.svg'"
                    :svgContent="'\\assets\\icons\\comment-outline.svg'"
                    :labelTextRight="$t('comment')"
                    :iconDesktopSize="'w-6 h-6'"
                    :iconMobileSize="'w-5 h-5'"
                    :isActive="post.liked"
                    :right="true"
                    @customFunction="NavigateToPostDetail()"
                  ></icon-with-label>
                </div>
                <div class="flex justify-between pb-2">
                  <div class="flex items-center space-x-1">
                    <img src="@\assets\icons\heart-fill.svg" alt="" />
                    <span class="caption-c1-bold"
                      >{{ post.like_count }}</span
                    >
                    <img src="@\assets\icons\share-fill.svg" alt="" />
                    <span
                      @click="openShareModal()"
                      class="ml-4 caption-c1-bold cursor-pointer"
                      >{{ post.share_count }} </span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="md:flex justify-between space-x-4 mr-3 hidden ">
              <input
                v-model="commentText"
                type="text"
                placeholder="Add a comments"
                class="w-full p-2 border-2 bg-white border-secondary-normal rounded-lg focus:outline-none focus:border-secondary-hover"
              />

              <!-- Post button -->
              <button
                @click="
                  () => {
                    commentPost();
                  }
                "
                class="text-white px-6 py-2 rounded-lg bg-secondary-normal hover:bg-secondary-hover focus:outline-none"
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import { mapActions } from 'pinia'
// import usePostStore from '../../store/postStore'
import { URL_LINK } from "@/constants";
import ImageSlider from "@/components/gallery/ImageSlider.vue";
import CommentInfoBox from "./components/CommentInfoBox.vue";
import UserInfoPostDetails from "./components/UserInfoPostDetails.vue";
import LoadingIndicator from "@/components/base/LoadingIndicator.vue";
import {
  commentPost,
  getSpecificPost,
  likePost,
} from "@/features/Post/services/postService";
import IconWithLabel from "@/components/common/IconWithLabel/index.vue";

import useModalStore from "@/stores/modalStore.js";

export default {
  name: "PostDetailModal",

  async created() {
    this.loading = true;
    try {
      this.post = await getSpecificPost(this.postId);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      this.loading = false;
    }
  },
  components: {
    LoadingIndicator,
    UserInfoPostDetails,
    CommentInfoBox,
    ImageSlider,
    IconWithLabel,
  },

  props: {
    postId: Number,
  },
  data() {
    const modalStore = useModalStore();

    return {
      show: true,
      showComponent: true,
      modalStore,
      currentImageIndex: 0,
      post: null,
      commentText: "",
      loading: true,
      // postId: null,
      imageHost: URL_LINK.imageHostLink,
    };
  },

  computed: {
    currentImage() {
      return this.post.medias[this.currentImageIndex].url;
    },
  },
  methods: {
    // ...mapActions(usePostStore, ['togglePostDetails']),
    close() {
      this.$emit("close");
    },

    openShareModal() {
      this.modalStore.openModal(`https://www.residat.com/show-post/${this.post.id}`);
      // this.modalStore.openModal(`https://dev.residat.com/show-post`)
    },

    async commentPost() {
      this.loading = true;

      try {
        await commentPost(this.postId, { text: this.commentText });
        this.post = await getSpecificPost(this.postId);
      } catch (error) {
        this.loading = false;
      } finally {
        this.commentText = "";
        this.loading = false;
      }
    },

    NavigateToPostDetail(){
      this.$router.push({ name: 'show-post', params: { id: this.postId } })
    },

    async likePost() {
      // this.loading = true;

      try {
        await likePost(this.postId);
        this.post = await getSpecificPost(this.postId);
      } catch (error) {
        this.loading = false;
      } finally {
        this.commentText = "";
        this.loading = false;
      }
    },
    dismiss() {
      this.$emit("close");
      // this.togglePostDetails()
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
.modal-backdrop {
  position: fixed;

  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #ffffff;
  width: 70%;

  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-height: 70%;
}

.modal-header {
  position: relative;

  color: #4aae9b;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
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
</style>

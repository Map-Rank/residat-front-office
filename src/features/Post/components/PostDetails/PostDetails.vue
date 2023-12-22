<template>
  <div class="">
    <div class="fixed z-10 inset-0 back overflow-y-auto" id="modal">
      <div class="flex items-end min-h-screen pt-4 sm:px-4 pb-10 mt-8 sm:block sm:p-0">
        <div 
        :class="`box grid ${post.images.length === 0 ? 'grid-cols-auto' : 'md:grid-cols-2'} bg-black shadow rounded-lg w-4/5 mx-auto`"
        >
          <!-- Display post images  -->
          <div  class="flex items-center mt-1 "  v-if="post.images.length > 0">
            <div v-if="post.images && post.images.length" class="flex space-x-2  w-full h-full">
              <!-- <button class="text-white" @click="prevImage">Prev</button> -->
              <img :src="`${imageHost}${currentImage}`" class="object-cover " alt="Post image" />
              <!-- <button class="text-white" @click="nextImage">Next</button> -->
            </div>
          </div>

          <!-- Post details and information  -->

          <div class="info grid grid-rows-2 h-full pl-5 py-3">
            <div class="h-full">
              <!-- user informations -->
              <div class="mt-5 relative pb-4 mr-5 items-start">
                <div class="flex justify-between">
                  <div class="flex space-x-2 mb-4">
                    <img
                      class="w-10 h-10 rounded-full"
                      :src="post.creator[0].avatar"
                      alt="User profile"
                    />
                    <div class="flex-1">
                      <h5 class="font-bold">{{ post.creator[0].first_name }}</h5>
                      <div class="text-sm text-gray-600">{{ post.published_at }}</div>
                    </div>
                  </div>
                  <button @click="dismiss()">
                    <img src="src\assets\icons\dismiss.svg" alt="" />
                  </button>
                </div>
                <p class="border-b-2 pb-3">{{ post.content }}</p>
              </div>

              <!-- list of Comment  -->
              <div class="overflow-auto h-full">
                <div class="space-y-2">
                  <div
                    v-for="(comment, index) in post.comments"
                    :key="index"
                    class="flex items-start space-x-4"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      :src="comment.user.avatar"
                      alt="User profile"
                    />

                    <div>
                      <div>
                        <div>
                          <h5 class="comment-user-name">{{ comment.user.first_name }}</h5>
                          <div class="comment-text">{{ comment.text }}</div>
                          <div class="text-sm caption-1">{{ comment.created_at }}</div>
                        </div>

                        <div class="flex space-x-2 mt-2">
                          <button class="btn2 rounded hover:bg-gray-100 text-gray-normal font-bold">
                            Like
                          </button>

                          <button class="btn2 rounded hover:bg-gray-100 text-gray-normal font-bold">
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- comment interaction section -->
            <div class="mt-auto space-y-4 w-full">
              <div class="flex space-x-4">
                <img src="src\assets\icons\heart.svg" alt="" />
                <img src="src\assets\icons\bookmark.svg" alt="" />
              </div>

              <div class="flex space-x-4">
                <input
                  type="text"
                  placeholder="Add a comments"
                  class="w-3/4 p-2 border bg-white-gray border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                <!-- Post button -->
                <button
                  @click="
                    () => {
                      console.log(this.post)
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
  <!-- </div>  -->
</template>

<script>
import { mapActions } from 'pinia'
import usePostStore  from '../../store/postStore'
import { URL_LINK } from '@/constants';

export default {
  name: 'PostDetails',

  created() {
    const postStore = usePostStore()
    this.post = postStore.postToShowDetails
  },
  data() {
    return {
      currentImageIndex: 0,
      post: [],
        imageHost:URL_LINK.imageHostLink
    }
  },
  props: {
  },
  computed: {
    currentImage() {
      return this.post.images[this.currentImageIndex].url
    }
  },
  methods: {
    ...mapActions(usePostStore, ['togglePostDetails']),

    dismiss() {
      this.togglePostDetails()
    },
    nextImage() {
      if (this.currentImageIndex < this.post.images.length - 1) {
        this.currentImageIndex + 1
      }
      console.log(this.currentImageIndex)
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
      }
    }
  }
}
</script>

<style scoped>
.back {
  background: rgba(13, 13, 13, 0.3);
}

.btn2 {
  color: var(--gray-normal, #6b6b6b);

  /* Buttons/B2-Bold */
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}

.btn {
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* Desktop / Link Small */
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 175% */
  letter-spacing: 0.75px;
}
.info {
  background: var(--Sections, #f5f2f2);
}
.info {
  height: 80vh;
}

@media only screen and (max-width: 600px) {
  .info {
    height: 60vh;
  }
}

.comment-user-name {
  color: #000;

  /* Paragraphs/P3-Bold */
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.comment-text {
  color: #000;

  /* Paragraphs/P4 */
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.caption-1 {
  color: var(--gray-normal, #6b6b6b);

  /* Captions/C1 */
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>

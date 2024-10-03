<template>
  <div class="relative w-full max-w-[50vh] bg-gray-200 overflow-hidden rounded-lg" v-if="hidden">
    <!-- Horizontal slider for posts -->
    <div ref="slider" class="flex transition-transform duration-300 ease-in-out gap-2">
      <!-- Loop through each post and display its content -->
      <div v-for="(post, index) in posts" :key="index" class="min-w-[400px] flex-shrink-0 p-4">
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <!-- Post Image -->
          <div v-if="post.images && post.images.length" class="w-full h-[10vh]">
            <img :src="post.images[0].url" alt="Post Image" class="w-full h-full object-cover" />
          </div>
          <!-- Post Creator Information -->
          <div class="p-4">
            <div class="flex items-center gap-3 mb-2">
              <img
                :src="post.creator[0]?.avatar || '/default-avatar.png'"
                alt="Avatar"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h6 class="font-bold text-gray-800 text-base">
                  {{ post.creator[0]?.first_name }} {{ post.creator[0]?.last_name }}
                </h6>

                <span
                  v-if="status === 'TRENDING'"
                  class="bg-[#FFFDD0] px-2 py-1 rounded-lg text-xs text-white"
                  >{{ status }}</span
                >
                <span
                  v-if="status === 'RECENT'"
                  class="bg-[#1c50a3] px-2 py-1 rounded-lg text-xs text-white"
                  >{{ status }}</span
                >
              </div>
            </div>
            <!-- Post Content -->
            <div v-html="post.content" class="text-gray-700 text-sm"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Left and Right arrows -->
    <button
      @click="slideLeft"
      class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
    >
      &#x276E;
    </button>
    <button
      @click="slideRight"
      class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
    >
      &#x276F;
    </button>

    <!-- Slider Indicator -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
      <span
        v-for="(post, index) in posts"
        :key="index"
        :class="[
          'block w-2.5 h-2.5 rounded-full transition-all',
          currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
        ]"
      ></span>
    </div>
  </div>
</template>

<script>
import { labelStatus } from '@/constants/labelStatus.js'
export default {
  name: 'PostSlider',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    status: {
      type: String
      // default: labelStatus.TRENDING
    },
    hidden: {
      type: Boolean,
      default: false
    },

    posts: {
      type: Array,
      default: () => [
        {
          id: 2028,
          content: '<p>Test post content<\/p>',
          images: [
            {
              id: 1197,
              type: 'image/jpeg',
              url: 'https://backoffice-dev.residat.com/storage/images/4742e5d6-bb78-448b-8933-12887c31e2bb.jpeg'
            }
          ],
          creator: [
            {
              id: 4,
              first_name: 'Stephen',
              last_name: 'Jacques',
              avatar: 'https://backoffice-dev.residat.com/storage/media/profile.png'
            }
          ],
          created_at: '2024-02-26'
        },
        {
          id: 2028,
          content: '<p>Test post content<\/p>',
          images: [
            {
              id: 1197,
              type: 'image/jpeg',
              url: 'https://backoffice-dev.residat.com/storage/images/4742e5d6-bb78-448b-8933-12887c31e2bb.jpeg'
            }
          ],
          creator: [
            {
              id: 4,
              first_name: 'Stephen',
              last_name: 'Jacques',
              avatar: 'https://backoffice-dev.residat.com/storage/media/profile.png'
            }
          ],
          created_at: '2024-02-26'
        },
        {
          id: 2028,
          content: '<p>Test post content<\/p>',
          images: [
            {
              id: 1197,
              type: 'image/jpeg',
              url: 'https://backoffice-dev.residat.com/storage/images/4742e5d6-bb78-448b-8933-12887c31e2bb.jpeg'
            }
          ],
          creator: [
            {
              id: 4,
              first_name: 'Stephen',
              last_name: 'Jacques',
              avatar: 'https://backoffice-dev.residat.com/storage/media/profile.png'
            }
          ],
          created_at: '2024-02-26'
        },
        {
          id: 2028,
          content: '<p>Test post content<\/p>',
          images: [
            {
              id: 1197,
              type: 'image/jpeg',
              url: 'https://backoffice-dev.residat.com/storage/images/4742e5d6-bb78-448b-8933-12887c31e2bb.jpeg'
            }
          ],
          creator: [
            {
              id: 4,
              first_name: 'Stephen',
              last_name: 'Jacques',
              avatar: 'https://backoffice-dev.residat.com/storage/media/profile.png'
            }
          ],
          created_at: '2024-02-26'
        },
        {
          id: 2029,
          content: '<p>Another post content<\/p>',
          images: [
            {
              id: 1198,
              type: 'image/jpeg',
              url: 'https://backoffice-dev.residat.com/storage/images/example2.jpeg'
            }
          ],
          creator: [
            {
              id: 5,
              first_name: 'Alice',
              last_name: 'Smith',
              avatar: 'https://backoffice-dev.residat.com/storage/media/profile2.png'
            }
          ],
          created_at: '2024-03-01'
        }
      ]
    }
  },
  methods: {
    slideLeft() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.updateSliderPosition()
      }
    },
    slideRight() {
      if (this.currentIndex < this.posts.length - 1) {
        this.currentIndex++
        this.updateSliderPosition()
      }
    },
    updateSliderPosition() {
      const slider = this.$refs.slider
      const newTranslate = -this.currentIndex * 400
      slider.style.transform = `translateX(${newTranslate}px)`
    }
  }
}
</script>

<style scoped>
/* Hide default scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

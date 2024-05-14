<template>
  <article class="bg-white rounded-lg overflow-hidden py-3 sm:mx-2">
    <!-- Post Header with User Information -->
    <header class="flex justify-between px-5 mb-3">
      <UserPostInfo
        :post-date="postDate"
        :user-profile-image="userProfileImage"
        :username="username"
        :zoneName="zoneName"
        :id="id"
      />
      <div v-if="showMenu" class="menu relative">
        <button @click="toggleMenu" class="p-2 flex">
          <!-- Three dots icon -->
          <svg class="w-6 h-6" fill="true" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-show="isMenuVisible"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
        >
          <button-ui
            :label="'Edit'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="editPost()"
          >
          </button-ui>

          <button-ui
            :label="'Delete'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="deletePost()"
          >
          </button-ui>

          <button-ui
            :label="'View'"
            :textCss="'text-left '"
            :customCss="'items-left justify-start hover:bg-gray-100'"
            @clickButton="viewPost()"
          >
          </button-ui>
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <div @click.prevent="showDetails(this.post.id)" class="px-5 mb-2 cursor-pointer">
      <p class=" content ">{{ postContent }}</p>
    </div>

    <!-- Post Images -->

    <image-post-gallery :Images="postImages" @customFunction="showDetails(this.post.id)">
    </image-post-gallery>

    <!-- Post Interaction Area -->
    <footer class="px-5 pt-2">
      <!-- upper section  -->
      <InteractionPostStatistics
        :comment_count="customPost.comment_count"
        :like_count="like_count"
        :share_count="customPost.share_count"
        @showPostDetails="showDetails(this.post.id)"
      />

      <!-- lower section  -->
      <div class="flex justify-between">
        <icon-with-label
          v-for="(item, index) in iconLabels"
          :svgContentHover="item.svgContentHover"
          :svgContent="item.svgContent"
          :labelTextRight="item.labelText"
          :iconDesktopSize="this.iconDesktopSize"
          :iconMobileSize="this.iconMobileSize"
          :isActive="item.isActive"
          :right="item.right"
          @clickIcon="clickIcon(index)"
          @customFunction="customFunction(index)"
          :key="index"
          class="flex-shrink-0"
        ></icon-with-label>
      </div>

      <!-- comment section -->
      <div v-if="showCommentBox" class="flex space-x-3 items-center justify-between mt-3 overflow-hidden w-full">
        <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" />
        <div class="border  p-2  rounded-lg flex-grow">
          <input
            v-model="commentData.text"
            type="search"
            placeholder="Search "
            class=" bg-transparent w-full focus:border-none rounded-md outline-none hover:border-none transition-colors duration-200"
          />
       
        </div>
        <button
          @click.prevent="commentPost(this.commentData)"
          class="btn bg-secondary-normal text-white px-3 py-2 rounded-lg focus:outline-none"
        >
        {{ $t('post') }}
        </button>
      </div>
    </footer>
  </article>

  <post-details v-if="showPostDetails"></post-details>
</template>

<script>
import '../../assets/css/global.scss'
import IconWithLabel from '../../components/common/IconWithLabel/index.vue'
import PostDetails from './components/PostDetails/PostDetails.vue'
import { mapActions, mapWritableState } from 'pinia'
import usePostStore from './store/postStore'
import { commentPost, deletePost, likePost, sharePost } from '../Post/services/postService'
import ButtonUi from '../../components/base/ButtonUi.vue'
import { useRoute } from 'vue-router'
import ImagePostGallery from '@/components/gallery/ImagePostGallery/index.vue'
import UserPostInfo from '@/features/Post/components/UserPostInfo/UserPostInfo.vue'
import InteractionPostStatistics from '@/features/Post/components/InteractionPostStatistics/InteractionPostStatistics.vue'
import { URL_LINK } from '@/constants/url.js'

import useModalStore from '@/stores/modalStore.js'

export default {
  name: 'PostComponent',
  emits: ['postFetch', 'updatePost'],
  data() {
    const route = useRoute()
    const modalStore = useModalStore()

    return {
      route,
      modalStore,
      iconDesktopSize: 'w-6 h-6',
      iconMobileSize: 'w-5 h-5',
      likeCount: this.like_count,
      customPost: this.post,
      customLiked: this.liked,
      hasLikeouUnlike: false,
      isMenuVisible: false,
      imageHost: URL_LINK.imageHostLink,
      showCommentBox: false,
      isCommenting: false,
      commentData: {
        text: ' ',
        image: ' '
      },
      iconLabels: [
        {
          svgContent: '\\assets\\icons\\heart-outline.svg',
          svgContentHover: '\\assets\\icons\\heart-fill.svg',
          labelText:  this.$t('like'),
          isActive: this.customLiked,
          right: true
        },
        {
          svgContent: '\\assets\\icons\\comment-outline.svg',
          svgContentHover: '\\assets\\icons\\comment-fill.svg',
          labelText: this.$t('comment'),
          isActive: this.isCommenting,
          right: true
        },
        {
          svgContent: '\\assets\\icons\\share-fill.svg',
          svgContentHover: '\\assets\\icons\\share-fill.svg',
          labelText:  this.$t('share'),
          right: true
        }
      ]
    }
  },

  methods: {
    ...mapActions(usePostStore, [
      'togglePostDetails',
      'setpostToShowDetails',
      'setpostToEdit',
      'showDetails',
      'setpostIdToShowDetails'
    ]),

    async deletePost(alertMessage = 'Are you sure you want to delete this post?') {
      if (window.confirm(alertMessage)) {
        console.log('Deleting post', this.postId)
        try {
          await deletePost(this.postId)
          window.location.reload()
        } catch (error) {
          console.error('Error deleting post:', error)
        }
      } else {
        console.log('Post deletion cancelled by user')
      }
    },

    viewPost() {
      this.$router.push({ name: 'show-post', params: { id: this.post.id } })
    },

    openShareModal() {
      this.modalStore.openModal(`https://dev.residat.com/show-post/${this.post.id}`)
    },

    editPost() {
      console.log('edit post ')
      // this.setpostToEdit(this.post)
      // this.$router.push({ name: 'edit-post' })

      this.$router.push({
            name: 'edit-post',
            params: {
              postId: this.post.id,
            }
          })
    },

    async customFunction(index) {
      switch (index) {
        case 0:
          await likePost(this.postId)
          if (this.customLiked) {
            this.customLiked = false
            this.customPost.like_count--
            console.log(this.customLiked)
          } else {
            this.customLiked = true
            this.customPost.like_count++
          }
          break
        case 1:
          this.isCommenting = true
          this.showCommentBox = !this.showCommentBox
          console.log(this.postImages)
          break
        case 2:
          await sharePost(this.postId)
          this.openShareModal()
          // this.$emit('postFetch')
          break
        case 3:
          
          break
      }
    },

    async commentPost(text) {
      await commentPost(this.postId, text)
      this.commentData.text = ''
      this.isCommenting = false

      this.showCommentBox = !this.showCommentBox
      this.customPost.comment_count++
    },

    clickIcon(index) {
      this.iconLabels = this.iconLabels.map((item, i) => {
        if (i == index) {
          return { ...item, isActive: !item.isActive }
        }

        return item
      })
    },

    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.$emit('handleFileChange', file)
      }
    },

    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
      console.log(this.isMenuVisible)
    },

    calculateFlexBasis() {
      const numberOfImages = this.postImages.length - 1 // minus the first image
      const maxImagesToShow = 3
      if (numberOfImages > maxImagesToShow) {
        // If more than 3 images, each gets an equal share of space
        return `${100 / maxImagesToShow}%`
      }
      // If fewer than 3 images, they grow equally to fill the space
      return `${100 / numberOfImages}%`
    },

    handleImageUpload(file) {
      this.images = file.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }))
    }
  },

  components: {
    InteractionPostStatistics,
    UserPostInfo,
    IconWithLabel,
    PostDetails,
    ButtonUi,
    ImagePostGallery,
  },
  computed: {
    ...mapWritableState(usePostStore, ['showPostDetails']),

    slicedImages() {
      return this.postImages.slice(1).filter((image, index) => index < 3)
    }
  },

  props: {
    username: String,
    postDate: String,
    postTitle: String,
    postContent: String,
    userProfileImage: String,
    like_count: Number,
    comment_count: Number,
    postImages: Array,
    postId: Number,
    liked: Boolean,
    id: String,
    zoneName:String,
    showMenu: {
      type: Boolean,
      default: false
    },

    post: Object
  }
}
</script>

<style scoped>
.content {
  color: var(--body-normal, #242424);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: justify;
}

@media only screen and (max-width: 480px) {
  .content {
    font-size: 14px;
    line-height: 16px;
  }

  h5 {
    color: var(--primary-normal, #021d40);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  }
}

@media only screen and (max-width: 375px) {
  .content {
    font-size: 13px;
    line-height: 16px;
  }
}
</style>

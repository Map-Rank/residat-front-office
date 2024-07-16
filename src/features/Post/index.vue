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
      <div>
        <div v-if="!showMenu" class="flex items-center">
          <label
            @click="onClickFollow"
            class="flex items-center px-2 py-1 bg-white text-green-600 rounded-[8px] tracking-wide hover:text-white"
            :class="[this.post?.is_following ? ' ' : 'hover:bg-primary-light cursor-pointer']"
            style="min-width: max-content"
          >
            <img :src="iconSource" alt="" />
            <p class="ml-2 text-sm sm:text-base leading-normal">{{ labelText }}</p>
          </label>
        </div>
      </div>
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
            @clickButton="openModal()"
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
    <div class="px-5 mb-2 cursor-pointer">
      <p
        class="text-gray-700 text-start mt-1 content"
        :class="{ 'limited-text': !showFullDescription }"
        v-html="formattedPostContent"
      ></p>
      <p class="text-gray-700 text-start mt-1 content">
        <span
          v-if="shouldShowReadMore"
          @click="toggleReadMore"
          class="text-blue-700 cursor-pointer"
        >
          {{ showFullDescription ? 'Read less' : 'Read more' }}
        </span>
      </p>
    </div>

    <!-- Post Images -->

    <image-post-gallery :Images="postImages" @customFunction="showModal()"> </image-post-gallery>

    <!-- Post Interaction Area -->
    <footer class="px-5 pt-2">
      <!-- upper section  -->
      <InteractionPostStatistics
        :comment_count="customPost.comment_count"
        :like_count="like_count"
        :share_count="customPost.share_count"
        @showPostDetails="showModal()"
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
      <div
        v-if="showCommentBox"
        class="flex space-x-3 items-center justify-between mt-3 overflow-hidden w-full"
      >
        <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" />
        <div class="border p-2 rounded-lg flex-grow">
          <input
            v-model="commentData.text"
            type="search"
            placeholder="Search "
            class="bg-transparent w-full focus:border-none rounded-md outline-none hover:border-none transition-colors duration-200"
          />
        </div>
        <button
          @click.prevent="commentPost(this.commentData)"
          class="btn bg-secondary-normal text-white px-3 py-2 rounded-lg focus:outline-none"
            :disabled="this.isCommenting"
          :class="
            this.isCommenting
              ? 'bg-gray-400 cursor-wait disabled '
              : 'bg-secondary-normal hover:bg-secondary-hover'
          "
        >
          {{ $t('post') }}
        </button>
      </div>
    </footer>
  </article>

  <!-- <post-details v-if="showPostDetails"></post-details> -->
  <PostDetailModal v-if="isModalVisible" :postId="this.post.id" @close="closeModal" />
  <share-modal
    :showModal="this.showShareModal"
    :postLink="this.postLink"
    :message="this.messageShare"
    @close="this.closeShareModal"
  ></share-modal>

  <ConfirmationModal ref="confirmationModal" @confirm="deletePost()" />

</template>

<script>
import '../../assets/css/global.scss'
import IconWithLabel from '../../components/common/IconWithLabel/index.vue'
import { mapActions, mapWritableState } from 'pinia'
import usePostStore from './store/postStore'
import {
  commentPost,
  deletePost,
  likePost,
  sharePost,
  followUser
} from '../Post/services/postService'
import ButtonUi from '../../components/base/ButtonUi.vue'
import { useRoute } from 'vue-router'
import ImagePostGallery from '@/components/gallery/ImagePostGallery/index.vue'
import UserPostInfo from '@/features/Post/components/UserPostInfo/UserPostInfo.vue'
import InteractionPostStatistics from '@/features/Post/components/InteractionPostStatistics/InteractionPostStatistics.vue'
import { URL_LINK } from '@/constants/url.js'
import PostDetailModal from './components/PostDetailModal/PostDetailModal.vue'
import useModalStore from '@/stores/modalStore.js'
import ShareModal from '@/components/common/ShareModal/ShareModal.vue'
import { useToast } from 'vue-toastification'
import ConfirmationModal from '@/components/common/Modal/ConfirmationModal.vue';


export default {
  name: 'PostComponent',
  emits: ['postFetch', 'updatePost'],
  data() {
    const route = useRoute()
    const modalStore = useModalStore()
    const toast = useToast()

    return {
      route,
      modalStore,
      showShareModal: false,
      toast,
      postLink: '',
      messageShare: 'Check out this post!',
      iconSource: this.post?.is_following
        ? '/assets/icons/tick.svg'
        : '/assets/icons/add-circle-dark-outline.svg',
      labelText: this.post?.is_following ? this.$t('following') : this.$t('follow'),
      isFollowing: false,
      maxDescriptionLength: 100,
      showFullDescription: false,
      iconDesktopSize: 'w-6 h-6',
      iconMobileSize: 'w-5 h-5',
      isModalVisible: false,
      likeCount: this.like_count,
      customPost: this.post,
      customLike: this.liked,
      hasLikeouUnlike: false,
      isMenuVisible: false,
      imageHost: URL_LINK.imageHostLink,
      showCommentBox: false,
      isCommenting: false,
      commentData: {
        text: null,
        image: ' '
      },
      plusIcon: 'public\\assets\\icons\\add-circle-dark-outline.svg',
      iconLabels: [
        {
          svgContent: '\\assets\\icons\\heart-outline.svg',
          svgContentHover: '\\assets\\icons\\heart-fill.svg',
          labelText: this.$t('like'),
          isActive: this.liked,
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
          labelText: this.$t('share'),
          right: true
        }
      ]
    }
  },


  computed: {
    formattedPostContent() {
      return this.postContent.replace(/<p><\/p>/g, '<br>').replace(/\n/g, '<br>')
    },

    shouldShowReadMore() {
      return this.postContent.length > this.maxDescriptionLength
    },
    ...mapWritableState(usePostStore, ['showPostDetails']),
    slicedImages() {
      return this.postImages.slice(1).filter((image, index) => index < 3)
    }
  },

  methods: {
    openShareModal() {
      console.log('open modal')
      this.postLink = `https://www.residat.com/show-post/${this.post.id}`
      this.showShareModal = true
    },
    closeShareModal() {
      this.showShareModal = false
    },
    setMessageShare(message) {
      this.messageShare = message
    },

    toggleReadMore() {
      this.showFullDescription = !this.showFullDescription
    },

    ...mapActions(usePostStore, [
      'togglePostDetails',
      'setpostToShowDetails',
      'setpostToEdit',
      'showDetails',
      'setpostIdToShowDetails'
    ]),

    async onClickFollow() {
      if (this.post.is_following) {
        return
      }

      await followUser(this.post.creator[0].id)
      // Change showMenu status
      this.isFollowing = !this.isFollowing
      // Depending on the showMenu value, update icon source and text
      if (this.isFollowing) {
        this.iconSource = '/assets/icons/tick.svg'
        this.labelText = this.$t('following')
      } else {
        this.iconSource = '/assets/icons/add-circle-dark-outline.svg'
        this.labelText = this.$t('follow')
      }
    },
    closeModal() {
      this.isModalVisible = false
    },
    showModal() {
      this.isModalVisible = true
    },
    openModal() {
      this.$refs.confirmationModal.show();
    },

    async deletePost() {   
        try {
        await deletePost(this.postId)

        window.location.reload()
      } catch (error) {
        console.error('Error deleting post:', error)
      }
       
    },

    viewPost() {
      this.$router.push({ name: 'show-post', params: { id: this.post.id } })
    },

    editPost() {
      console.log('edit post ')
      // this.setpostToEdit(this.post)
      // this.$router.push({ name: 'edit-post' })

      this.$router.push({
        name: 'edit-post',
        params: {
          postId: this.post.id
        }
      })
    },

    async customFunction(index) {
      switch (index) {
        case 0:
          await likePost(this.postId)
          if (this.customLike) {
            this.customLike = false
            this.customPost.like_count--
            console.log(this.customLike)
          } else {
            this.customLike = true
            this.customPost.like_count++
          }
          break
        case 1:
          this.showCommentBox = !this.showCommentBox
          console.log(this.postImages)
          break
        case 2:
          this.openShareModal()
          await sharePost(this.postId)
          // this.$emit('postFetch')
          break
        case 3:
          break
      }
    },

    async commentPost(comment) {
      // await commentPost(this.postId, text)
      console.log('this is text' + comment);
      if (comment.text == null) {
        this.toast.info('Please insert a comment')
        return
      }
      
      this.isCommenting = true
      try {
        await commentPost(this.postId, comment)
        this.toast.success('Comment posted')
        this.showCommentBox = false
        this.commentData.text = null
        this.showCommentBox = !this.showCommentBox
        this.customPost.comment_count++
        this.isCommenting = false
      } catch (error) {
        console.error('Failed to post comment:', error)
        this.isCommenting = false
      } finally {
        this.isCommenting = false
      }
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
    ButtonUi,
    ImagePostGallery,
    PostDetailModal,
    ShareModal,
    ConfirmationModal
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
    zoneName: String,
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

.limited-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits the text to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

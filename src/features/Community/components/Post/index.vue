<template>
  <article class="bg-white rounded-lg overflow-hidden py-3 mx-2">
    <!-- Post Header with User Information -->
    <header class="flex justify-between px-5 mb-3">
      <div class="user-profile flex items-center space-x-2">
        <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" />
        <div>
          <h5 class="font-bold">{{ username }}</h5>
          <span class="caption-c1">{{ postDate }}</span>
        </div>
      </div>

      <div class="menu relative">
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
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >Not Intrested</a
          >
          <!-- ... other menu items ... -->
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <div class="px-5 mb-2">
      <h5 class="mb-1">{{ postTitle }}</h5>
      <p class="p3 content">{{ postContent }}</p>
    </div>

    <!-- Post Images -->
    <div class="grid grid-cols-2 sm:grid-cols-2 gap-0.5">
      <img
        v-for="(image, index) in postImages"
        :src="image.src"
        :alt="image.alt"
        :key="index"
        class="w-full h-auto"
      />
    </div>

    <!-- Post Interaction Area -->
    <footer class="p-5">
      <!-- upper section  -->
      <div class="flex justify-between border-b mb-2 pb-2">
        <div class="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
          >
            <path
              d="M7.38843 4.28963C5.69278 2.57693 2.94954 2.5686 1.26122 4.2739C-0.427101 5.9792 -0.418861 8.75004 1.27679 10.4627L7.55368 16.8028C7.81404 17.0657 8.23617 17.0657 8.49652 16.8028L14.7408 10.4994C16.4252 8.78856 16.4199 6.02549 14.7239 4.31249C13.0252 2.59671 10.2807 2.58838 8.58936 4.29673L7.99299 4.90026L7.38843 4.28963Z"
              fill="#505050"
            />
          </svg>
          <span class="caption-c1-bold"
            >{{ listLikers[1] }} and {{ listLikers.length }} other likes</span
          >
        </div>
        <span class="ml-4 caption-c1-bold">{{ comments.length }} Comments</span>
      </div>

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
          :key="index"
          class="flex-shrink-0"
        ></icon-with-label>
      </div>
    </footer>
  </article>
</template>

<script>
import '../../../../assets/css/global.scss'
import IconWithLabel from '../../../../components/common/IconWithLabel/index.vue'

export default {
  name: 'PostComponent',
  data() {
    return {
      iconDesktopSize: 'w-6 h-6',
      iconMobileSize: 'w-5 h-5',
      isMenuVisible: false,
      iconLabels: [
        {
          svgContent: 'src\\assets\\icons\\heart-outline.svg',
          svgContentHover: 'src\\assets\\icons\\heart-fill.svg',
          labelText: 'Like',
          right: true
        },
        {
          svgContent: 'src\\assets\\icons\\comment-outline.svg',
          svgContentHover: 'src\\assets\\icons\\comment-fill.svg',
          labelText: 'Comment',
          right: true
        },
        {
          svgContent: 'src\\assets\\icons\\archieved-outline.svg',
          svgContentHover: 'src\\assets\\icons\\archieved-fill.svg',
          labelText: 'Archieve',
          right: true
        },
        {
          svgContent: 'src\\assets\\icons\\share-fill.svg',
          svgContentHover: 'src\\assets\\icons\\share-fill.svg',
          labelText: 'Share',
          right: true
        }
      ]
    }
  },

  methods: {
    clickIcon(index) {
      this.iconLabels = this.iconLabels.map((item, i) => {
        if (i == index) {
          return { ...item, isActive: !item.isActive }
        }

        return item
      })
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
      console.log(this.isMenuVisible)
    }
  },

  components: {
    IconWithLabel
  },
  props: {
    username: String,
    postDate: String,
    postTitle: String,
    postContent: String,
    userProfileImage: String,
    listLikers: Array,
    comments: Array,
    postImages: Array
  }
}
</script>

<style scoped>
.caption-c1,
.caption-c1-bold {
  color: var(--primary-normal, #021d40);
  font-family: Raleway;
  font-size: 10px;
  font-style: normal;
  line-height: 16px; /* 160% */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.caption-c1-bold {
  font-weight: 600;
}

.p3,
.content {
  color: var(--body-normal, #242424);
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}

.content {
  font-weight: 500;
}
</style>

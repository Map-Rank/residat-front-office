<template>
  <article class="bg-white grid gap-3 rounded-lg overflow-hidden shadow-lg mb-4 py-3">
    <!-- Post Header with User Information -->
    <header class="flex justify-between px-5">
      <div class="user-profile flex items-center space-x-2">
        <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" />
        <div>
          <h5 class="font-bold">{{ username }}</h5>
          <span class="caption-c1">{{ postDate }}</span>
        </div>
      </div>

      <div class="menu">
        <button @click="toggleMenu" class="p-2 flex">
          <!-- Three dots icon -->
          <svg class="w-6 h-6" fill="true" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M5 12a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4z"
            />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-show="treu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
          <!-- ... other menu items ... -->
        </div>
      </div>
    </header>

    <!-- Post Content -->
    <div class="px-5">
      <h5 class="mb-1">{{ postTitle }}</h5>
      <p class="p3">{{ postContent }}</p>
    </div>

    <!-- Post Images -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
      <img
        v-for="(image, index) in postImages"
        :src="image.src"
        :alt="image.alt"
        :key="index"
        class="w-full h-auto"
      />
    </div>

    <!-- Post Interaction Area -->
    <footer class="grid p-5">
      <!-- upper section  -->
      <div class="flex justify-between">
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
      <hr />
      <!-- lower section  -->
      <div class="flex justify-between">


        <button class="text-blue-500">Like</button>
        <button class="text-blue-500">Comment</button>
        <button class="text-blue-500">Share</button>
      </div>
    </footer>
  </article>
</template>

<script>
import '../../assets/css/global.scss'
// import IconWithLabel from '../../components/IconWithLabel'

export default {
  name: 'PostComponent',
  components:{
    // IconWithLabel
  },
  props: {
    username: String,
    postDate: String,
    postTitle: String,
    postContent: String,
    userProfileImage: String,
    listLikers: Array,
    comments: Array,
    postImages: Array // Should be an array of objects with 'src' and 'alt' keys
  }
}
</script>

<style scoped>
hr {
  width: 560.001px;
  height: 0.2px;
  background: #6b6b6b;
}
.caption-c1 {
  color: #6b6b6b;
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.caption-c1-bold {
  color: var(--primary-normal, #021d40);
  font-family: Raleway;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 160% */
}
.p3 {
  color: var(--body-normal, #242424);
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

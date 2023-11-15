<template>
    <article class="bg-white rounded-lg overflow-hidden shadow-lg mb-4">
      <!-- Post Header with User Information -->
      <header class="flex items-center space-x-4 p-4 border-b">
        <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full"/>
        <div>
          <h3 class="font-bold">{{ username }}</h3>
          <time class="text-gray-600 text-sm">{{ postDate }}</time>
        </div>
      </header>
      
      <!-- Post Content -->
      <div class="p-4">
        <h2 class="font-bold text-xl mb-2">{{ postTitle }}</h2>
        <p>{{ postContent }}</p>
      </div>
      
      <!-- Post Images -->
      <!-- Post Images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
          <img v-for="(image, index) in postImages" :src="image.src" :alt="image.alt" :key="index" class="w-full h-auto"/>
      </div>
      
      
      <!-- Post Interaction Area -->
      <footer class="flex items-center justify-between p-4 bg-gray-100">
        <div>
          <span>National embassy and 214 others liked your post</span>
          <span class="ml-4">25 Comments</span>
        </div>
        <div class="space-x-2">
          <button class="text-blue-500">Like</button>
          <button class="text-blue-500">Comment</button>
          <button class="text-blue-500">Share</button>
        </div>
      </footer>
    </article>
  </template>
  
  <script>
  export default {
    name: 'PostComponent',
    props: {
      username: String,
      postDate: String,
      postTitle: String,
      postContent: String,
      userProfileImage: String,
      postImages: Array // Should be an array of objects with 'src' and 'alt' keys
    }
  }
  </script>
  
  <style>
  /* Additional styles if needed */
  </style>
  
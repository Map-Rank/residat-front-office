
<template>
    <div class="container mx-auto p-4 sm:grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Sidebar: Sectors and Topics -->
      <aside class="col-span-1 hidden sm:block">
        <!-- Sectors -->
        <div class="bg-gray-200 p-4 rounded-lg px-10 py-5">
          <h2 class="font-bold mb-4">Sectors</h2>
          <ul>
            <li v-for="sector in sectors" :key="sector">
              <label class="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{{ sector }}</span>
              </label>
            </li>
          </ul>
        </div>
      </aside>
      
      <!-- Main Content Area: Posts -->
      <main class="col-span-2 shadow-sm">
          <!-- Post -->
          <article class="bg-white p-4 rounded-lg shadow-md">
              <!-- Post Header -->
              <header class="mb-4">
                  <div class="flex items-center justify-between">
              <h3 class="font-bold text-lg">User-name</h3>
              <span class="text-sm text-gray-600">Posted: 20 October</span>
            </div>
   
            <h2 class="font-bold text-xl my-2">Heavy rains, landslide in Cameroon's west kill at least 34</h2>
          </header>
          <!-- Post Content -->
          <div>
            <p>Introduction UNICEF, the United Nations International Children's Emergency Fund, is a globally recognized organization dedicated to...</p>
            <!-- Post Images -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <img src="@\assets\images\Community\Post1.png" alt="Description of image 1" />
              <img src="@\assets\images\Community\Post1.png" alt="Description of image 2" />
              <!-- ... more images ... -->
            </div>
          </div>
          <!-- Post Interaction Area -->
          <footer class="flex items-center justify-between mt-4">
            <div>
              <span>National embassy and 214 others liked your post</span>
              <span>25 Comments</span>
            </div>
            <div>
              <button class="text-blue-500">Like</button>
              <button class="text-blue-500">Comment</button>
              <button class="text-blue-500">Share</button>
            </div>
          </footer>
        </article>
        <!-- ... other posts ... -->
      </main>


      <aside class="col-span-1  hidden sm:block ">
             
              <!-- Recommended Topics -->
              <div class="bg-gray-200 p-4 rounded-lg ">
                <h2 class="font-bold mb-4">Recommended topics</h2>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-blue-500 text-white px-2 py-1 rounded" v-for="topic in topics" :key="topic">
                    {{ topic }}
                  </span>
                </div>
              </div>
            </aside>



    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Community',
    
    data() {
      return {
        sectors: ['Agriculture', 'Infrastructure', 'Health', 'Socials'],
        topics: ['Agriculture', 'Economy', 'Environment', 'Education']
        // ... other data ...
      };
    }
  }
  </script>
  
  <style>
  /* Additional styles can be added here if needed */
  </style>
  
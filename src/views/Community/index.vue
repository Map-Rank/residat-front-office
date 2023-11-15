
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
          <div>
    <PostComponent
      username="User-name"
      postDate="Posted: 20 October"
      postTitle="Heavy rains, landslide in Cameroon's west kill at least 34"
      postContent="Introduction UNICEF, the United Nations International Children's Emergency Fund, is a globally recognized organization dedicated to..."
      userProfileImage="/path-to-user-profile.jpg"
      :postImages="[
        { src: '@\assets\images\Community\Post1.png', alt: 'Description of image 1' },
        { src: '@\assets\images\Community\Post1.png', alt: 'Description of image 2' }
      ]"
    />
  </div>
    
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

  import PostComponent from '../../components/Post/index.vue'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Community',
    
    data() {
      return {
        sectors: ['Agriculture', 'Infrastructure', 'Health', 'Socials'],
        topics: ['Agriculture', 'Economy', 'Environment', 'Education']
        // ... other data ...
      };
    },
    components:{
      PostComponent
    }
  }
  </script>
  
  <style>
  /* Additional styles can be added here if needed */
  </style>
  
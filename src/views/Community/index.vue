<template>
  <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Sidebar: Sectors and Topics -->
    <aside class="col-span-1 hidden sm:block">
      <!-- Sectors -->
      <sector
      :sectorArray="this.sectors"
      ></sector>
    </aside>

    <!-- Main Content Area: Posts -->
    <main class=" col-span-2 shadow-sm">
      <div>
        <PostComponent
          username="User-name"
          postDate="Posted: 20 October"
          postTitle="Heavy rains, landslide in Cameroon's west kill at least 34"
          postContent="Introduction UNICEF, the United Nations International Children's Emergency Fund, is a globally recognized organization dedicated to..."
          userProfileImage="https://th.bing.com/th/id/R.007eff93a66b6a7de41ee3e7ca553e92?rik=kiX%2fqnsUx6REXw&pid=ImgRaw&r=0"
          :listLikers="['national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy',]"
          :comments="['national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy','national embassy',]"  
          :postImages="[
            { src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain', alt: 'Description of image 1' },
            { src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain', alt: 'Description of image 2' },
            { src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain', alt: 'Description of image 2' },
            { src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain', alt: 'Description of image 2' },
          ]"
        />
      </div>
    </main>

    <aside class="col-span-1 hidden sm:block">
      <!-- Recommended Topics -->
      <div class="bg-gray-200 p-4 rounded-lg">
        <h2 class="font-bold mb-4">Recommended topics</h2>
        <div class="flex flex-wrap gap-2">
          <span
            class="bg-blue-500 text-white px-2 py-1 rounded"
            v-for="topic in topics"
            :key="topic"
          >
            {{ topic }}
          </span>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import PostComponent from '../../components/Post/index.vue'
import Sector from '../../components/Sector/index.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  data() {
    return {
      sectors: ['Agriculture', 'Infrastructure', 'Health', 'Socials'],
      topics: ['Agriculture', 'Economy', 'Environment', 'Education']
      // ... other data ...
    }
  },
  components: {
    PostComponent,
    Sector,
  }
}
</script>

<style>
/* Additional styles can be added here if needed */
</style>

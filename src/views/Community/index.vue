<template>
  <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10">
    <!-- Sidebar: Sectors and Topics -->
    <aside class="col-span-1 hidden sm:block">
      <!-- Sectors -->
      <sector-side
      :sectorArray="this.sectors"
      ></sector-side>
    </aside>

    <!-- Main Content Area: Posts -->
    <main class=" col-span-2 sm:px-4 ">
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
      <!-- <div class="bg-gray-200 p-4 rounded-lg">
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
      </div> -->

      <recently-posted-side
      :topics="this.topics"
      :recentPosts="recentPosts"
      ></recently-posted-side>
      
    </aside>
  </div>
</template>

<script>
import PostComponent from '../../components/Post/index.vue'
import SectorSide from '../../components/SectorSide/index.vue'
import RecentlyPostedSide from '../../components/RecentlyPostedSide/index.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  data() {
    return {
      sectors: ['Agriculture', 'Infrastructure', 'Health', 'Socials'],
      topics: ['Agriculture', 'Economy', 'Environment', 'Education'],
      recentPosts: [
    {
      author: 'Arpit Chandak',
      title: 'The Blog that make the difference in out commun',
      logoImg:
        'https://th.bing.com/th/id/R.22d59dd756c5ffe8f8109bf18e93cf61?rik=j%2bU%2f3h0s8BuFyg&pid=ImgRaw&r=0',
      postedDate: 'Posted: 1 days ago'
    },
    {
      author: 'Arpit Chandak',
      title: 'The Blog that make the difference in out commun',
      logoImg:
        'https://th.bing.com/th/id/OIP.PYfgkkj0Rba0QZdJfqgCWQHaG5?w=591&h=551&rs=1&pid=ImgDetMain',
      postedDate: 'Posted: 1 days ago'
    }
  ]
    }
  },
  components: {
    PostComponent,
    SectorSide,
    RecentlyPostedSide,
  }
}
</script>

<style>
/* Additional styles can be added here if needed */
</style>

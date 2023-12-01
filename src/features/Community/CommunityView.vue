<template>
  <div class="md:px-100 pb-5">
    <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10">
      <!-- Sidebar: Sectors and Topics -->
      <aside class="col-span-1 hidden sm:block">
        <!-- Sectors -->
        <sector-side :sectorArray="this.sectors"></sector-side>
      </aside>
  
      <!-- Main Content Area: Posts -->
      <main class="col-span-2 sm:px-4">
        <div class="space-y-5">
          <PostComponent
            v-for="(post, index) in posts"
            :key="index"
            :username="post.username"
            :postDate="post.postDate"
            :postTitle="post.postTitle"
            :postContent="post.postContent"
            :userProfileImage="post.userProfileImage"
            :listLikers="post.listLikers"
            :comments="post.comments"
            :postImages="post.postImages"
          />
        </div>
      </main>
  
      <aside class="col-span-1 hidden sm:block">
        <recently-posted-side :topics="this.topics" :recentPosts="recentPosts"></recently-posted-side>
      </aside>
    </div>
  </div>
</template>

<script>
import PostComponent from '../Post/index.vue'
import SectorSide from './components/SectorSide/index.vue'
import RecentlyPostedSide from './components/RecentlyPostedSide/index.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  data() {
    return {
      sectors: ['Agriculture', 'Infrastructure', 'Health', 'Socials'],
      topics: ['Agriculture', 'Economy', 'Environment', 'Education'],
      posts: [
        {
          username: 'User-name',
          postDate: 'Posted: 20 October',
          postTitle: "Heavy rains, landslide in Cameroon's west kill at least 34",
          postContent:
            "Introduction UNICEF, the United Nations International Children's Emergency Fund, is a globally recognized organization dedicated to...",
          userProfileImage:
            'https://th.bing.com/th/id/R.007eff93a66b6a7de41ee3e7ca553e92?rik=kiX%2fqnsUx6REXw&pid=ImgRaw&r=0',
          listLikers: Array(22).fill('national embassy'),
          comments: Array(22).fill('national embassy'),
          postImages: [
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 1'
            },
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 2'
            },
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 3'
            },
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 4'
            }
          ]
        },
        {
          username: 'User-name',
          postDate: 'Posted: 20 October',
          postTitle: "Heavy rains, landslide in Cameroon's west kill at least 34",
          postContent:
            "Introduction UNICEF, the United Nations International Children's Emergency Fund, is a globally recognized organization dedicated to...",
          userProfileImage:
            'https://th.bing.com/th/id/R.007eff93a66b6a7de41ee3e7ca553e92?rik=kiX%2fqnsUx6REXw&pid=ImgRaw&r=0',
          listLikers: Array(22).fill('national embassy'),
          comments: Array(22).fill('national embassy'),
          postImages: [
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 1'
            },
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 2'
            },
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 3'
            },
            {
              src: 'https://th.bing.com/th/id/OIP.bxjnCc07ZANhF94zX2MjyQHaE6?rs=1&pid=ImgDetMain',
              alt: 'Description of image 4'
            }
          ]
        }
        // ... more post data
      ],
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
    RecentlyPostedSide
  }
}
</script>

<style>
/* Additional styles can be added here if needed */
</style>

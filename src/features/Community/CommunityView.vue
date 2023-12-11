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
        <recently-posted-side
          :topics="this.topics"
          :recentPosts="recentPosts"
        ></recently-posted-side>
      </aside>
    </div>
  </div>
</template>

<script>
import PostComponent from '../Post/index.vue'
import SectorSide from './components/SectorSide/index.vue'
import RecentlyPostedSide from './components/RecentlyPostedSide/index.vue'
import {getPosts} from '@/features/Post/services/postService.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Community',

  async created() {
    try {
      this.posts = await getPosts();
      console.log('completly fetch all post ')
    } catch (error) {
      console.error('Failed to load posts:', error);
      // Handle the error, e.g., show an error message
    }
  },

  data() {
    return {
      sectors: [
        {
          name: 'agriculture',
          label: 'Agriculture',
          checked: false,
          value: 'Agriculture',
          required: true
        },
        {
          name: 'agriculture',
          label: 'Agriculture',
          checked: false,
          value: 'Agriculture',
          required: true
        },
        {
          name: 'education',
          label: 'Education',
          checked: false,
          value: 'Education',
          required: true
        },
        { name: 'socials', label: 'Socials', checked: false, value: 'Socials', required: true }
        // Add more sectors as needed
      ],
      topics: ['Agriculture', 'Economy', 'Environment', 'Education'],
      posts: [
      {
            id: 12,
            text: null,
            images: [],
            creator: {
                id: 2,
                first_name: "Konno",
                last_name: "Desire",
                code: null,
                email: "admin@gmail.com",
                phone: "690160047",
                address: null,
                avatar: null,
                date_of_birth: "2023-12-11",
                gender: "male",
                zone_id: 1,
                role: [
                    {
                        id: 2,
                        name: "default",
                        guard_name: "web",
                        created_at: "2023-12-11T06:57:09.000000Z",
                        updated_at: "2023-12-11T06:57:09.000000Z",
                        pivot: {
                            model_type: "App\\Models\\User",
                            model_id: 2,
                            role_id: 2
                        }
                    }
                ],
                active: 1,
                verified: 0,
                activated_at: "2023-12-11 08:50:56",
                email_verified_at: "2023-12-11T08:50:29.000000Z",
                created_at: "2023-12-11T07:47:14.000000Z",
                updated_at: "2023-12-11T07:47:14.000000Z"
            },
            like_count: 0,
            comment_count: 0,
            share_count: 0,
            published_at: "2023-12-11 00:00:00",
            created_at: "2023-12-11T09:39:45.000000Z"
        },
       
        
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

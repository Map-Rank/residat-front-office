<template>
  <div class="h-full">
    <div class="bg-white p-6">
      <!-- <top-profile-info
        :profileImageUrl="'public\\images\\unicef.png'"
        profileName="Unicef International"
        :followersCount="500"
        :postsCount="34"
        :isCurrentUser="true"
      /> -->
      <top-profile-info
        :profileImageUrl=" 'public\\images\\unicef.png'"
        :profileName="`${user.first_name} ${user.last_name}`"
        :followersCount="500" 
        :postsCount="posts.length"
        :isCurrentUser="true"
      />
    </div>

    <div class="md:px-100 pb-5">
      <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4">
        <aside class="col-span-1 mb-2 sm:block">

          <about-user-info
            :username="`${user.first_name} ${user.last_name}`"
            :description="'Your description here'" 
            :location="'From ' + user.address" 
            :phone="user.phone"
            :email="user.email"
            :joinDate="formatDate(user.created_at)"
            :website="'your-website-url.com'"
          />
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

        <aside class="col-span-1 hidden sm:block"></aside>
      </div>
    </div>
  </div>
</template>

<script>
import AboutUserInfo from './components/AboutUserInfo/index.vue'
import TopProfileInfo from './components/TopProfileInfo/index.vue'
import PostComponent from '../Post/index.vue'
import useAuthStore from '@/stores/auth'
import { mapState } from 'pinia'
export default {
  name: 'SocialProfile',

  data() {
    return {
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
      ]
    }
  },

computed:{
  ...mapState(useAuthStore,['user'])
},



  components: {
    PostComponent,
    AboutUserInfo,
    TopProfileInfo
  },



 
  created() {
    // This lifecycle hook is where you would fetch your post data
    this.fetchPosts()
    console.log(this.user)
  },
  methods: {
    fetchPosts() {
      // Logic to fetch posts from a store or API
      // For example, using a Vuex action:
      // this.$store.dispatch('fetchPosts');
    },
    formatDate(date) {
      // Simple date formatting, adjust as needed
      return new Date(date).toLocaleDateString();
    },
  }
}
</script>

<style scoped></style>

<template>
  <div class="h-full">
    <div class="bg-white p-6">
        <top-profile-info
  :profileImageUrl="'public\\images\\unicef.png'"
  profileName="Unicef International"
  :followersCount="500"
  :postsCount="34"
  :isCurrentUser="true"
/>

    </div>

    <div class="md:px-100 pb-5">
      <div class="container  mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4">
        <!-- Sidebar: Sectors and Topics -->
        <aside class="col-span-1   mb-2 sm:block">
          <about-user-info
            username="Unicef International"
            description="The UN, through the United Nations Children's Fund UNICEF and specialized agencies such as the World Health Organization WHO."
            location="From Yaounde, Cameroon"
            phone="+320 236 259 6361"
            email="unicef@gmail.org"
            joinDate="10-03-2023"
            website="unicef.org"
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

        <aside class="col-span-1 hidden sm:block">
        
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import AboutUserInfo from './components/AboutUserInfo/index.vue'
import TopProfileInfo from './components/TopProfileInfo/index.vue'
import PostComponent from '../Post/index.vue'
export default {
  name: 'SocialProfile',

  components: {
    PostComponent,
    AboutUserInfo,
    TopProfileInfo
  },

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
  created() {
    // This lifecycle hook is where you would fetch your post data
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      // Logic to fetch posts from a store or API
      // For example, using a Vuex action:
      // this.$store.dispatch('fetchPosts');
    },
  },

}
</script>

<style scoped>

</style>

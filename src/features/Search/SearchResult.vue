<template>
  <div>
    <!-- Category Filter Buttons -->
    <div class="flex space-x-2 mb-4">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          'px-4 py-2 rounded',
          currentCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
        ]"
        @click="filterPosts(category)"
      >
        {{ category }}
      </button>
    </div>

    <!-- Posts Container -->
    <div class="space-y-4">
      <div v-for="post in filteredPosts" :key="post.id" class="p-4 border rounded shadow-sm">
        <!-- Post Content -->
        <div class="mb-2">
          <div class="font-bold">{{ post.title }}</div>
          <div class="text-sm">{{ post.content }}</div>
        </div>
        <!-- Post Meta -->
        <div class="text-xs text-gray-600">Posted by {{ post.user }} on {{ post.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: { idType: String, id: String },
  data() {
    return {
      currentCategory: 'All',
      categories: [
        'All',
        'Posts',
        'People',
        'Companies',
        'Jobs',
        'Groups',
        'Products',
        'Services',
        'Events',
        'Courses',
        'Schools'
      ],
      posts: [
        {
          id: 1,
          title: 'Lorem Ipsum Dolor Sit Amet',
          content:
            'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          user: 'JohnDoe92',
          date: 'April 5, 2023'
        },
        {
          id: 2,
          title: 'Sed Ut Perspiciatis',
          content: 'Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          user: 'JaneSmith88',
          date: 'April 6, 2023'
        },
        {
          id: 3,
          title: 'At Vero Eos Et Accusamus',
          content:
            'Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
          user: 'EmmaJones33',
          date: 'April 7, 2023'
        }
        // ... more posts
      ],

      filteredPosts: []
    }
  },
  created() {
    this.filteredPosts = this.posts // Initially show all posts
  },
  methods: {
    filterPosts(category) {
      this.currentCategory = category

      if (category === 'All') {
        this.filteredPosts = this.posts
      } else {
        // Logic to filter posts based on category
        // For example, this might involve making an API call to fetch posts for the selected category
        this.filteredPosts = this.posts.filter((post) => post.category === category)
      }
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>

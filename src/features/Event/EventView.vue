<template>
  <div class="container mx-auto p-6">
    <div class="grid md:grid-cols-3 gap-4">
      <!-- Main content -->
      <div class="md:col-span-2">
        <div
          v-for="event in events"
          :key="event.id"
          class="mb-4 p-4 bg-white rounded shadow cursor-pointer"
        >
          <router-link to="/event-page" class="grid sm:flex mb-2">
            <img :src="event.image" class="w-full h-[100px] sm:w-[200px] mr-4" alt="event image" />
            <div>
              <h2 class="text-xl text-start font-semibold">{{ event.title }}</h2>
              <div>
                <h5 class="font-[575] cursor-pointer hover:underline" @click="viewProfileUser">{{ username }}</h5>
                <div class="flex items-center ">
    
                  <img src="\assets\icons\location.png" class="h-4 mr-1" alt="" srcset="">
                <h5 class="zoneName" >{{ event.location }}, </h5>
                <p style="font-weight: 400; margin: 0 1px;"></p>
                <span class="">Date : {{ event.published_at }}</span>
                
                </div>
                </div>
              <p class="text-gray-700 text-start">{{ event.description }}</p>
            </div>
          </router-link>
          <div class="flex justify-end">
            <router-link to="/event-page" class="text-blue-600 hover:underline text-sm text-end"
              >Read More</router-link
            >
          </div>
        </div>
      </div>

      <!-- Sidebar widgets -->
      <div>
        <!-- Popular posts -->
        <div class="mb-4 p-4 bg-white rounded shadow">
          <h3 class="font-semibold mb-2">POPULAR EVENT</h3>
          <!-- Dynamic list of posts -->
          <div v-for="post in popularPosts" :key="post.id" class="mb-2">
            <h4 class="text-sm font-semibold">{{ post.title }}</h4>
            <p class="text-gray-600 text-xs">{{ post.excerpt }}</p>
          </div>
        </div>

        <!-- Other widgets here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventView',
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'Minister of Finance',
          description:
            'Responsible for formulating and implementing the financial and economic policies of the country. The Minister of Finance oversees the budget, taxation, public debt, and monetary policy. They work on strategies to promote economic growth, maintain fiscal stability, and ensure sustainable development.',
          location: 'Yaounde',
          organized_by: 'asdas',
          user_id: 1,
          published_at: '2024-04-01 13:51:21',
          image: 'storage/media/events//media_7660aadc91c77e.jpeg',
          is_valid: 0,
          created_at: '2024-04-01T12:51:21.000000Z',
          updated_at: '2024-04-01T12:51:21.000000Z'
        },
        {
          id: 1,
          title: 'Minister of Finance',
          description:
            'Responsible for formulating and implementing the financial and economic policies of the country. The Minister of Finance oversees the budget, taxation, public debt, and monetary policy. They work on strategies to promote economic growth, maintain fiscal stability, and ensure sustainable development.',
          location: null,
          organized_by: 'asdas',
          user_id: 1,
          published_at: '2024-04-01 13:51:21',
          image: 'storage/media/events//media_7660aadc91c77e.jpeg',
          is_valid: 0,
          created_at: '2024-04-01T12:51:21.000000Z',
          updated_at: '2024-04-01T12:51:21.000000Z'
        },
        {
          id: 1,
          title: 'Minister of Finance',
          description:
            'Responsible for formulating and implementing the financial and economic policies of the country. The Minister of Finance oversees the budget, taxation, public debt, and monetary policy. They work on strategies to promote economic growth, maintain fiscal stability, and ensure sustainable development.',
          location: null,
          organized_by: 'asdas',
          user_id: 1,
          published_at: '2024-04-01 13:51:21',
          image: 'storage/media/events//media_7660aadc91c77e.jpeg',
          is_valid: 0,
          created_at: '2024-04-01T12:51:21.000000Z',
          updated_at: '2024-04-01T12:51:21.000000Z'
        },
  
      ],
      popularPosts: [
        {
          id: 1,
          title: 'Lorem Ipsum',
          excerpt: 'UPCOMMING EVENT'
        },
        {
          id: 2,
          title: 'Template images',
          excerpt: '3 Images in this template!'
        }
        // ...more posts
      ]
      // ...other data
    }
  },
  created() {
    this.fetcheventById()
  },
  methods: {
    fetcheventById() {}
  }
}
</script>

<style>
.zoneName{
  font-size: 13px;
  color: gray;
  font-weight: 400;
}
/* Tailwind CSS will take care of most of the styling, but you can add custom styles if necessary */
</style>

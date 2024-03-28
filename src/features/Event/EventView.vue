<template>
    <div class="container mx-auto p-6">
      <div class="grid md:grid-cols-3 gap-4">
        <!-- Main content -->
        <div class="md:col-span-2">
            <div v-for="sector in sectors" :key="sector.id" class="mb-4 p-4 bg-white rounded shadow cursor-pointer">
                <router-link to="/sector-page" class="grid sm:flex mb-2">
                  <img :src="sector.image" class="w-full h-[100px] sm:w-[200px] mr-4" alt="Sector image">
                  <div>
                    <h2 class="text-xl text-start font-semibold">{{ sector.title }}</h2>
                    <p class="text-gray-700 text-start">{{ sector.description }}</p>
                  </div>
                </router-link>
                <div class="flex justify-end">
                  <router-link to="/sector-page"  class="text-blue-600 hover:underline text-sm text-end">Read More</router-link>
                </div>
              </div>
        </div>
  
        <!-- Sidebar widgets -->
        <div>
          <!-- Popular posts -->
          <div class="mb-4 p-4 bg-white rounded shadow">
            <h3 class="font-semibold mb-2">POPULAR POSTS</h3>
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
        sectors: [
            {
    id: 1,
    title: 'Minister of Finance',
    description: 'Responsible for formulating and implementing the financial and economic policies of the country. The Minister of Finance oversees the budget, taxation, public debt, and monetary policy. They work on strategies to promote economic growth, maintain fiscal stability, and ensure sustainable development.',
    image: '\\assets\\images\\about.png',
  },
  {
    id: 2,
    title: 'Minister of Health',
    description: 'The Minister of Health is responsible for overseeing the healthcare system, developing health policies, and addressing public health issues in the country. They work to improve access to quality healthcare, ensure the safety of food and water supplies, and promote disease prevention and control. Additionally, they collaborate with various health organizations and agencies to enhance the overall well-being of the population.',
    image: '\\assets\\images\\about.png',
  },
  {
    id: 3,
    title: 'Minister of Education',
    description: 'The Minister of Education holds the responsibility of managing and improving the national education system. This includes developing curriculum standards, enhancing educational infrastructure, and promoting equal access to quality education. They also focus on teacher training, student support services, and educational innovation to ensure that every citizen has the opportunity to receive a comprehensive education.',
    image: '\\assets\\images\\about.png',
  },
        ],
        popularPosts: [
          {
            id: 1,
            title: 'Lorem Ipsum',
            excerpt: 'Download this and more...',
          },
          {
            id: 2,
            title: 'Template images',
            excerpt: '3 Images in this template!',
          },
          // ...more posts
        ],
        // ...other data
      };
    },
    created() {
    this.fetchSectorById();
  },
  methods: {
    fetchSectorById() {

    },
  }}
  </script>
  
  <style>
  /* Tailwind CSS will take care of most of the styling, but you can add custom styles if necessary */
  </style>
  
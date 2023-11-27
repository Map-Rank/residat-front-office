<template>
    <div class="container  mx-auto p-6 ">
        <div class="mb-4 mx-auto p-6 bg-white rounded-lg shadow">
          <div class="grid mb-5">
            <label class="inline-block mb-2">Sector</label>
            <span>Select your sector of interest</span>
          </div>
          <div class="grid grid-cols-3 gap-7 content-between">
            <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
              <vee-field
                :name="sector.name"
                type="checkbox"
                :id="sector.name"
                class="rounded text-primary-normal focus:ring-primary-light"
              />
              <label :for="sector.name" class="ml-2 block text-sm text-body-dark">
                {{ sector.label }}
              </label>
            </div>
          </div>
        </div>


        <div class=" mx-auto p-6 bg-white rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Create a New Post</h2>
            <form @submit.prevent="submitPost">
              <div class="mb-4">
                <textarea
                  v-model="postContent"
                  placeholder="What's on your mind?"
                  class="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-normal"
                  rows="4"
                ></textarea>
              </div>
              <div class="mb-4">
                <label class="block mb-2">Attach images (optional):</label>
                <input type="file" @change="handleImageUpload" multiple class="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-primary-normal file:text-white hover:file:bg-primary-hover" />
              </div>
              <button
                type="submit"
                class="px-6 py-2 bg-primary-normal text-white rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-dark"
              >
                Post
              </button>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'CreatePost',
    data() {
      return {
        postContent: '',
        images: [],
        schema: {
        name: 'required|min:3|max:50',
        first_name: 'required|min:3|max:50',
        second_name: 'required|min:3|max:50',
        company_name: 'min:3|max:50',
        location: 'required|max:50',
        telephone: 'required|min:3|max:12',
        email: 'required|email',
        age: 'required|min_value:18,max_value:100',
        password: 'required',
        confirm_password: 'required|passwords_mismatch:@password',
        country: 'required|country_excluded:USA',
        tos: 'required|tos'
      },
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
      };
    },
    methods: {
      submitPost() {
        // Here you would handle the submission of the post content and the images
        // This is where you would integrate with your backend service or state management
        console.log('Post content:', this.postContent);
        console.log('Attached images:', this.images);
        // Clear the form
        this.postContent = '';
        this.images = [];
        // Show a success message or handle errors
      },
      handleImageUpload(event) {
        const files = Array.from(event.target.files);
        this.images = files.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        }));
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  .container{
    height: 100vh;
  }
  </style>
  
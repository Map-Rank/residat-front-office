<template>
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
      v-if="showModal"
    >
      <div class="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h3 class="text-lg font-bold mb-4">Share this Post</h3>
        
        <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
          <p class="truncate">{{ postLink }}</p>
          <button
            class="copy-link-button bg-secondary-normal hover:bg-secondary-hover text-white px-2 py-1 rounded "
            @click="copyToClipboard"
          >
            Copy Link
          </button>
        </div>

        <div class="flex justify-center my-4"> 

            <h4 >Share on social platform</h4>
        </div>
  
        <div class="flex justify-around mt-4">
          <!-- Icons for social media -->
          <a :href="`https://twitter.com/intent/tweet?url=${encodedPostLink}&text=${encodedMessage}`" target="_blank">
            <img src="\assets\icons\colored\twitterx.svg" alt="Twitter" class="h-8 w-8" />
          </a>
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodedPostLink}`" target="_blank">
            <img src="\assets\icons\colored\facebook.svg" alt="Facebook" class="h-8 w-8" />
          </a>
          <a :href="`https://wa.me/?text=${encodedPostLink}`" target="_blank">
            <img src="/assets/icons/colored/whatsapp.svg" alt="WhatsApp" class="h-10 w-10" />
          </a>
          
          <!-- Add more social media icons here -->
        </div>
  
        <button class=" close-modal-button mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {

    
    name:'ShareModal',
    props: {
      showModal: Boolean,
      postLink: String,
      message: String,
    },
    computed: {
      encodedPostLink() {
        return encodeURIComponent(this.postLink);
      },
      encodedMessage() {
        return encodeURIComponent(this.message);
      },
    },
    methods: {
      copyToClipboard() {
        navigator.clipboard.writeText(this.postLink).then(
          () => {
            alert('Link copied to clipboard');
          },
          (err) => {
            console.error('Could not copy text: ', err);
          }
        );
      },
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for modal here */
  </style>
  
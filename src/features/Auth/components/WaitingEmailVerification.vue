<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-3/2 bg-white shadow-lg rounded-lg p-5">
      <div class="text-center">
        <img
          src="/assets/images/Pages/Two factor authentication.svg"
          alt="Mail Icon"
          class="mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Email Verification</h2>
        <p class="text-gray-600 mb-4">Waiting redirection</p>

        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'
export default {
  name: 'WaitingEmailVerification',
  data() {
    return {
      id: null,
      hash: null,
      error: null,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.hash = this.$route.params.hash;
    // Initiate verification request
    this.verify();
  },
  methods: {
    // Verify email
    verify() {
      const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
      console.log(authToken)
      const base = import.meta.env.VITE_API_BASE_URL
      // Disable button to prevent multiple requests
      // this.$refs.verifyButton.disabled = true;

      // Make API request using VITE_API_BASE_URL
      const url = `${base}verify-email/${this.id}/${this.hash}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${authToken}`
        },
      };

      fetch(url, options)
        .then((response) => {
          console.log(response);
          // Check response status
          if (response.status === 200) {
            // Verification successful
            this.success();
          } else {
            // Verification failed
            this.error = response.data;
          }
        })
        .catch((error) => {
          // Handle error
          this.error = error;
        })
        .finally(() => {
          // Enable button again
          // this.$refs.verifyButton.disabled = false;
        });
    },

    // Redirect to success page
    success() {
      this.authStore.isloggedIn = true
      this.$router.push({ name: 'community' })
    },
  },
};
</script>
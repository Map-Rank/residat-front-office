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
          <p class="text-gray-600 mb-4">Open your Email in other to get your verification link</p>
  
          <div class="mb-4"></div>
          <div>
            <p class="text-gray-600">Resend Verification link</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WaitingEmailVerification',
    data() {
      return {}
    },
    components: {},
  
    methods: {}
  }
  </script>
  
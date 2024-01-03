<template>
    <div class="flex justify-center items-center h-screen bg-gray-100 ">
      <div class=" w-1/2 bg-white shadow-lg  rounded-lg p-5">
        <div class="text-center">
          <img src="/assets/images/Pages/Two factor authentication.svg" alt="Mail Icon" class="mx-auto mb-4" />
          <h2 class="text-xl font-semibold mb-2">OTP Verification</h2>
          <p class="text-gray-600 mb-4">
            One Time Password (OTP) has been sent via Email to <span class="text-blue-500">rebeccajohn@gmail.com</span>.
          </p>
          <div class="flex justify-center gap-2 mb-4">
            <input
              class="form-input w-10 h-10 text-center rounded border"
              type="text"
              maxlength="1"
              ref="otp1"
              v-model="otp[0]"
              @input="focusNext('otp1', 'otp2')"
            />
            <input
              class="form-input w-10 h-10 text-center rounded border"
              type="text"
              maxlength="1"
              ref="otp2"
              v-model="otp[1]"
              @input="focusNext('otp2', 'otp3')"
            />
            <input
              class="form-input w-10 h-10 text-center rounded border"
              type="text"
              maxlength="1"
              ref="otp2"
              v-model="otp[1]"
              @input="focusNext('otp2', 'otp3')"
            />
            <input
              class="form-input w-10 h-10 text-center rounded border"
              type="text"
              maxlength="1"
              ref="otp2"
              v-model="otp[1]"
              @input="focusNext('otp2', 'otp3')"
            />
            <!-- ... continue with other inputs -->
          </div>
          <div class="mb-4">
            <button @click="verifyOtp" class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors">
              Verify OTP
            </button>
          </div>
          <div>
            <p class="text-gray-600">Resend OTP in: <span class="font-semibold" v-text="time"></span></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'OTP',
    data() {
      return {
        counter: 30,
        otp: ['', '', '', '', ''],
      };
    },
    computed: {
      time() {
        const minutes = Math.floor(this.counter / 60);
        const seconds = this.counter % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      },
    },
    methods: {
      verifyOtp() {
        // Add your OTP verification logic here
      },
      focusNext(refCurrent, refNext) {
      if (this.$refs[refCurrent].value.length === 1) {
        this.$refs[refNext].focus();
      }
    },
      countdown() {
        if (this.counter > 0) {
          setTimeout(() => {
            this.counter -= 1;
            this.countdown();
          }, 1000);
        }
      },
    },
    mounted() {
      this.countdown();
    },
  };
  </script>
  
  <style scoped>
  /* Optionally add custom styles here */
  </style>
  
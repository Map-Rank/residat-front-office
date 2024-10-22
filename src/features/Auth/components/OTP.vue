<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-3/2 bg-white shadow-lg rounded-lg p-5">
      <div class="text-center">
        <img
          src="/assets/images/Pages/Two factor authentication.svg"
          alt="Mail Icon"
          class="mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">OTP Verification</h2>
        <p class="text-gray-600 mb-4">
          One Time Password (OTP) has been sent via Email to
          <span class="text-blue-500">rebeccajohn@gmail.com</span>.
        </p>
        <div

          class="flex justify-center gap-2 mb-4">

          <input
            v-for="(input, index) in otp"
            :key="index"
            class="form-input w-10 h-10 text-center rounded border"
            type="text"
            maxlength="1"
            :ref="'otp' + index"
            v-model="otp[index]"
            @input="focusNext(index)"
          />

          <!-- <base-o-t-p-input
          :otp="otp" :on-focus-next="focusNext"
          ></base-o-t-p-input> -->
        </div>
        <div class="mb-4">
          <ButtonUi
          :color="'bg-secondary-normal'"
          :is-rounded-md="true"
          :custom-css="'justify-center'"
          :text-css="'font-bold text-white '"
          @@clickButton="verifyOtp"
          :label="'Verifi OTP'" />


        </div>
        <div>
          <p class="text-gray-600">
            Resend OTP in: <span class="font-semibold" v-text="time"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonUi from '../../../components/base/ButtonUi.vue'
// import BaseOTPInput from '../../../components/base/BaseOTPInput.vue' //TODO component to be adapted
export default {
  name: 'OTP',
  data() {
    return {
      counter: 30,
      otp: ['', '', '', '', ''],
      interval: null
    }
  },
  components: {
    ButtonUi,
    // BaseOTPInput //TODO component to be adapted
  },
  computed: {
    time() {
      const minutes = Math.floor(this.counter / 60)
      const seconds = this.counter % 60
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  },
  methods: {
    verifyOtp() {
      // Add your OTP verification logic here
      console.log('verifie')
    },
    focusNext(index) {
      if (this.otp[index].length === 1 && index < this.otp.length - 1) {
        this.$refs['otp' + (index + 1)][0].focus()
      }
    },

    // focusNext(index, event) { //TODO component to be adapted
    //   if (this.otp[index].length === 1 && index < this.otp.length - 1) {
    //     this.$refs['otp' + (index + 1)][0].focus();
    //   }},
    countdown() {
      this.interval = setInterval(() => {
        if (this.counter > 0) {
          this.counter -= 1
        } else {
          clearInterval(this.interval)
        }
      }, 1000)
    }
  },
  mounted() {
    this.countdown()
  },
  unmounted() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
/* Optionally add custom styles here */
</style>

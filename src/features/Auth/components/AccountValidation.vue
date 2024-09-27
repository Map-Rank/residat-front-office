<script>
import { ref } from 'vue'
// import profile from './public/assets/images/Group.png'
export default {
  setup() {
    let loaderbar = ref('0%')

    return {
      loaderbar
      // profile
    }
  },

  mounted() {
    let count = 0
    const interval = setInterval(() => {
      count += 1
      this.loaderbar = `${(count / 12) * 100}%`
      if (count >= 12) {
        clearInterval(interval)
        this.goHome()
      }
    }, 1000)
  },

  methods: {
    goHome() {
      this.$router.push('/authentication')
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-screen contain">
    <div class="w-[50%] bg-white rounded-md">
      <div
        class="relative top-0 left-0 h-[5px] bg-secondary-normal rounded-md"
        :style="{ width: loaderbar }"
      ></div>

      <div class="flex justify-center items-center p-9">
        <div class="flex flex-col justify-center items-center mt-14">
          <img src="/assets/images/Group.png" alt="" class="" />
          <div class="text-center mt-20">
            <h1 class="font-bold text-2xl mb-4">Account Validation Pending !</h1>
            <div class="flex justify-center">
              <p class="w-[60%]">
                Thank you for signing up! Your account validation is currently in progress.We’ll
                notify you as soon as the process is complete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

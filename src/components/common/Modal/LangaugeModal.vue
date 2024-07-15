<template>
  <div class="fixed inset-0 z-30 flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0" v-if="showModal">
    <!-- Background overlay -->
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <!-- Modal panel, centered with margin from the viewport's top -->
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">Change Site Language</h3>
        <div class="mt-3">
          <div class="flex items-center">
            <input class="mr-3" type="radio" id="english" value="en" v-model="lang">
            <label for="english">English</label>
          </div>
          <div class="flex items-center mt-2">
            <input class="mr-3" type="radio" id="french" value="fr" v-model="lang">
            <label for="french">French</label>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button class="inline-flex justify-center w-full py-2 px-4 text-base font-medium text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none sm:text-sm" @click="saveLanguage">Save</button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button class="inline-flex justify-center w-full py-2 px-4 text-base font-medium text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none sm:text-sm" @click="goBack">Close</button>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'

export default {
    name:'LangaugeModal',
  data() {
    return {
      showModal: true,
      lang: 'en'
    }
  },
  methods: {
    goBack() {
    //   this.showModal = !this.showModal
    this.$router.go(-1)
    
},

    saveLanguage() {
      console.log(this.lang);
      localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, this.lang)
      this.goBack()
      window.location.reload()
      // this.changeLanguage(this.lang)
      // this.goBack()
    },
    changeLanguage(lang) {
      this.lang = lang
    }
  }
}
</script>

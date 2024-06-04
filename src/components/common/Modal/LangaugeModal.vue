<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" v-if="showModal">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal Content -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">Change Site Language</h3>
          
          <!-- Checkbox Items -->
          <div class="">
            <div class="flex  items-center ">

                <input class="mr-3" type="radio" id="english" value="English" v-model="lang">
                <label for="english">English</label><br>
            </div>
            <div class="flex  items-center ">
                <input class="mr-3" type="radio" id="french" value="French"  v-model="lang">
                <label for="french">French</label><br>
            </div>

         
          </div>

        </div>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none" @click="saveLanguage">Save</button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none" @click="goBack">Close</button>
          </span>
        </div>
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
changeToEnglish() {
      this.lang = 'en'
    },
    changeToFrench() {
      this.lang = 'fr'
    },
    saveLanguage() {
        this.goBack()
        this.changeLanguage(this.lang)
    },
    changeLanguage(lang) {
      this.lang = lang
      localStorage.setItem(LOCAL_STORAGE_KEYS.appLanguage, lang)
      this.goBack()
      window.location.reload()
    }
  }
}
</script>

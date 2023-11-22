<template>
    <div>
      <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
        <!-- //the backgroup shadow effect -->
          <div class="back fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
          </div>
  
          <!-- This element is to trick the browser into centering the modal contents. -->
          <!-- <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span> -->
  
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform  w-1/2 transition-all sm:my-8 sm:align-middle sm:w-1/2 sm:w-full"
          >
            <!-- Add margin if you want to see some of the overlay behind the modal-->
            <div class="py-4 text-left px-6">
              <!--Title-->
              <div class="flex justify-between items-center pb-4">
                <p class="text-2xl font-bold">Your Account</p>
                <!-- Modal Close Button -->
                <div class="modal-close cursor-pointer z-50" @click="closeAuthModel">
                  <i class="fas fa-times"></i>
                </div>
              </div>
  
              <!-- Tabs -->
  
              <ul class="flex flex-wrap mb-4">
                <li class="flex-auto text-center">
                  <a
                    @click.prevent="() => (tab = login)"
                    :class="{
                      'hover:text-white text-white bg-blue-600': tab === login,
                      'hover:text-blue-600': tab === register
                    }"
                    class="block rounded py-3 px-4 transition"
                    href="#"
                    >Login</a
                  >
                </li>
                <li class="flex-auto text-center">
                  <a
                    @click.prevent="() => (tab = register)"
                    :class="{
                      'hover:text-white text-white bg-blue-600': tab === register,
                      'hover:text-blue-600': tab === register
                    }"
                    class="block rounded py-3 px-4 transition"
                    href="#"
                    >Register</a
                  >
                </li>
              </ul>
  
              <!-- Login Form -->
              <login-form 
              v-if="tab === 'login'"
              ></login-form>
  
              <!-- Registration Form -->
              <register-form
              v-if="tab === 'register'"
              ></register-form>
  
     
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginForm from './components/LoginForm.vue'
  import RegisterForm from './components/RegisterForm.vue'
  import '../../plugins/validation'
  
  export default {
    name: 'AuthView',
    data() {
      return {
        tab: 'login',
        login: 'login',
        register: 'register',
      }
    },
   
    components: {
      // ErrorMessage,
      LoginForm,
      RegisterForm
    }
  }
  </script>
  
  <style lang="css" scoped>

.back{
  background-image: url('src/assets/images/AuthView/auth-background.png');
}
</style>
  
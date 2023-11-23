<template>
  <div>
    <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
      <div
        class="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- //the backgroup shadow effect -->
        <div class="back fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <div
          class="inline-block mx-2 md:py-9 md:px-28 align-bottom bg-white-normal rounded-lg text-left overflow-hidden shadow-xl transform w-full transition-all sm:my-8 sm:align-middle sm:w-3/5"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-4">
              <!-- Modal Close Button -->
              <div class="modal-close cursor-pointer z-50" @click="closeAuthModel">
                <i class="fas fa-times"></i>
              </div>
            </div>

            <!-- Tabs -->

            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center">
                <button-ui
                  label="Sign Up"
                  :colorObject="{
                    'hover:text-white text-white bg-secondary-hover': tab === login,
                    'hover:text-secondary-normal': tab === register
                  }"
                  width="full"
                  @clickButton="clickButton()"
                >
                </button-ui>
              </li>
              <li class="flex-auto text-center">
                <button-ui
                  label="Register"
                  :colorObject="{
                    'hover:text-white text-white bg-secondary-hover': tab === register,
                    'hover:text-secondary-normal': tab === login
                  }"
                  width="full"
                  @clickButton="clickButton()"
                >
                </button-ui>
              </li>
            </ul>

            <!-- Login Form -->
            <login-form v-if="tab === 'login'"></login-form>

            <!-- Registration Form -->
            <register-form v-if="tab === 'register'"></register-form>

            <!-- Social Buttons -->

            <div class="flex flex-col space-y-2 sm:flex-row sm:space-x-3">
              <button-ui
                leftIcon="src\assets\icons\colored\google.svg"
                label="Google"
                color="bg-white-gray"
                :isRounded="true"
              >
              </button-ui>
              <button-ui
                leftIcon="src\assets\icons\colored\facebook.svg"
                label="Apple"
                color="bg-white-gray"
                :isRounded="true"
              >
              </button-ui>

              <button-ui
                leftIcon="src\assets\icons\colored\facebook.svg"
                label="Facebook"
                color="bg-white-gray"
                :isRounded="true"
              >
              </button-ui>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ButtonUi from '../../components/base/ButtonUi.vue'
import '../../plugins/validation'

export default {
  name: 'AuthView',
  data() {
    return {
      tab: 'login',
      login: 'login',
      register: 'register'
    }
  },
  methods: {
    clickButton() {
      this.tab == this.login ? (this.tab = this.register) : (this.tab = this.login)
    }
  },

  components: {
    // ErrorMessage,
    LoginForm,
    RegisterForm,
    ButtonUi
  }
}
</script>

<style lang="css" scoped>
.back {
  background-image: url('src/assets/images/AuthView/auth-background.png');
}
</style>

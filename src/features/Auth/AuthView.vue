<template>
  <div>
    <div class="back" id="modal">
      <div
        class="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="inline-block mx-2 md:py-9 sm:px-6 md:px-5 md:w-4/5 lg:px-20  lg:w-3/5   align-bottom bg-white-normal rounded-lg text-left overflow-hidden shadow-xl transform w-full transition-all sm:my-8 sm:align-middle "
        >
          <div class="grid gap-3 py-4 text-left px-6">
            <div class="flex justify-between items-center pb-4">
              <div class="modal-close cursor-pointer z-50" @click="closeAuthModel">
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div class="flex justify-center">
              <img
                src="@\assets\images\Logos\logo-medium.svg"
                alt="Logo"
                class="mx-auto"
              />
            </div>
            <ul class="flex flex-wrap mb-4 border-2 border-secondary-normal">
              <li class="flex-auto text-center border-secondary-normal">
                <button-ui
                  label="LogIn"
                  customCss="flex justify-center"
                  :colorObject="
                    tab === 'login'
                      ? {
                          'hover:text-white text-white bg-secondary-hover ': true,
                          'hover:text-secondary-normal': false,
                        }
                      : {
                          'hover:text-white text-white bg-secondary-hover ': false,
                          'hover:text-secondary-normal': true,
                        }
                  "
                  width="full"
                  @clickButton="clickButton()"
                >
                </button-ui>
              </li>
              <li class="flex-auto text-center">
                <button-ui
                  label="Register"
                  customCss="flex justify-center"
                  :colorObject="
                    tab === 'register'
                      ? {
                          'hover:text-white text-white bg-secondary-hover': true,
                          'hover:text-secondary-normal': false,
                        }
                      : {
                          'hover:text-white text-white bg-secondary-hover': false,
                          'hover:text-secondary-normal': true,
                        }
                  "
                  width="full"
                  @clickButton="clickButton()"
                >
                </button-ui>
              </li>
            </ul>
            <login-form v-if="tab === 'login'"></login-form>
            <register-form v-if="tab === 'register'"></register-form>
            <SocialButton />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import ButtonUi from "../../components/base/ButtonUi.vue";
import "../../plugins/validation";
import SocialButton from "./components/SocialButton.vue";

export default {
  name: "AuthView",
  data() {
    return {
      tab: "login",
    };
  },
  methods: {
    clickButton() {
      this.tab = this.tab === "login" ? "register" : "login";
    },
  },
  components: {
    LoginForm,
    RegisterForm,
    ButtonUi,
    SocialButton,
  },
};
</script>

<style lang="css" scoped>
.back {
  position: absolute;
  right: 0;
  left: 0;
  background-image: url("/assets/images/AuthView/auth-background.png");
  background-size: cover;
  background-position: center;
}
</style>

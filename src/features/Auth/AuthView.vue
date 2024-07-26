<template>
  <div>
    <div class="back " id="modal">
      <div
        class="flex items-center justify-center min-h-screen mt-10 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="inline-block mx-2 md:py-9 sm:px-6 md:px-5 md:w-4/5 lg:px-20  lg:w-3/5 align-bottom bg-white-normal rounded-lg text-left overflow-hidden shadow-xl transform w-full transition-all sm:my-8 sm:align-middle "
        >
          <div class="grid gap-3 py-4 text-left px-6">
            <div class="flex justify-between items-center pb-4">
              <div class="modal-close cursor-pointer z-50" @click="closeAuthModel">
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div class="flex justify-center">
              <img
                src="@/assets/images/Logos/logo-medium.svg"
                alt="Logo"
                class="mx-auto"
              />
            </div>
            <ul
            v-if="tab != 'institution'"
            class="flex flex-wrap mb-4 border-2 border-secondary-normal">
              <li class="flex-auto text-center border-secondary-normal">
                <button-ui
                  :label="$t('login')"
                  customCss="flex justify-center"
                  :colorObject="
                    currentTab === 'login'
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
                  @clickButton="setTab('login')"
                >
                </button-ui>
              </li>
              <li class="flex-auto text-center">
                <button-ui
                  :label="$t('register')"
                  customCss="flex justify-center"
                  :colorObject="
                    currentTab === 'register'
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
                  @clickButton="setTab('register')"
                >
                </button-ui>
              </li>
            </ul>
            <login-form v-if="currentTab === 'login'"></login-form>
            <register-form v-if="currentTab === 'register'"></register-form>
            <InstitutionRegister v-if="currentTab === 'institution'"></InstitutionRegister>
            <!-- <SocialButton /> -->
             <div
              v-if="tab != 'institution'"
             class="flex justify-center ">
              <p class="text-secondary-normal hover:underline cursor-pointer" 
              @click="navigateTo('institution')"
              >register as an institution</p>
             </div>

             <div
              v-if="tab == 'institution'"
             class="flex justify-center ">
              <p class="text-secondary-normal hover:underline cursor-pointer" 
              @click="navigateTo('login')"
              >Login or register</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./Forms/LoginForm.vue";
import RegisterForm from "./Forms/RegisterForm.vue";
import ButtonUi from "../../components/base/ButtonUi.vue";
import InstitutionRegister from "./Forms/InstitutionRegister.vue";
import "../../plugins/validation";
import useAuthStore from '@/stores/auth'

export default {
  name: "AuthView",
  props: ['tab',],
  data() {
    const authStore = useAuthStore()
    return {
      authStore,
      currentTab: this.tab || "login",
    };
  },
  watch: {
    $route: {
      immediate: true,
      
      async handler() {
        this.authStore.hideGuessHeader()
        console.log('this is tab' + this.tab);
        this.currentTab = this.tab || 'login';
      }}},


  

  methods: {
    setTab(currentTabName) {
      this.$router.push({ name: 'authentication', params: { tab: currentTabName } });
    },
    navigateTo(tab) {
      this.$router.push({ name: 'authentication', params: { tab: tab } });
      
    },
    closeAuthModel() {
      // Logic to close the modal, if any
    }
  },
  components: {
    LoginForm,
    RegisterForm,
    ButtonUi,
    InstitutionRegister,
  },
};
</script>

<style lang="css" scoped>
.back {
  position: absolute;
  right: 0;
  left: 0;
  top:0;
  background-image: url("/assets/images/AuthView/auth-background.png");
  background-size: cover;
  background-position: center;
}
</style>

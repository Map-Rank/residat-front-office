<template>
  <div class="back flex justify-center items-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-5" style="width: 25%;">
      <div class="text-center">
        <img
          src="/assets/images/Pages/Two factor authentication.svg"
          alt="Mail Icon"
          class="mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">{{ $t('forgot_password') }}</h2>
        <p class="text-gray-600 mb-4">{{ $t('forgot_password_description') }}</p>

        <div class="mb-4"></div>
        <vee-form ref="form" :validation-schema="schema" @submit="login">
          <!-- Email -->
          <div class="mb-6">
            <h3 for="email" class="inline-block mb-2">{{ $t('email') }}</h3>
            <vee-field
              v-model="userData.email"
              id="email"
              name="email"
              type="email"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('enter_email')"
            />
            <ErrorMessage class="text-danger-normal" name="email" />
          </div>
          <div class="flex justify-center">
          <button
            type="submit"
            @click.prevent="reSend()"
            :class="
              this.isLoading
                ? 'bg-gray-400 cursor-wait '
                : 'bg-secondary-normal hover:bg-secondary-hover'
            "
            class="w-full sm:w-1/2 bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
            :disabled="this.isLoading"
          >
          {{ $t('submit') }}
          </button>
        </div>
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script>
import useAuthStore from '../../stores/auth'
import { useRouter } from 'vue-router'

import useAlertStore from '@/stores/alertStore'
import { useToast } from "vue-toastification";
import { ForgotPassword } from './services/authService'
export default {
  name: 'ForgotPassword',
  data() {
    const router = useRouter()
    const authStore = useAuthStore()
    const alertStore = useAlertStore()
    const toast = useToast();

    return {
      authStore,
      alertStore,
      // alertToast,
      toast,
      isLoading: false,
      router,
      showPassword: false,
      schema: {
        email: 'required|email',
        password: 'required'
      },
      userData: {
        email: '',
        password: ''
      },
      login_in_submission: false
    }
  },
  components: {},

  methods: {
    handleSuccess() {
      this.toast.success('Link are successfully send',{timeout:2000});
      // this.authStore.isloggedIn = true
      // this.$router.push({ name: 'reset-password' })
    },

    handleError(errors) {
      this.isLoading = false
      if (errors.email && errors.email.length > 0) {
        this.toast.error(errors.email[0]);
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.toast.error(errors.zone_id[0]);
      }
    },

    async reSend() {
      try{
        this.isLoading = true
        this.toast.error(this.$t('please_wait_creating_account'));
        await ForgotPassword(this.userData, this.handleSuccess, this.handleError,)
      }catch (error) {
        this.isLoading = false
        console.log(error);
      }
    },
  }
}
</script>

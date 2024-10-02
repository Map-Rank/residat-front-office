<template>
  <div class="flex flex-col space-y-6">
    <h2 class="text-center uppercase">{{ $t('welcome_back') }}</h2>

    <!-- Toggle Link -->

    <vee-form ref="form" :validation-schema="schema" @submit="login">
      <!-- Conditional Email or Phone Input -->
      <div v-if="inputMethod === 'email'" class="mb-2">
        <h3 for="email" class="inline-block mb-2">Email ou Phone number</h3>
        <vee-field
          v-model="userData.email"
          id="email"
          name="credential"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('enter_email')"
        />
        <ErrorMessage class="text-danger-normal" name="credential" />
      </div>

      <div v-else class="mb-2">
        <h3 for="phone" class="inline-block mb-2">{{ $t('phone_number') }}</h3>
        <vee-field
          v-model="userData.email"
          id="phone"
          name="credential"
          type="tel"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('enter_phone_number')"
        />
        <ErrorMessage class="text-danger-normal" name="credential" />
      </div>
      <!-- <div class="text-start mb-4 cursor-pointer ">
        <p  class="text-secondary-normal" @click="toggleInputMethod">{{ inputMethod === 'email' ? $t('use_phone') : $t('use_email') }}</p>
      </div> -->

      <!-- Password Field -->
      <div class="relative w-full">
        <h3>{{ $t('password') }}</h3>
        <div class="flex items-center border border-gray-300 rounded overflow-hidden">
          <vee-field
            name="password"
            v-model="userData.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
            :placeholder="$t('password')"
          ></vee-field>
          <button @click="togglePasswordVisibility" type="button" class="p-2 focus:outline-none">
            <!-- Toggle Password Visibility Icons -->
          </button>
        </div>
        <ErrorMessage class="text-red-500 text-sm mt-1" name="password" />
      </div>

      <!-- Forgot Password Link -->
      <h6 class="text-right mt-3 hover:cursor-pointer" @click="forgotPassword">
        {{ $t('forgot_password') }}
      </h6>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          @click.prevent="login()"
          :class="
            this.isLoading
              ? 'bg-gray-400 cursor-wait '
              : 'bg-secondary-normal hover:bg-secondary-hover'
          "
          class="w-full sm:w-1/2 bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
          :disabled="this.isLoading"
        >
          {{ $t('login') }}
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import useAuthStore from '../../../stores/auth'
import { loginUser } from '../services/authService'

import useAlertStore from '@/stores/alertStore'
import { useToast } from 'vue-toastification'

export default {
  name: 'LoginForm',
  setup() {},
  data() {
    return {
      authStore: useAuthStore(),
      alertStore: useAlertStore(),
      toast: useToast(),
      isLoading: false,
      // router,
      showPassword: false,
      schema: {
        email: 'required|email',
        credential: 'required',
        phone: 'required|numeric',
        password: 'required'
      },
      userData: {
        email: '',
        phone: '',
        password: ''
      },
      inputMethod: 'email'
    }
  },
  methods: {
    toggleInputMethod() {
      this.inputMethod = this.inputMethod === 'email' ? 'phone' : 'email'
    },

    handleEmailNotVerified() {
      this.toast.error('Check your email to verifie your mail')
      this.$router.push({
        name: 'verification-account',
        params: {
          heading: 'Welcome to Residat!',
          message:
            'As an institutional account, some verifications needs to be done on your account. Our administrative service will contact you and work you through this easy process. Thanks for choosing Residat.'
        }
      })
    },

    handleSuccess() {
      this.toast.success('Successfully login', { timeout: 2000 })
      this.authStore.isloggedIn = true
      this.$router.push({ name: 'community' })
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    handleError(errors) {
      this.isLoading = false
      if (errors.email && errors.email.length > 0) {
        this.toast.error(errors.email[0])
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.toast.error(errors.zone_id[0])
      }
    },

    async login() {
      const fieldsToValidate = ['credential']

      try {
        const validationResults = await Promise.all(
          fieldsToValidate.map((field) => this.$refs.form.validateField(field))
        )

        const allFieldsValid = validationResults.every((result) => result.valid)
        if (allFieldsValid) {
          this.toast.info(this.$t('please_wait_login_in'))
          this.isLoading = true

          try {
            await loginUser(
              this.userData,
              this.authStore,
              this.handleSuccess,
              this.handleError,
              this.handleEmailNotVerified
            )

            this.isLoading = false
          } catch (error) {
            this.isLoading = false
            return
          }
        }
      } catch (error) {
        console.error('Validation error:', error)
      }
    },
    forgotPassword() {
      console.log('bonjour')
      this.$router.push({ name: 'forgot-password' })
    }
  }
}
</script>

<style>
h3 {
  font-size: 14px;

  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

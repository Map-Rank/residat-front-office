<template>
  <div class="flex flex-col space-y-6">
    <h3 class="text-center">WELCOME BACK</h3>

    <div>
      <AlertForm></AlertForm>
    </div>

    <vee-form :validation-schema="schema" @submit="login">
      <!-- Email -->
      <div class="mb-6">
        <label for="email" class="inline-block mb-2">Email</label>
        <vee-field
          v-model="userData.email"
          id="email"
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-danger-normal" name="email" />
      </div>

      <div class="relative w-full">
        <label>Password</label>
        <div class="flex items-center border border-gray-300 rounded overflow-hidden">
          <vee-field
            name="password"
            v-model="userData.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
            placeholder="Password"
          ></vee-field>
          <button @click="togglePasswordVisibility" type="button" class="p-2 focus:outline-none">
            <img
              v-show="!showPassword"
              src="\assets\icons\password-open.svg"
              alt="Show password"
              class="block w-6 h-6"
            />
            <img
              v-show="showPassword"
              src="\assets\icons\password-closed.svg"
              alt="Hide password"
              class="block w-6 h-6"
            />
          </button>
        </div>

        <!-- Error Message -->
        <ErrorMessage class="text-red-500 text-sm mt-1" name="password" />
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="w-full sm:w-1/2 bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
          @click.prevent="login()"
          :disabled="login_in_submission"
        >
          Sign In
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import useAuthStore from '../../../stores/auth'
import { loginUser } from '../services/authService'
import { useRouter } from 'vue-router'
import AlertForm from '../../../components/common/AlertFrom/AlertForm.vue'
import { AlertStates } from '@/components'
import useAlertStore from '@/stores/alertStore'

export default {
  name: 'LoginForm',
  setup() {},
  data() {
    const router = useRouter()
    const authStore = useAuthStore()
    const alertStore = useAlertStore()

    return {
      authStore,
      alertStore,
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

  components: {
    AlertForm
  },

  methods: {
    handleEmailNotVerified() {
      this.alertStore.setAlert(AlertStates.ERROR, 'Check your email to verifie your mail')
      this.$router.push({ name: 'waiting-email-verification' })
    },

    handleSuccess() {
      this.authStore.isloggedIn = true
      this.$router.push({ name: 'community' })
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    handleError(errors) {
      if (errors.email && errors.email.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.email[0])
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.zone_id[0])
      }
    },

    async login() {
      this.alertStore.setAlert(AlertStates.PROCESSING, 'please wait we are login you in ', 10000)

      try {
        await loginUser(
          this.userData,
          this.authStore,
          this.handleSuccess,
          this.handleError,
          this.handleEmailNotVerified
        )
      } catch (error) {
        // console.log(error)
        return
      }
    }
  }
}
</script>

<style>
label {
  color: var(--content-secondary, #374151);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}
</style>

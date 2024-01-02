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

      <!-- Password -->
      <!-- <div class="mb-6">
        <label for="password" class="inline-block mb-2">Password</label>
        <vee-field name="password">
          <input
            v-model="userData.password"
            id="password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
          />
        </vee-field>
        <ErrorMessage class="text-danger-normal" name="password" />
      </div> -->

      <div class="mb-6 relative">
        <label for="password" class="inline-block mb-2">Password</label>
        <vee-field class="flex" name="password">
          <div class="relative">
            <div class="absolute flex right-4 items-center ml-2 h-full">
              <button class="px-1 block focus:outline-none" @click="togglePasswordVisibility">
                <div :class="{ hidden: showPassword, block: !showPassword }">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </div>

                <div :class="{ block: showPassword, hidden: !showPassword }">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <label for="password1" class="block">
              <vee-field class="flex" name="password">
                <input
                  v-model="userData.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password"
                />
              </vee-field>
            </label>
          </div>
         
          <!-- <ErrorMessage class="text-danger-normal" name="password" /> -->
        </vee-field>
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
    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
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

    async login(values) {
      this.alertStore.setAlert(AlertStates.PROCESSING, 'please wait we are login you in ')

      try {
        await loginUser(this.userData, this.authStore, this.handleSuccess, this.handleError)
      } catch (error) {
        // console.log(error)
        return
      }

      console.log(values)
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

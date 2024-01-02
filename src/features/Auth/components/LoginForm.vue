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
                <img
                  :class="{ hidden: showPassword, block: !showPassword }"
                  src="assets\icons\password-open.svg"
                  alt=""
                  srcset=""
                />

                <img
                  :class="{ block: showPassword, hidden: !showPassword }"
                  src="assets\icons\password-closed.svg"
                  alt=""
                  srcset=""
                />
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

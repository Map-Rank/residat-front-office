<template>
  <div class="flex flex-col space-y-6">
    <h3 class="text-center">WELCOME BACK</h3>

    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-if="login_show_alert"
      :class="login_alert_varient"
    >
      {{ login_alert_message }}
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
      <div class="mb-6">
        <label for="password" class="inline-block mb-2">Password</label>
        <vee-field name="password" >
          <input
          v-model="userData.password"
            id="password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
          />
          <!-- <div class="text-danger-normal" v-for="error in errors" :key="error">
            {{ error }}
          </div> -->
        </vee-field>
        <ErrorMessage class="text-danger-normal" name="password" />
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="w-full sm:w-1/2 bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
          @click.prevent="login()"
          :disabled="login_in_submission"
        >
          Sign up
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import useAuthStore from '../../../stores/auth'
import { loginUser } from '../services/authService'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {},
  data() {
    const router = useRouter()
    const authStore = useAuthStore()

    return {
      authStore,
      router,
      schema: {
        email: 'required|email',
        password: 'required'
      },
      userData: {
        email: '',
        password: ''
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_varient: 'bg-blue-500',
      login_alert_message: 'please wait we are login you in '
    }
  },

  methods: {
    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
      this.authStore.isloggedIn = !this.authStore.isloggedIn
      this.$router.push({ name: 'community' })
    },

    handleError(errors) {
      console.log(errors)
      this.login_alert_message = JSON.stringify(errors.email[0])
      console.log(JSON.stringify(errors.email[0]))
      console.log(JSON.stringify(errors.zone_id[0]) )

     
    },

    async login(values) {
      ;(this.login_in_submission = true),
        (this.login_show_alert = true),
        (this.login_alert_varient = 'bg-blue-500'),
        (this.login_alert_message = 'please wait we are login you in ')

      try {
        await loginUser(this.userData, this.authStore, this.handleSuccess, this.handleError)
      } catch (error) {
        console.log(error)
        ;(this.login_alert_varient = 'bg-red-500'),
          // (this.login_alert_message = 'invalid credentials try again')
        this.login_in_submission = false

        return
      }

      console.log(values)
    }
  },
  components: {
    // ButtonUi
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

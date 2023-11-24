<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="flex flex-col space-y-6">
    <h3 class="text-center">WELCOME BACK</h3>

    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-show="reg_show_alert"
      :class="reg_alert_varient"
    >
      {{ reg_alert_message }}
    </div>

    <vee-form
      :validation-schema="schema"
      @submit="Login"
      v-slot="{ handleSubmit }"
      :initial-values="userData"
    >
      <!-- Email -->
      <div class="mb-6">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-danger-normal" name="email" />
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label class="inline-block mb-2">Password</label>
        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
          <input
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
            v-bind="field"
          />
          <!-- <div class="text-danger-normal" v-for="error in errors" :key="error">
            {{ error }}
          </div> -->
        </vee-field>
        <ErrorMessage class="text-danger-normal" name="password" />
      </div>
        <div class=" flex justify-center   ">
          <button
            type="submit"
            class="sm:w-1/2  bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
            @click="handleSubmit(Login())"
          >
            Sign up
          </button>
        </div>
    </vee-form>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useAuthStore from '../../../stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginForm',
  setup() {},
  data() {
    const router = useRouter()
    return {
      router,
      schema: {
        name: 'required|min:3|max:50',
        first_name: 'required|min:3|max:50',
        second_name: 'required|min:3|max:50',
        location: 'required|max:50',
        telephone: 'required|min:3|max:12',
        email: 'required|email',
        age: 'required|min_value:18,max_value:100',
        password: 'required',
        confirm_password: 'required|passwords_mismatch:@password',
        country: 'required|country_excluded:USA',
        tos: 'required|tos'
      },
      userData: {
        country: 'USA'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_varient: 'bg-blue-500',
      reg_alert_message: 'please wait your account is being created '
    }
  },
  computed: {
    ...mapStores(useAuthStore)
  },

  methods: {
    Login() {
      this.authStore.isloggedIn = !this.authStore.isloggedIn
      this.$router.push({ name: 'community' })
    }
  },
  components: {}
}
</script>

<style>
label {
  color: var(--content-secondary, #374151);

  /* Paragraphs/P3/Medium */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}
</style>

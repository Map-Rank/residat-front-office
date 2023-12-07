<template>
  <div class="flex flex-col space-y-6">
    <h3 class="text-center">WELCOME BACK</h3>

    <div :class="[regAlertVariant, 'text-white', 'text-center', 'font-bold', 'p-4', 'rounded', 'mb-4']" v-show="regShowAlert">
      {{ regAlertMessage }}
    </div>

    <vee-form :validation-schema="schema" @submit="login"  >
      <!-- Email -->
      <div class="mb-6">
        <label for="email" class="inline-block mb-2">Email</label>
        <vee-field
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
        <vee-field name="password" :bails="false" v-slot="{ field}">
          <input
            id="password"
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

      <div class="flex justify-center">
        <button
          type="submit"
          class="w-full sm:w-1/2 bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
          @click="login"
        >
          Sign up
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import useAuthStore from '../../../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {},
  data() {
    const router = useRouter();
    return {
      router,
      schema: {
        email: 'required|email',
        password: 'required',
      },
      userData: {
        country: 'USA'
      },
      regInSubmission: false,
      regShowAlert: false,
      regAlertVariant: 'bg-blue-500',
      regAlertMessage: 'Please wait, your account is being created.'
    };
  },
  computed: {
    ...mapStores(useAuthStore)
  },

  methods: {
    login(values) {
      // this.authStore.isloggedIn = !this.authStore.isloggedIn;
      // this.$router.push({ name: 'community' });
      console.log(values)
    }
  },
  components: {
    // ButtonUi
  }
};
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
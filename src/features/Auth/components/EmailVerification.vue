  <template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-3/2 bg-white shadow-lg rounded-lg p-5">
      <div class="text-center">
        <img
          src="/assets/images/Pages/Two factor authentication.svg"
          alt="Mail Icon"
          class="mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Email Verification</h2>
        <p class="text-gray-600 mb-4">Open your Email in other to get your verification link</p>

        <div class="mb-4"></div>
        <div>
          <p class="text-gray-600 mt-5">Don't receive email ?</p>
          <button
            type="submit"
            class="w-full sm:w-1/2 bg-secondary-normal text-white py-2.5 my-2 rounded-full transition hover:bg-secondary-hover"
            @click.prevent="reSend()"
            :disabled="resetLink"
          >
          Resend Verification link
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOCAL_STORAGE_KEYS } from '@/constants/index.js'
export default {
  name: 'EmailVerification',
  data() {
    return {
      resetLink: false
    }
  },
  components: {},

  methods: {
    reSend() {
      const authToken = localStorage.getItem(LOCAL_STORAGE_KEYS.authToken)
      const base = import.meta.env.VITE_API_BASE_URL
      // Make API request using VITE_API_BASE_URL
      const url = `${base}email/resend-verification-notification`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${authToken}`
        },
      };
      this.resetLink = true

      fetch(url, options)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.success();
          } else {
            this.error = response.data;
          }
        })
        .catch((error) => {
          this.resetLink = false
          this.error = error;
        })
        .finally(() => {
          this.resetLink = true
        });
    },
  }
}
</script>

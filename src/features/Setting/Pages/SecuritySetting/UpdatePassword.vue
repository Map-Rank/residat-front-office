<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="w-full bg-primary-light">
    <div class="flex-col bg-white md:my-5 rounded-lg p-5 md:p-10 mx-1 md:mx-4">
    

      <vee-form ref="form" :validation-schema="schema">
        <div class="flex-col space-y-6">
          <div class="flex-col space-y-6">
            <h2 class="text-center text-xl md:text-3xl lg:text-4xl">{{ $t('update_password') }}</h2>

            <!-- Current Password -->
            <div class="relative w-full">
              <label>{{ $t('currrent_pwd') }}</label>
              <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                <vee-field
                  name="old_password"
                  v-model="formData.old_password"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  id="old_password"
                  class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
                  :placeholder="$t('currrent_pwd')"
                ></vee-field>
                <button
                  @click="toggleCurrentPasswordVisibility"
                  type="button"
                  class="p-2 focus:outline-none"
                >
                  <img
                    v-show="!showCurrentPassword"
                    src="\assets\icons\password-open.svg"
                    alt="Show password"
                    class="block w-6 h-6"
                  />
                  <img
                    v-show="showCurrentPassword"
                    src="\assets\icons\password-closed.svg"
                    alt="Hide password"
                    class="block w-6 h-6"
                  />
                </button>
              </div>

              <!-- Error Message -->
              <ErrorMessage class="text-red-500 text-sm mt-1" name="old_password" />
            </div>

            <!-- Password -->
            <div class="relative w-full">
            <label>{{ $t('password') }}</label>
              <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                <vee-field
                  name="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
                :placeholder="$t('enter_password')"
                ></vee-field>
                <button
                  @click="togglePasswordVisibility"
                  type="button"
                  class="p-2 focus:outline-none"
                >
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

            <!-- Confirm Password -->
            <div class="relative w-full">
            <label>{{ $t('confirm_password') }}</label>
              <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                <vee-field
                  name="password_confirmation"
                  v-model="formData.password_confirmation"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="schema.password_confirmation"
                  id="password_confirmation"
                  class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
                :placeholder="$t('enter_confirm_password')"
                ></vee-field>
                <button
                  @click="toggleConfirmPasswordVisibility"
                  type="button"
                  class="p-2 focus:outline-none"
                >
                  <img
                    v-show="!showConfirmPassword"
                    src="\assets\icons\password-open.svg"
                    alt="Show password"
                    class="block w-6 h-6"
                  />
                  <img
                    v-show="showConfirmPassword"
                    src="\assets\icons\password-closed.svg"
                    alt="Hide password"
                    class="block w-6 h-6"
                  />
                </button>
              </div>

              <ErrorMessage class="text-danger-normal" name="password_confirmation" />
            </div>

            <div class="sm:px-">
              <div class="flex justify-center">
                <button
                  @click.prevent="updatePassword()"
                  class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
                >
                {{ $t('update_password') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
import useAuthStore from '@/stores/auth'
import { useRouter } from 'vue-router'
import { AlertStates } from '@/components'
import useAlertStore from '@/stores/alertStore'
import { UpdatePassword } from '@/features/Auth/services/authService.js'

export default {
  name: 'UpdatePassword',

  data() {
    const router = useRouter()
    const authStore = useAuthStore()
    const alertStore = useAlertStore()

    return {
      authStore,
      alertStore,
      router,

      isLoading: false,
      isDivisionLoading: false,
      isSubdivisionLoading: false,

      schema: {
        old_password: 'required|min:6',
        password: 'required|min:6',
        password_confirmation: 'required|passwords_mismatch:@password'
      },
      formData: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      showCurrentPassword: false,
      showPassword: false,
      showConfirmPassword: false,

      reg_in_submission: false
    }
  },


  computed: {
    imageUrl() {
      if (this.isImageFromLocal) {
        return URL.createObjectURL(this.formData.avatar)
      } else {
        return this.formData.avatar
      }
    }
  },
  methods: {
    toggleCurrentPasswordVisibility() {
      this.showCurrentPassword = !this.showCurrentPassword
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    async updatePassword() {
      const fieldsToValidate = ['password', 'password_confirmation', 'old_password']

      try {
        const validationResults = await Promise.all(
          fieldsToValidate.map((field) => this.$refs.form.validateField(field))
        )
        const allFieldsValid = validationResults.every((result) => result.valid)

        if (allFieldsValid) {
          await this.submitForm()
          
        }
      } catch (error) {
        console.error('Validation error:', error)
      }
    },

    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
      this.$router.push({ name: 'security-setting' })
      this.resetForm()
    },

    handleError(errors) {
      if (errors.email && errors.email.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.email[0])
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.zone_id[0])
      }
    },

    async submitForm() {
      this.alertStore.setAlert(
        AlertStates.PROCESSING,
        'please wait we are updating your password...'
      )

      try {
        await UpdatePassword(this.formData, this.handleSuccess, this.handleError)
      } catch (error) {
        console.log(error)
      }
    },

    resetForm() {
      this.formData.old_password = ''
      this.formData.password = ''
      this.formData.password_confirmation = ''
    }
  }
}
</script>

<style>
label {
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

span {
  color: var(--gray-dark, #505050);

  /* Captions/C1 */
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>

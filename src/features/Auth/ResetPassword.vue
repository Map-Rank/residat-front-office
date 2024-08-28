<template>
  <div class="reset-password-container flex">
    <div class="w-[30%] hidden md:flex items-center mr-4 ">
      <img src="/assets/images/Pages/Two factor authentication.svg" alt="Reset Password Image" class="reset-image"/>
    </div>
    
    <div class="form-container items-center">
      <h2 class="text-xl font-semibold mb-2">{{ $t('reset_password') }}</h2>
      <vee-form ref="form" :validation-schema="schema" @submit="resetPassword">
        <div class="mb-6">
          <h3 for="email" class="inline-block mb-2">{{ $t('email') }}</h3>
          <vee-field
            v-model="emailFromUrl"
            id="email"
            name="email"
            type="email"
            class="block w-full py-1.5 px-3 text-gray-700 bg-gray-200 border border-gray-300 transition duration-500 rounded"
            :placeholder="$t('enter_email')"
            disabled
          />
          <ErrorMessage class="text-danger-normal" name="email" />
        </div>
        <div class="relative w-full"></div>
        <label>{{ $t('enter_new_password') }}</label> 
        <div class="mb-3 flex items-center border border-gray-300 rounded overflow-hidden">
          <vee-field
            v-model="userData.password"
            id="password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
            :placeholder="$t('enter_new_password')"
          />
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
        <ErrorMessage class="text-danger-normal" name="password" />
        <div class="relative w-full"></div>
        <label>{{ $t('confirm_enter_new_password') }}</label>
        <div class="flex items-center border border-gray-300 rounded overflow-hidden">
          <vee-field
            v-model="userData.password_confirmation"
            id="password_confirmation"
            name="password_confirmation"
            :type="showConfirmPassword ? 'text' : 'password'"
            :rules="schema.password_confirmation"
            class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
            :placeholder="$t('enter_password_confirmation')"
          />
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
        <div class="flex justify-center">
          <button
            type="submit"
            @click.prevent="resetPassword()"
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
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      <div v-if="success" class="alert alert-success">
        {{ success }}
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { ResetPassword } from './services/authService'
  import { useToast } from "vue-toastification";
  
  export default {
    name: 'ResetPassword',
    data() {
        const toast = useToast();

      return {
        toast,
        isLoading: false,
        showPassword: false,
        showCurrentPassword: false,
        showConfirmPassword: false,
        token: '',
        emailFromUrl: '',
        password: '',
        userData: {
            password: '',
            password_confirmation: '',
        },
        schema: {
            password: 'required|min:6',
            password_confirmation: 'required|passwords_mismatch:@password',
        },
        error: '',
        success: '',
      };
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
        async resetPassword() {
          const fieldsToValidate = ['password', 'password_confirmation']

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
            this.toast.success('Password are updated succesfully',{timeout:2000});
            this.$router.push({ name: 'authentication' })
        },

        handleError(errors) {
            this.isLoading = false
            if (errors.email && errors.email.length > 0) {
                this.toast.error(errors.email[0]);
            } else if (errors.zone_id && errors.zone_id.length > 0) {
                this.toast.error(errors.zone_id[0]);
            }
        },
        async submitForm() {
            this.token = this.$route.query.token;
            try{
                this.isLoading = true
                this.toast.error(this.$t('please_wait_we_reset_your_password'));
                await ResetPassword(this.emailFromUrl, this.userData, this.token, this.handleSuccess, this.handleError,)
            }catch (error) {
                this.isLoading = false
                console.log(error);
            }
        }
    },
    mounted() {
      this.emailFromUrl = this.$route.query.email;
    }
  };
  </script>
  
<style scoped>
  .reset-password-container {
    display: flex;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
  }
  

  
  .reset-image {
    max-width: 100%;
    border-radius: 4px;
  }
  
  .form-container {
    flex: 2;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
  }
  
  .alert {
    margin-top: 20px;
  }
  </style>
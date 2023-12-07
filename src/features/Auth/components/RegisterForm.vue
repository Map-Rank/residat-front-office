<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="flex-col">
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-show="reg_show_alert"
      :class="reg_alert_varient"
    >
      {{ reg_alert_message }}
    </div>

    <vee-form ref="form" :validation-schema="schema" @submit="registerForm">
      <div class="flex-col space-y-6" v-if="this.currentStep === this.step_1">
        <div class="flex-col space-y-6">
          <h3 class="text-center">PERSONAL INFORMATION</h3>
          <!-- First Name -->
          <div class="mb-6">
            <label class="inline-block mb-4">First Name</label>
            <vee-field
              name="first_name"
              v-model="formData.first_name"
              :rules="schema.first_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter First Name"
            />
            <ErrorMessage class="text-danger-normal" name="first_name" />
          </div>

          <!-- Second Name -->
          <div class="mb-6">
            <label class="inline-block mb-2">Second Name</label>
            <vee-field
              name="last_name"
              v-model="formData.last_name"
              :rules="schema.last_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Second Name"
            />
            <ErrorMessage class="text-danger-normal" name="last_name" />
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label class="inline-block mb-2">Email</label>
            <vee-field
              name="email"
              :rules="schema.email"
              v-model="formData.email"
              type="email"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Email"
            />
            <ErrorMessage class="text-danger-normal" name="email" />
          </div>

          <!-- phone -->
          <div class="mb-6">
            <label class="inline-block mb-2">phone</label>
            <vee-field
              name="phone"
              v-model="formData.phone"
              :rules="schema.phone"
              as="input"
              type="tel"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter phone number"
            />
            <ErrorMessage class="text-danger-normal" name="phone" />
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="inline-block mb-2">Password</label>
            <vee-field
              name="password"
              type="password"
              :rules="schema.password"
              v-model="formData.password"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Password"
            >
            </vee-field>
            <ErrorMessage class="text-danger-normal" name="password" />
          </div>

          <!-- Confirm Password -->
          <div class="mb-6">
            <label class="inline-block mb-2">Confirm Password</label>
            <vee-field
              name="confirm_password"
              type="password"
              :rules="schema.confirm_password"
              v-model="formData.confirm_password"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Confirm Password"
            />
            <ErrorMessage class="text-danger-normal" name="confirm_password" />
          </div>

          <div class="sm:px-">
            <div class="flex justify-center">
              <button
                @click.prevent="nextStep()"
                class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-col space-y-6" v-if="this.currentStep === this.step_2">
        <h3 class="text-center">SPECIFIC INFORMATION</h3>
        <!-- Location -->
        <div class="mb-6">
          <label class="inline-block mb-2">Location</label>
          <vee-field
            name="location"
            :rules="schema.location"
            v-model="formData.location"
            as="input"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Second Name"
          />
          <ErrorMessage class="text-danger-normal" name="location" />
        </div>

        <!-- Location -->
        <div class="mb-6">
          <label class="inline-block mb-2">Company Name</label>
          <vee-field
            name="company_name"
            :rules="schema.company_name"
            v-model="formData.company_name"
            as="input"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Company Name"
          />
          <ErrorMessage class="text-danger-normal" name="company_name" />
        </div>

        <div class="mb-4">
          <div class="grid mb-5">
            <label class="inline-block mb-2">Sector</label>
            <span>Select your sector of interest</span>
          </div>
          <div class="grid grid-cols-3 gap-7 content-between">
            <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
              <vee-field
                :name="sector.name"
                type="checkbox"
                v-model="formData.selectedSectors"
                :value="sector.value"
                :id="sector.name"
                class="rounded text-primary-normal focus:ring-primary-light"
              />
              <label :for="sector.name" class="ml-2 block text-sm text-body-dark">
                {{ sector.label }}
              </label>
            </div>
          </div>
        </div>

        <div class="mb-3 pl-6">
          <!-- TOS -->
  

          <vee-field
            type="checkbox"
            value="1"
            name="tos"
            v-model="formData.tos"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
          />
          <label class="inline-block">Accept terms of service</label> <br />
          <ErrorMessage class="text-red-600" name="tos" />
        </div>

        <div class="flex flex-col sm:my-5 sm:flex-row sm:mb-5 space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            @click.prevent="previousStep()"
            class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
            :disable="reg_in_submission"
          >
            Previous
          </button>

          <button
            type="submit"
            @click="registerForm()"
            class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
            :disable="reg_in_submission"
          >
            Sign up
          </button>
        </div>
      </div>
    </vee-form>
  </div>
</template>

<script>
// import ButtonUi from '../../../components/base/ButtonUi.vue'
import { mapStores, mapWritableState } from 'pinia'
import useAuthStore from '../../../stores/auth'
import { registerUser } from '../services/authService'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterForm',
  data() {
    const router = useRouter()
    return {
      router,
      schema: {
        name: 'required|min:3|max:50',
        first_name: 'required|min:3|max:50',
        last_name: 'required|min:3|max:50',
        phone: 'required|min:3|max:12',
        email: 'required|email',
        password: 'required',
        confirm_password: 'required|passwords_mismatch:@password',
        tos: 'required|tos',
        company_name: 'min:3|max:50',
        location: 'required|min:3|max:50'
      },
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        location: '',
        country: '',
        gender: '',
        date_of_birth: '2023-12-06T13:10:59',
        selectedSectors: [],
        tos: true
      },

      sectors: [
        {
          name: 'agriculture',
          label: 'Agriculture',
          checked: false,
          value: 'Agriculture',
          required: true
        },
        {
          name: 'education',
          label: 'Education',
          checked: false,
          value: 'Education',
          required: true
        },
        { name: 'socials', label: 'Socials', checked: false, value: 'Socials', required: true }
        // Add more sectors as needed
      ],
      step_1: 'step_1',
      step_2: 'step_2',
      currentStep: 'step_1',
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_varient: 'bg-blue-500',
      reg_alert_message: 'please wait your account is being created '
    }
  },

  methods: {
    async nextStep() {
      const fieldsToValidate = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'confirm_password'
      ]

      try {
        // Validate each field in the list
        const validationResults = await Promise.all(
          fieldsToValidate.map((field) => this.$refs.form.validateField(field))
        )

        // Check if all fields are valid
        const allFieldsValid = validationResults.every((result) => result.valid)

        // Proceed to the next step only if all fields are valid
        if (allFieldsValid) {
          this.currentStep = this.currentStep === this.step_1 ? this.step_2 : this.step_1
        } else {
          console.log('Some fields are invalid.')
        }
      } catch (error) {
        console.error('Validation error:', error)
      }
    },

    previousStep() {
      this.currentStep = this.currentStep === this.step_2 ? this.step_1 : this.step_2
    },

    handleSuccess(message) {
      // Custom logic for handling successful response
      console.log('Handling success:', message)
    },

    handleError(message) {
      // Custom logic for handling error response
      // console.error('Handling error:', message)
      console.log(message)
    },

    async registerForm() {

      ;(this.reg_in_submission = true),
        (this.reg_show_alert = true),
        (this.reg_alert_varient = 'bg-blue-500'),
        (this.reg_alert_message = 'Wait we are creating your account ')


      try {
        const response = await registerUser(this.formData, this.handleSuccess, this.handleError)
        if (response.status) {
          this.authStore.isloggedIn = !this.authStore.isloggedIn
          this.$router.push({ name: 'community' })
          console.log('Registration Successfull')
        } else {
          console.log(response.data.errors[0])
        }
      } catch (error) {
        console.log(error)
        ;(this.reg_in_submission = false),
            // (this.reg_show_alert = false),
            (this.reg_alert_varient = 'bg-red-500'),
            (this.reg_alert_message = 'Unexpescted error please try letter')
            console.log(error);
 
      }
    }
  },
  components: {
    // ButtonUi
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapWritableState(useAuthStore, ['isloggedIn'])
  }
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

span {
  color: var(--gray-dark, #505050);

  /* Captions/C1 */
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>

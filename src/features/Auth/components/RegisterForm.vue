<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="flex-col">
    <div>
      <AlertForm></AlertForm>
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

          <!-- date of birth -->
          <div class="mb-6">
            <label class="inline-block mb-2">Date of Birth</label>
            <vee-field
              name="dob"
              v-model="formData.date_of_birth"
              :rules="schema.dob"
              as="input"
              type="date"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Select date of birth"
            />
            <ErrorMessage class="text-danger-normal" name="dob" />
          </div>

          <!-- User Gender  -->
          <div class="mb-6">
            <label class="inline-block mb-2">Gender</label>
            <select
              v-model="formData.gender"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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


        <div class="flex flex-row space-x-4 justify-between ">
          <div class="w-1/2">
            <label class="inline-block mb-2">Choose Your Region</label>
            <BaseDropdown v-model="selectedItem" :options="dropdownOptions" />
          </div>
          <div class="w-1/2">
            <label class="inline-block mb-2">Choose Your Division</label>
            <BaseDropdown v-model="selectedItem" :options="dropdownOptions" />
          </div>
        </div>
        
        <div class="w-full">
          <label class="inline-block mb-2">Choose your Sub-division</label>
          <BaseDropdown v-model="selectedItem" :options="dropdownOptions" />
        </div>

        <!-- Company -->
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
          <div v-if="sectors" class="grid grid-cols-3 gap-7 content-between">
            <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
              <vee-field
                :name="sector.name"
                type="checkbox"
                v-model="formData.selectedSectors"
                :id="sector.name"
                class="rounded text-primary-normal focus:ring-primary-light"
              />
              <label :for="sector.name" class="ml-2 block text-sm text-body-dark">
                {{ sector.name }}
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
import { mapStores, mapWritableState } from 'pinia'
import useAuthStore from '../../../stores/auth'
import useSectorStore from '@/stores/sectorStore.js'
import { registerUser } from '../services/authService'
import { useRouter } from 'vue-router'
import { AlertStates } from '@/components'
import useAlertStore from '@/stores/alertStore'
import AlertForm from '@/components/common/AlertFrom/AlertForm.vue'
import BaseDropdown from '@/components/base/BaseDropdown.vue'

export default {
  name: 'RegisterForm',

  async created() {
    const sectorStore = useSectorStore()

    try {
      this.sectors = sectorStore.getAllSectors
    } catch (error) {
      console.error('Failed to load sector:', error)
    }
  },

  data() {
    const router = useRouter()
    const authStore = useAuthStore()
    const alertStore = useAlertStore()

    return {
      authStore,
      alertStore,
      router,
      dropdownOptions: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ],
      schema: {
        name: 'required|min:3|max:50',
        first_name: 'required|min:3|max:50',
        last_name: 'required|min:3|max:50',
        phone: 'required|min:3|max:12',
        email: 'required|email',
        password: 'required|min:6',
        dob: 'required',
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
      showPassword: false,
      sectors: [],
      step_1: 'step_1',
      step_2: 'step_2',
      currentStep: 'step_1',
      reg_in_submission: false
    }
  },
  components: {
    AlertForm,
    BaseDropdown
  },

  methods: {

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
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

    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
      this.authStore.isloggedIn = true
      this.$router.push({ name: 'community' })
    },

    handleError(errors) {
      if (errors.email && errors.email.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.email[0])
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.zone_id[0])
      }
    },

    async registerForm() {
      this.alertStore.setAlert(
        AlertStates.PROCESSING,
        'please wait we are creating your account...'
      )

      try {
        await registerUser(this.formData, this.authStore, this.handleSuccess, this.handleError)
      } catch (error) {
        console.log(error)
      }
    }
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

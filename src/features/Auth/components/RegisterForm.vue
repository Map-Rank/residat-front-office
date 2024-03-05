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
          <div class="relative w-full">
            <label>Password</label>
            <div class="flex items-center border border-gray-300 rounded overflow-hidden">
              <vee-field
                name="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
                placeholder="Password"
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
            <label>Confirm Password</label>
            <div class="flex items-center border border-gray-300 rounded overflow-hidden">
              <vee-field
                name="confirm_password"
                v-model="formData.confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                :rules="schema.confirm_password"
                id="confirm_password"
                class="w-full py-2 focus:outline-none px-4 text-gray-800 transition-colors duration-200 ease-in-out block flex-1 min-w-0"
                placeholder="Confirm Password"
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

        <div class="flex flex-row space-x-4 justify-between">
          <div class="w-1/2">
            <label class="inline-block mb-2">Choose Your Region</label>
            <div v-if="isLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
              v-if="!isLoading"
              :options="regions"
              @selectedOptionId="handleSelectedRegionIdChange"
              @functionIdParams="getDivisions"
            />
          </div>
          <div class="w-1/2">
            <label class="inline-block mb-2">Choose Your Division</label>
            <div v-if="isDivisionLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <BaseDropdown
              v-if="!isLoading && !isDivisionLoading"
              @selectedOptionId="handleSelectedDivisionIdChange"
              :options="divisions"
              @functionIdParams="getSub_divisions"
            />
          </div>
        </div>

        <div class="w-full">
          <label class="inline-block mb-2">Choose your Sub-division</label>
          <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <BaseDropdown
            @selectedOptionId="handleSelectedSubdivisionIdChange"
            v-if="!isLoading && !isSubdivisionLoading"
            :options="sub_divisions"
          />
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
          <div v-if="isLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <div v-if="sectors || !isLoading" class="grid grid-cols-3 gap-7 content-between">
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
import useAuthStore from '../../../stores/auth'
import useSectorStore from '@/stores/sectorStore.js'
import useZoneStore from '@/stores/zoneStore.js'
import { registerUser } from '../services/authService'
import { useRouter } from 'vue-router'
import { AlertStates } from '@/components'
import useAlertStore from '@/stores/alertStore'
import AlertForm from '@/components/common/AlertFrom/AlertForm.vue'
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { getZones } from '@/services/zoneService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'

export default {
  name: 'RegisterForm',

  async created() {
    const sectorStore = useSectorStore()
    const zoneSector = useZoneStore()

    try {
      this.isLoading = true
      await this.getRegions()
      this.sectors = sectorStore.getAllSectors
      this.zones = zoneSector.getAllZones
    } catch (error) {
      console.error('Failed to load sector:', error)
    } finally {
      this.isLoading = false
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
      subDivision_id: '',
      region_id: '',
      division_id: '',
      zone_id:'',
      zones: {
        region_id: '6',
        division_id: '1',
        subDivision_id: '1'
      },
      regions: [
        {
          id: 0,
          name: 'Choose a region',
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      divisions: [
        {
          id: 0,
          name: 'Choose a division',
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      sub_divisions: [
        {
          id: 0,
          name: 'Choose a sub-division',
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      isLoading: false,
      isDivisionLoading: false,
      isSubdivisionLoading: false,
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
        zone: '',
        tos: true
      },
      showPassword: false,
      showConfirmPassword: false,
      sectors: [],
      step_1: 'step_1',
      step_2: 'step_2',
      currentStep: 'step_1',
      reg_in_submission: false
    }
  },
  components: {
    AlertForm,
    BaseDropdown,
    LoadingIndicator
  },

  methods: {
    async getRegions() {
      try {
        // this.regions = await getZones(2, null)
        this.regions = this.regions.concat(await getZones(2, null))
      } catch (error) {
        console.log(error)
      }
    },

    async getDivisions(parent_id) {
      try {
        this.isDivisionLoading = true
        // this.divisions = await getZones(null, parent_id)
        this.divisions = this.divisions.length > 0 ? [this.divisions[0]] : []
        this.divisions = this.divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isDivisionLoading = false
      }
    },

    async getSub_divisions(parent_id) {
      this.isSubdivisionLoading = true
      try {
        this.sub_divisions = this.sub_divisions.length > 0 ? [this.sub_divisions[0]] : []
        this.sub_divisions = this.sub_divisions.concat(await getZones(null, parent_id))
      } catch (error) {
        console.log(error)
      } finally {
        this.isSubdivisionLoading = false
      }
    },

    handleSelectedOptionIdChange(selectedOptionId) {
      this.zone_id = selectedOptionId
      return selectedOptionId
    },
    handleSelectedRegionIdChange(selectedOptionId) {
      this.region_id = selectedOptionId
      console.log('region id' + selectedOptionId)
      // this.zones.region_id = selectedOptionId
    },
    handleSelectedDivisionIdChange(selectedOptionId) {
      this.division_id = selectedOptionId
      console.log('division id' + selectedOptionId)
      // this.zones.region_id = selectedOptionId
    },
    handleSelectedSubdivisionIdChange(selectedOptionId) {
      console.log('sub id' + selectedOptionId)
      this.subDivision_id = selectedOptionId
      this.formData.zone = selectedOptionId
      // this.zones.region_id = selectedOptionId
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
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

    handleEmailNotVerified() {
      this.alertStore.setAlert(AlertStates.ERROR, 'Check your email to verifie your mail')
      this.$router.push({ name: 'email-verification' })
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

      if (this.subDivision_id == '') {
        this.alertStore.setAlert(AlertStates.ERROR, 'Please select your subdivision')

        return
      }

      this.alertStore.setAlert(
        AlertStates.PROCESSING,
        'please wait we are creating your account...'
      )

      try {
        await registerUser(
          this.formData,
          this.authStore,
          this.handleSuccess,
          this.handleError,
          this.handleSuccess
        )
      } catch (error) {
        console.log(error)
      }
    }
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
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>

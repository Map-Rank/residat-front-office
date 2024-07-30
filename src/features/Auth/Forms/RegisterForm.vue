<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="flex-col">
 
    <vee-form ref="form" :validation-schema="schema" @submit="registerForm">
      <div class="flex-col space-y-6" v-if="this.currentStep === this.step_1">
        <div class="flex-col space-y-6">
          <h2 class="text-center uppercase">{{ $t('personal_information') }}</h2>
          <!-- First Name -->
          <div class="mb-6">
            <label class="inline-block mb-4">{{ $t('first_name') }}</label>
            <vee-field
              name="first_name"
              v-model="formData.first_name"
              :rules="schema.first_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('enter_first_name')"
            />
            <ErrorMessage class="text-danger-normal" name="first_name" />
          </div>

          <!-- Second Name -->
          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('second_name') }}</label>
            <vee-field
              name="last_name"
              v-model="formData.last_name"
              :rules="schema.last_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('enter_second_name')"
            />
            <ErrorMessage class="text-danger-normal" name="last_name" />
          </div>


          <!-- Description  -->
          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('occupation') }}</label>
            <vee-field
              name="description"
              v-model="formData.description"
              :rules="schema.description"
              as="textarea"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('occupation')"
            />
            <ErrorMessage class="text-danger-normal" name="description" />
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('email') }}</label>
            <vee-field
              name="email"
              :rules="schema.email"
              v-model="formData.email"
              type="email"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('enter_email')"
            />
            <ErrorMessage class="text-danger-normal" name="email" />
          </div>

          <!-- phone -->

          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('phone') }}</label>
            <vee-field
              name="phone"
              v-model="formData.phone"
              :rules="schema.phone"
              as="input"
              type="tel"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('enter_phone_number')"
            />
            <ErrorMessage class="text-danger-normal" name="phone" />
          </div>


          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('date_of_birth') }}</label>
            <vee-field
              name="dob"
              v-model="formData.date_of_birth"
              :rules="schema.dob"
              as="input"
              v-mask="'##/##/####'"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('select_date_of_birth')"
            />
            <ErrorMessage class="text-danger-normal" name="dob" />
          </div>

          <!-- User Gender  -->
          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('gender') }}</label>
            <select
              v-model="formData.gender"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            >
              <option value="">{{ $t('select_gender') }}</option>
              <option value="male">{{ $t('male') }}</option>
              <option value="female">{{ $t('female') }}</option>
            </select>
          </div>

          <!-- Password -->
          <div class="relative w-full">
            <label>{{$t('password')}}</label>
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
                name="confirm_password"
                v-model="formData.confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                :rules="schema.confirm_password"
                id="confirm_password"
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

            <ErrorMessage class="text-danger-normal" name="confirm_password" />
          </div>

          <div class="sm:px-">
            <div class="flex justify-center">
              <button
                @click.prevent="nextStep()"
                class="block w-full capitalize bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
              >
              {{ $t('next') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-col space-y-6" v-if="this.currentStep === this.step_2">
        <h2 class="text-center uppercase">{{ $t('specific_information') }}</h2>

        <div class="mb-6">
          <label class="inline-block mb-2">{{ $t('profile_picture') }}</label>
          <input
            type="file"
            @change="onFileChange"
            accept="image/*"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          />
          <ErrorMessage class="text-danger-normal" name="avatar" />

          <div v-if="formData.avatar" class="mt-4 grid justify-center">
            <p class="mb-2">{{ $t('preview_picture') }}:</p>
            <div class="w-24 h-24 rounded-full overflow-hidden">
              <img
                :src="imageUrl"
                alt="Profile Picture Preview"
                class="w-full rounded-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-row space-x-4 justify-between">
          <div class="w-1/2">
            <label class="inline-block mb-2">{{ $t('choose_your_region') }}</label>
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
            <label class="inline-block mb-2">{{ $t('choose_your_division') }}</label>
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
          <label class="inline-block mb-2">{{ $t('choose_your_subdivision') }} </label>
          <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <BaseDropdown
            @selectedOptionId="handleSelectedSubdivisionIdChange"
            v-if="!isLoading && !isSubdivisionLoading"
            :options="sub_divisions"
          />
        </div>

        <div>
          <label class="inline-block mb-2">{{ $t('chose_langauge') }}</label>
          <BaseDropdown
          v-if="!isLoading && !isSubdivisionLoading"
          :options="langauge"
        />
        </div>

        <div class="mb-4">
          <div class="grid mb-5">
            <label class="inline-block mb-2">{{ $t('sector') }}</label>
            <span>{{ $t('select_your_sector_of_interest') }}</span>
          </div>
          <div v-if="isLoading" class="flex h-full justify-center">
            <LoadingIndicator />
          </div>
          <div
            v-if="sectors || !isLoading"
            class="grid grid-cols-2 sm:grid-cols-3 gap-7 content-between"
          >
            <div v-for="(sector, index) in sectors" :key="index" class="flex mb-2">
              <vee-field
                :name="sector.name"
                type="checkbox"
                v-model="formData.selectedSectors"
                :id="sector.name"
                class="custom-checkbox rounded text-primary-normal focus:ring-primary-light"
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
            :rules="schema.tos"
            class="custom-checkbox w-4 h-4 float-left -ml-6 mt-1 rounded"
          />
          <label class="inline-block">{{ $t('accept_terms_of_service') }}</label> <br />
          <ErrorMessage class="text-red-600" name="tos" />
        </div>

        <div class="flex flex-col sm:my-5 sm:flex-row sm:mb-5 space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            @click.prevent="previousStep()"
            class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
            :disabled="this.isLoading"
          >
{{ $t('previous') }}
          </button>

          <button
            type="submit"
            @click="registerForm()"
            :class="
              this.isLoadingButton
                ? 'bg-gray-400 cursor-wait '
                : 'bg-secondary-normal hover:bg-secondary-hover'
            "
            class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
            :disabled="this.isLoadingButton"
          >
            {{ $t('sign_up') }}
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
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { getZones } from '@/services/zoneService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import { useToast } from "vue-toastification";
import {mask} from 'vue-the-mask'
import { handleSingleFileUpload } from '@/utils/image.js';


export default {
  name: 'RegisterForm',
components: {
  BaseDropdown,
  LoadingIndicator
},

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
  directives: {mask},

  data() {
    const router = useRouter()
    const authStore = useAuthStore()
    const toast = useToast();

    return {
      authStore,
      toast,
      router,
      subDivision_id: '',
      region_id: '',
      division_id: '',
      zone_id: '',
      zones: {
        region_id: '6',
        division_id: '1',
        subDivision_id: '1'
      },
      regions: [
        {
          id: 0,
          name: this.$t('choose_your_region'),
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      divisions: [
        {
          id: 0,
          name: this.$t('choose_your_division'),
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      sub_divisions: [
        {
          id: 0,
          name: this.$t('choose_your_subdivision'),
          banner: null,
          created_at: '2024-01-05T13:43:24.000000Z'
        }
      ],
      langauge: [
        {
          id: 0,
          name: this.$t('en'),
        },
        {
          id: 1,
          name: this.$t('fr'),
        }
      ],
      isLoading: false,
      isLoadingButton: false,
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
        description: 'required|min:3|max:2000',
        phone: 'required|min:3|max:22',
        email: 'required|email',
        password: 'required|min:6',
        dob: 'required|dobNotBelowTenYears',
        confirm_password: 'required|passwords_mismatch:@password',
        tos: 'required|tos',
        company_name: 'min:3|max:50',
        location: 'required|min:3|max:50'
      },
      formData: {
        first_name: '',
        last_name: '',
        description: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        location: '',
        country: '',
        gender: '',
        date_of_birth: '2023-12-06T13:10:59',
        avatar: '',
        selectedSectors: [],
        zone: '',
        tos: false
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

  computed: {
    imageUrl() {
      if (this.formData.avatar) {
        return URL.createObjectURL(this.formData.avatar)
      } else {
        return null
      }
    }
  },

  methods: {

    async onFileChange(e) {
      try {
        const file = await handleSingleFileUpload(e, 1, ['image/jpeg', 'image/png'], true);

   

        this.formData.avatar = file;
      } catch (error) {
        this.formData.avatar = null;
        this.toast.error(error.message);
      }
    },
    async getRegions() {
      try {
        this.regions = this.regions.concat(await getZones(2, null))
      } catch (error) {
        console.log(error)
      }
    },

    async getDivisions(parent_id) {
      try {
        this.isDivisionLoading = true
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
    },
    handleSelectedDivisionIdChange(selectedOptionId) {
      this.division_id = selectedOptionId
    },
    handleSelectedSubdivisionIdChange(selectedOptionId) {
      this.subDivision_id = selectedOptionId
      this.formData.zone = selectedOptionId
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    async nextStep() {
console.log(typeof this.formData.date_of_birth);

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
        } 
      } catch (error) {
        console.error('Validation error:', error)
      }
    },

    previousStep() {
      this.currentStep = this.currentStep === this.step_2 ? this.step_1 : this.step_2
    },

    handleEmailNotVerified() {
      this.toast.error('Check your email to verifie your mail');
      this.$router.push({ name: 'email-verification' })
    },

    handleSuccess() {
      this.isLoadingButton = false
      console.log('Current User:', this.authStore.getCurrentUser)
      this.authStore.isloggedIn = true
      this.$router.push({ name: 'community' })
    },

    handleError(errors) {
      this.isLoadingButton = false
      if (errors.email && errors.email.length > 0) {
        this.toast.error(errors.email[0]);
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.toast.error(errors.zone_id[0]);
      }
    },

async registerForm() {
  const validationResults = await Promise.all(['tos'].map((field) => this.$refs.form.validateField(field)));

  if (validationResults.every((result) => result.valid)) {
    if (this.subDivision_id === '') {
      this.toast.error(this.$t('please_select_your_subdivision'));
      return;
    }
    
    
    try {
      // this.isLoading = true
      this.isLoadingButton = true
      this.toast.info(this.$t('please_wait_creating_account'));
      await registerUser(this.formData, this.authStore, this.handleSuccess, this.handleError, this.handleEmailNotVerified);
    } catch (error) {
      // this.isLoading = false
      this.isLoadingButton = false
      console.log(error);
    }
  } 
}

  }
}
</script>

<style>
label {
  font-size: 14px;
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


.custom-checkbox {
  position: relative;
  width: 18px; /* Ensure width */
  height: 18px; /* Ensure height */
  background-color: #f5f5f5; /* Default background color */
  border: 1px solid #666565; /* Border for visibility */
  appearance: none; /* Remove default styles */
  outline: none; /* Remove default outline */
  cursor: pointer;
}

.custom-checkbox:checked {
  background-color: #5c7d3b; /* Background color when checked */
  border-color: #5c7d3b; /* Border color when checked */
}

.custom-checkbox::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 5px;
  width: 2px;
  height: 6px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  display: none;
}

.custom-checkbox:checked::after {
  display: block;
}

</style>

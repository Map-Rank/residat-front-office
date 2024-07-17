eslint-disable vue/no-parsing-error
<template>
  <div class="flex-col">
    <vee-form ref="form" :validation-schema="schema" @submit="registerForm">
      <div class="flex-col space-y-6" v-if="this.currentStep === this.step_1">
        <div class="flex-col space-y-6">
          <h2 class="text-center uppercase">{{ $t('institution_information') }}</h2>

          <!-- Company -->
          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('company_name') }}</label>
            <vee-field
              name="company_name"
              :rules="schema.company_name"
              v-model="formData.company_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('company_name')"
            />
            <ErrorMessage class="text-danger-normal" name="company_name" />
          </div>

          <!-- First Name -->
          <div class="mb-6">
            <label class="inline-block mb-4">{{ $t('owner_name') }}</label>
            <vee-field
              name="owner_name"
              v-model="formData.owner_name"
              :rules="schema.owner_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('enter_owner_name')"
            />
            <ErrorMessage class="text-danger-normal" name="owner_name" />
          </div>

          <!-- Description  -->
          <div class="mb-6">
            <label class="inline-block mb-2">{{ $t('description') }}</label>
            <vee-field
              name="description"
              v-model="formData.description"
              :rules="schema.description"
              as="textarea"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              :placeholder="$t('description')"
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
            @change="onPickAvatar"
            accept="image/*"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          />
          <ErrorMessage class="text-danger-normal" name="profile_picture" />

          <div v-if="formData.profile_picture" class="mt-4 grid justify-center">
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

        <div class="mb-6">
          <label class="inline-block mb-2">{{ $t('upload_official_doc') }}</label>
          <input
            type="file"
            @change="onPickDocuments"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          />
          <ErrorMessage class="text-danger-normal" name="documents" />
      
          <div v-if="formData.documents.length > 0" class="mt-4">
            <p class="mb-2">{{ $t('preview_documents') }}:</p>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(doc, index) in documentPreviews" :key="index" class="overflow-hidden">
                <div class="p-2 border rounded bg-red-400 ">
                  <p class="truncate text-white">{{ doc.name }}</p>
                  <img v-if="doc.type.startsWith('image/')" :src="doc.url" alt="Document Preview" class=" w-full h-24 object-cover doc">
                  <p v-else class="text-center text-sm">{{ doc.type }}</p>
                </div>
              </div>
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

      

        <div class="mb-3 pl-6">
          <!-- TOS -->

          <vee-field
            type="checkbox"
            value="1"
            name="tos"
            v-model="formData.tos"
            :rules="schema.tos"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
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
              this.isLoading
                ? 'bg-gray-400 cursor-wait '
                : 'bg-secondary-normal hover:bg-secondary-hover'
            "
            class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
            :disabled="this.isLoading"
          >
            {{ $t('submit_request') }}
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
import { institutionalRequest } from '../services/authService'
import { useRouter } from 'vue-router'
import BaseDropdown from '@/components/base/BaseDropdown.vue'
import { getZones } from '@/services/zoneService.js'
import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'InstitutionRegister',

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
    const toast = useToast()

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
      isLoading: false,
      isDivisionLoading: false,
      isSubdivisionLoading: false,
      dropdownOptions: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ],
      schema: {
        name: 'required|min:3|max:50',
        owner_name: 'required|min:3|max:50',
        last_name: 'required|min:3|max:50',
        description: 'required|min:3|max:2000',
        phone: 'required|min:3|max:20',
        email: 'required|email',
        password: 'required|min:6',
        dob: 'required|dobNotBelowTenYears',
        confirm_password: 'required|passwords_mismatch:@password',
        tos: 'required|tos',
        company_name: 'required|min:3|max:50',
        location: 'required|min:3|max:50'
      },
      formData: {
        owner_name: '',
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
        profile_picture: '',
        documents: [],
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
  components: {
    BaseDropdown,
    LoadingIndicator
  },

  computed: {
    imageUrl() {
      if (this.formData.profile_picture) {
        return URL.createObjectURL(this.formData.profile_picture)
      } else {
        return null
      }
    }
  },

  methods: {
    onPickAvatar(e) {
      const file = e.target.files[0]
      const isValidSize = file.size <= 2000 * 1024

      if (file && isValidSize) {
        this.formData.profile_picture = file
      } else {
        this.formData.profile_picture = null
        this.toast.error('The profile_picture selected exceed the specified max size')
      }
    },
    onPickDocuments(e) {
      const files = Array.from(e.target.files);
      this.formData.documents = [];
      this.documentPreviews = [];

      files.forEach(file => {
        if (this.validateFile(file)) {
          this.formData.documents.push(file);
          this.documentPreviews.push({
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
          });
        } else {
          this.toast.error(`${file.name} exceeds the size limit or is not a supported format`);
        }
      });
    },


    validateFile(file) {
      const maxFileSize = 2000 * 1024; 
      const acceptedTypes = ['application/pdf', 'application/msword', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      return file.size <= maxFileSize && acceptedTypes.includes(file.type);
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
      const fieldsToValidate = ['email', 'phone','company_name']

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
      this.toast.error('Check your email to verifie your mail')
      this.$router.push({ name: 'email-verification' })
    },

    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
      this.authStore.isloggedIn = true
      this.$router.push({ name: 'community' })
    },

    handleError(errors) {
      this.isLoading = false
      if (errors.email && errors.email.length > 0) {
        this.toast.error(errors.email[0])
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.toast.error(errors.zone_id[0])
      }
    },

    async registerForm() {
      const validationResults = await Promise.all(
        ['tos'].map((field) => this.$refs.form.validateField(field))
      )

      if (validationResults.every((result) => result.valid)) {
        if (this.region_id === '') {
          this.toast.error(this.$t('please_select_your_subdivision'))
          return
        }

        this.toast.error(this.$t('please_wait_creating_account'))

        try {
          this.isLoading = true
          await institutionalRequest(
            this.formData,
            this.authStore,
            this.handleSuccess,
            this.handleError,
            this.handleEmailNotVerified
          )
        } catch (error) {
          this.isLoading = false
          console.log(error)
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

.doc {
  max-width: 100%;
  height: auto;
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

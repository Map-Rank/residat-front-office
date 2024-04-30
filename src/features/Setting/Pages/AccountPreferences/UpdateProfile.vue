<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class=" w-full   bg-primary-light">
      <div class="flex-col bg-white  md:my-5 rounded-lg  p-5 md:p-10 mx-1 md:mx-4">
        <div>
          <AlertForm></AlertForm>
        </div>
  
        <vee-form ref="form" :validation-schema="schema">
            <div class="flex-col space-y-6" >
                <div class="flex-col space-y-6">
                  <h2 class="text-center text-xl md:text-3xl lg:text-4xl ">PERSONAL INFORMATION</h2>

                  <div class="mb-6">
                    <label class="inline-block mb-2 text">Profile Picture</label>
                    <input type="file" @change="onFileChange" accept="image/*" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"/>
                    <ErrorMessage class="text-danger-normal" name="avatar" />
                  
                    <div v-if="formData.avatar" class="mt-4 grid  justify-center">
                      <p class="mb-2">Preview Picture:</p>
                      <div class="w-24 h-24 rounded-full overflow-hidden">
                        <img :src="imageUrl" alt="Profile Picture Preview" class="w-full rounded-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

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
        
                  <TitleSubtitle label="Location" message="You can change your location" />


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
        
                  <div class="sm:px-">
                    <div class="flex justify-center">
                      <button
                        @click.prevent="submitForm()"
                        class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
                      >
                        Update Information
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
  import useZoneStore from '@/stores/zoneStore.js'
  import { useRouter } from 'vue-router'
  import { AlertStates } from '@/components'
  import useAlertStore from '@/stores/alertStore'
  import AlertForm from '@/components/common/AlertFrom/AlertForm.vue'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'
  import { getZones } from '@/services/zoneService.js'
  import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
  import TitleSubtitle from '@/components/base/TitleSubtitle.vue'
  import {UpdateUser} from '@/features/Auth/services/authService.js'
  
  export default {
  name: 'UpdateProfile',

  async created() {
    const zoneSector = useZoneStore()
    const authStore = useAuthStore()

    this.formData = authStore.user
    console.log(this.formData);
    try {
      this.isLoading = true
      await this.getRegions()
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
        id:'',
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
        avatar:'',
        selectedSectors: [],
        zone: '',
        isImageFromLocal:false,
        tos: true,
        token:'',
      },
      sectors: [],
      reg_in_submission: false
    }
  },
  components: {
    AlertForm,
    BaseDropdown,
    LoadingIndicator,
    TitleSubtitle
  },

  computed: {
    imageUrl() {
      if(this.isImageFromLocal){
        return  URL.createObjectURL(this.formData.avatar);
      }else{
        return  this.formData.avatar;
      }
  },
  },
  methods: {
    onFileChange(e) {
      this.isImageFromLocal = true
    const file = e.target.files[0];
    if (file) {
      this.formData.avatar = file;
      // console.log(this.formData.avatar)
    } else {
      this.formData.avatar = null;
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

 

  

    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
      // this.authStore.isloggedIn = true
      this.$router.push({ name: 'account-preferences' })
    },

    handleError(errors) {
      if (errors.email && errors.email.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.email[0])
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.zone_id[0])
      }
    },

    async submitForm() {

      if (this.subDivision_id == '') {
        this.alertStore.setAlert(AlertStates.ERROR, 'Please select your subdivision')

        return
      }

  if (!(this.formData.avatar instanceof File)) {
    console.log('====> is not of type file');
    this.formData.avatar = null; 
  } 
  

      this.alertStore.setAlert(
        AlertStates.PROCESSING,
        'please wait we are creating your account...'
      )

      try {
        await UpdateUser(
          this.formData,
          this.authStore,
          this.handleSuccess,
          this.handleError,
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

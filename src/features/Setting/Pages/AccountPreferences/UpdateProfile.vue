<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class=" w-full   bg-primary-light">
      <div class="flex-col bg-white  md:my-5 rounded-lg  p-5 md:p-10 mx-1 md:mx-4">
   
  
        <vee-form ref="form" :validation-schema="schema">
            <div class="flex-col space-y-6" >
                <div class="flex-col space-y-6">
                  <h2 class="text-center text-xl md:text-3xl lg:text-4xl ">{{ $t('personal_information') }}</h2>

                  <div class="mb-6">
                    <label class="inline-block mb-2 text">{{ $t('profile_picture') }}</label>
                    <input type="file" @change="onFileChange" accept="image/*" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"/>
                    <ErrorMessage class="text-danger-normal" name="avatar" />
                  
                    <div v-if="formData.avatar" class="mt-4 grid  justify-center">
                      <p class="mb-2">{{ $t('preview_picture') }}:</p>
                      <div class="w-24 h-24 rounded-full overflow-hidden">
                        <img :src="imageUrl" alt="Profile Picture Preview" class="w-full rounded-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

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
                      <option value="other">{{ $t('other') }}</option>
                    </select>
                  </div>
        
        
        
                  <div class="sm:px-">
                    <div class="flex justify-center">
                      <button
                        @click.prevent="submitForm()"
                        class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
                      >
                      {{ $t('update_information') }}
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
  import {UpdateUser} from '@/features/Auth/services/authService.js'
  import { useToast } from "vue-toastification";
  
  export default {
  name: 'UpdateProfile',

  async created() {
    const zoneSector = useZoneStore()
    const authStore = useAuthStore()
    
    this.formData = authStore.user
    // console.log(this.formData);
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
    const toast = useToast();

    return {
      authStore,
      toast,
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
    } else {
      this.formData.avatar = null;
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


 

  

    handleSuccess() {
      console.log('Current User:', this.authStore.getCurrentUser)
      this.toast.success( this.$t('update_profile_success'),{timeout:2000});
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


  if (!(this.formData.avatar instanceof File)) {
    this.formData.avatar = null; 
  } 

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

<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="flex-col bg-white my-5 rounded-lg w-full md:w-3/4 lg:w-1/2 p-10 mx-4">
      
  
        <vee-form ref="form" :validation-schema="schema" @submit="createBroadcast">
          <div class="flex-col space-y-6">
            <h2 class="text-center">SEND ALERTS</h2>
  
            <!-- First Name -->
            <div class="mb-6">
              <p class="inline-block mb-4">Title</p>
              <vee-field
                name="title"
                v-model="formData.title"
                :rules="schema.title"
                as="input"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Event Title"
              />
              <ErrorMessage class="text-danger-normal" name="title" />
            </div>
            <div class="mb-6">
              <p class="inline-block mb-4">Content</p>
              <vee-field
                name="content"
                v-model="formData.content"
                :rules="schema.content"
                as="textarea"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Event Description"
              ></vee-field>
              <ErrorMessage class="text-danger-normal" name="content" />
            </div>
  
            <div class="mb-6">
              <p class="inline-block mb-2">Banner</p>
              <input
                type="file"
                @change="onFileChange"
                accept="image/*"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              />
              <ErrorMessage class="text-danger-normal" name="media" />
  
              <div v-if="formData.media" class="mt-4 grid justify-center">
                <p class="mb-2">Event Banner Preview :</p>
                <div class="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    :src="imageUrl"
                    alt="Profile Picture Preview"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
  
            <div class="flex flex-row space-x-4 justify-between">
              <div class="w-1/2">
                <p class="inline-block mb-2">Choose Your Region</p>
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
                <p class="inline-block mb-2">Choose Your Division</p>
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
              <p class="inline-block mb-2">Choose your Sub-division</p>
              <div v-if="isSubdivisionLoading" class="flex h-full justify-center">
                <LoadingIndicator />
              </div>
              <BaseDropdown
                @selectedOptionId="handleSelectedSubdivisionIdChange"
                v-if="!isLoading && !isSubdivisionLoading"
                :options="sub_divisions"
              />
            </div>
  
            <div
              class="flex flex-col sm:my-5 sm:flex-row sm:mb-5 space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <button
                type="Create Event"
                @click="createBroadcast()"
                class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
                :class="
                this.isLoadingBtn
                  ? 'bg-gray-400 cursor-wait '
                  : 'bg-secondary-normal hover:bg-secondary-hover'
              "
              :disabled="this.isLoadingBtn"
              >
                Create Alert
              </button>
            </div>
            <div>
            </div>
          </div>
        </vee-form>
      </div>
    </div>
  </template>
  
  <script>
  import useAuthStore from '../../../stores/auth'
  import useSectorStore from '@/stores/sectorStore.js'
  import useZoneStore from '@/stores/zoneStore.js'
  import { useRouter } from 'vue-router'
  import useAlertStore from '@/stores/alertStore'
  import BaseDropdown from '@/components/base/BaseDropdown.vue'
  import { getZones } from '@/services/zoneService.js'
  import LoadingIndicator from '@/components/base/LoadingIndicator.vue'
  import { useToast } from "vue-toastification";
  import {createNotification} from '@/services/notificationService.js' 
  
  export default {
    name: 'BraodcastNotification',
  
    async created() {
      if(this.preEventTitle != null){
            this.formData.title = this.preEventTitle
          }
  
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
  
    props: ['postId','preEventTitle'],
    data() {
      const router = useRouter()
      const authStore = useAuthStore()
      const alertStore = useAlertStore()
      const toast = useToast();
  
      return {
        isCreatingEvent: false,
        authStore,
        alertStore,
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
        isLoadingBtn: false,
        isDivisionLoading: false,
        isSubdivisionLoading: false,
        dropdownOptions: [
          { p: 'Option 1', value: 'option1' },
          { p: 'Option 2', value: 'option2' }
        ],
        schema: {
          title: 'required|min:3|max:50',
          content: 'required|min:3|max:250',
          location: 'required|min:3|max:50'
        },
        formData: {
          title: '',
          content: '',
          location: '',
          media: null,
          zone_id: '',
          tos: true
        },
  
        sectors: [],
        reg_in_submission: false
      }
    },
    components: {
      BaseDropdown,
      LoadingIndicator
    },
  
    computed: {
      imageUrl() {
        if (this.formData.media) {
          return URL.createObjectURL(this.formData.media)
        } else {
          return null
        }
      }
    },
  
    methods: {
      
      onFileChange(e) {
        const file = e.target.files[0]
        if (file) {
          this.formData.media = file
        } else {
          this.formData.media = null
        }
      },
      async getRegions() {
        try {
          this.regions = this.regions.concat(await getZones(2, null))
        } catch (error) {
          console.log(error)
        }
      },
  
      updateSectorId(sectorId) {
        let id =sectorId
        if (this.formData.selectedSectorId.includes(sectorId)) {
          // Remove sector ID if already selected
          this.formData.selectedSectorId = this.formData.selectedSectorId.filter(id => id !== sectorId);
        } else {
          // Add sector ID if not already selected
          this.formData.selectedSectorId.push(id);
          this.formData.sector_id = id
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
        this.formData.zone_id = selectedOptionId
      },
      handleSelectedDivisionIdChange(selectedOptionId) {
        this.division_id = selectedOptionId
        this.formData.zone_id = selectedOptionId
      },
      handleSelectedSubdivisionIdChange(selectedOptionId) {
        this.subDivision_id = selectedOptionId
        this.formData.zone_id = selectedOptionId
      },
  
      handleSuccess() {
        this.isCreatingEvent = false;
        this.resetForm()
        this.$router.push({ name: 'chat-room' })
      },
  
      resetForm() {
          this.formData.title= '',
          this.formData.content= '',
          this.formData.location= '',
          this.formData.media= '',
          this.formData.zone_id= ''
      },
      
      handleError() {
        this.isLoadingBtn = false;
      },
      
      async createBroadcast() {
        this.isLoadingBtn = true;
        const fieldsToValidate = ['title', 'content']
        
        try {
          const validationResults = await Promise.all(
            fieldsToValidate.map((field) => this.$refs.form.validateField(field))
          )
          
          // Check if all fields are valid
          const allFieldsValid = validationResults.every((result) => result.valid)
          
          // Proceed to the next step only if all fields are valid
          if (allFieldsValid) {
            if (this.formData.zone_id == '') {
              this.toast.error( 'Please select a Region,division or subdivision');
              this.isLoadingBtn = false;
              
              return
            }
            if (this.formData.media == null) {
              this.toast.error('Please select a Banner');
              this.isLoadingBtn = false;
              
              return
            }
 
            this.toast.info( 'please wait we are creating your Alerts...');
  
            let response = await createNotification(this.formData,this.authStore, this.handleSuccess, this.handleError)
            
            console.log(response)
            
          } else {
            this.isLoadingBtn = false;
            console.log('Some fields are invalid.')
          }
        } catch (error) {
          this.isLoadingBtn = false;
          
          console.error('Validation error:', error)
        }
      }
    }
  }
  </script>
  
  <style>
  p {
    color: var(--content-secondary, #374151);
  
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
  
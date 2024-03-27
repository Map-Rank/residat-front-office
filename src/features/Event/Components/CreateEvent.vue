<!-- eslint-disable vue/no-parsing-error -->
<template>

  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="flex-col bg-white my-5 rounded-lg md:w-1/2 p-10 mx-4 ">
      <div>
        <AlertForm></AlertForm>
      </div>
  
      <vee-form ref="form" :validation-schema="schema" @submit="createEvent">
        <div class="flex-col space-y-6">
          <h3 class="text-center">CREATE AN EVENT</h3>
  
          <!-- First Name -->
          <div class="mb-6">
            <p class="inline-block mb-4">Event Title</p>
            <vee-field
              name="event_title"
              v-model="formData.event_title"
              :rules="schema.event_title"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Event Title"
            />
            <ErrorMessage class="text-danger-normal" name="event_title" />
          </div>
  
          <div class="mb-6">
            <p class="inline-block mb-2">Event Date</p>
            <vee-field
              name="event_date"
              v-model="formData.date_of_birth"
              :rules="schema.event_date"
              as="input"
              type="date"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Select date of event"
            />
            <ErrorMessage class="text-danger-normal" name="event_date" />
          </div>
  
          <!-- Company -->
          <div class="mb-6">
            <p class="inline-block mb-2">Organiser Name</p>
            <vee-field
              name="organiser_name"
              :rules="schema.organiser_name"
              v-model="formData.organiser_name"
              as="input"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Company Name"
            />
            <ErrorMessage class="text-danger-normal" name="organiser_name" />
          </div>
  
          <div class="mb-6">
            <p class="inline-block mb-2">Event Banner</p>
            <input
              type="file"
              @change="onFileChange"
              accept="image/*"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            />
            <ErrorMessage class="text-danger-normal" name="avatar" />
  
            <div v-if="formData.avatar" class="mt-4 grid justify-center">
              <p class="mb-2">Event Banner Preview :</p>
              <div class="w-24 h-24 rounded-full overflow-hidden">
                <img
                  :src="imageUrl"
                  alt="Profile Picture Preview"
                  class="w-full  h-full object-cover"
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
  
          <div class="mb-4">
            <div class="grid mb-5">
              <p class="inline-block mb-2">Sector</p>
              <span>Select your sector of interest</span>
            </div>
            <div v-if="isLoading" class="flex h-full justify-center">
              <LoadingIndicator />
            </div>
            <div
              v-if="sectors || !isLoading"
              class="grid grid-cols-2 md:grid-cols-3 gap-3 content-between"
            >
              <div v-for="(sector, index) in sectors" :key="index" class="flex ">
                <vee-field
                  :name="sector.name"
                  type="checkbox"
                  v-model="formData.selectedSectors"
                  :id="sector.name"
                  class="rounded text-primary-normal focus:ring-primary-light"
                />
                <p :for="sector.name" class="ml-2 block text-sm text-body-dark">
                  {{ sector.name }}
                </p>
              </div>
            </div>
          </div>
  
  
  
          <div
            class="flex flex-col sm:my-5 sm:flex-row sm:mb-5 space-y-3 sm:space-y-0 sm:space-x-4"
          >
  
            <button
              type="Create Event"
              @click="createEvent()"
              class="block w-full bg-secondary-normal text-white py-1.5 rounded-full transition hover:bg-secondary-hover"
              :disable="reg_in_submission"
            >
              Create Event
            </button>
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
import useAuthStore from "../../../stores/auth";
import useSectorStore from "@/stores/sectorStore.js";
import useZoneStore from "@/stores/zoneStore.js";
import { useRouter } from "vue-router";
import { AlertStates } from "@/components";
import useAlertStore from "@/stores/alertStore";
import AlertForm from "@/components/common/AlertFrom/AlertForm.vue";
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import { getZones } from "@/services/zoneService.js";
import LoadingIndicator from "@/components/base/LoadingIndicator.vue";

export default {
  name: "CreateEvent",

  async created() {
    const sectorStore = useSectorStore();
    const zoneSector = useZoneStore();

    try {
      this.isLoading = true;
      await this.getRegions();
      this.sectors = sectorStore.getAllSectors;
      this.zones = zoneSector.getAllZones;
    } catch (error) {
      console.error("Failed to load sector:", error);
    } finally {
      this.isLoading = false;
    }
  },

  data() {
    const router = useRouter();
    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    return {
      authStore,
      alertStore,
      router,
      subDivision_id: "",
      region_id: "",
      division_id: "",
      zone_id: "",
      zones: {
        region_id: "6",
        division_id: "1",
        subDivision_id: "1",
      },
      regions: [
        {
          id: 0,
          name: "Choose a region",
          banner: null,
          created_at: "2024-01-05T13:43:24.000000Z",
        },
      ],
      divisions: [
        {
          id: 0,
          name: "Choose a division",
          banner: null,
          created_at: "2024-01-05T13:43:24.000000Z",
        },
      ],
      sub_divisions: [
        {
          id: 0,
          name: "Choose a sub-division",
          banner: null,
          created_at: "2024-01-05T13:43:24.000000Z",
        },
      ],
      isLoading: false,
      isDivisionLoading: false,
      isSubdivisionLoading: false,
      dropdownOptions: [
        { p: "Option 1", value: "option1" },
        { p: "Option 2", value: "option2" },
      ],
      schema: {
        event_title: "required|min:3|max:50",
        event_date: "required",
        organiser_name: "min:3|max:50",
        location: "required|min:3|max:50",
      },
      formData: {
        event_title: "",

        event_date: "2023-12-06T13:10:59",
        avatar: "",
        selectedSectors: [],
        zone: "",
        tos: true,
      },

      sectors: [],
      reg_in_submission: false,
    };
  },
  components: {
    AlertForm,
    BaseDropdown,
    LoadingIndicator,
  },

  computed: {
    imageUrl() {
      if (this.formData.avatar) {
        return URL.createObjectURL(this.formData.avatar);
      } else {
        return null;
      }
    },
  },

  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.formData.avatar = file;
        console.log(this.formData.avatar);
      } else {
        this.formData.avatar = null;
      }
    },
    async getRegions() {
      try {
        this.regions = this.regions.concat(await getZones(2, null));
      } catch (error) {
        console.log(error);
      }
    },

    async getDivisions(parent_id) {
      try {
        this.isDivisionLoading = true;
        this.divisions = this.divisions.length > 0 ? [this.divisions[0]] : [];
        this.divisions = this.divisions.concat(await getZones(null, parent_id));
      } catch (error) {
        console.log(error);
      } finally {
        this.isDivisionLoading = false;
      }
    },

    async getSub_divisions(parent_id) {
      this.isSubdivisionLoading = true;
      try {
        this.sub_divisions = this.sub_divisions.length > 0 ? [this.sub_divisions[0]] : [];
        this.sub_divisions = this.sub_divisions.concat(await getZones(null, parent_id));
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubdivisionLoading = false;
      }
    },

    handleSelectedOptionIdChange(selectedOptionId) {
      this.zone_id = selectedOptionId;
      return selectedOptionId;
    },
    handleSelectedRegionIdChange(selectedOptionId) {
      this.region_id = selectedOptionId;
    },
    handleSelectedDivisionIdChange(selectedOptionId) {
      this.division_id = selectedOptionId;
    },
    handleSelectedSubdivisionIdChange(selectedOptionId) {
      this.subDivision_id = selectedOptionId;
      this.formData.zone = selectedOptionId;
    },



    previousStep() {
      this.currentStep = this.currentStep === this.step_2 ? this.step_1 : this.step_2;
    },

    handleEmailNotVerified() {
      this.alertStore.setAlert(
        AlertStates.ERROR,
        "Check your email to verifie your mail"
      );
      this.$router.push({ name: "email-verification" });
    },

    handleSuccess() {
      console.log("Current User:", this.authStore.getCurrentUser);
      this.authStore.isloggedIn = true;
      this.$router.push({ name: "community" });
    },

    handleError(errors) {
      if (errors.email && errors.email.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.email[0]);
      } else if (errors.zone_id && errors.zone_id.length > 0) {
        this.alertStore.setAlert(AlertStates.ERROR, errors.zone_id[0]);
      }
    },

    async createEvent() {

        const fieldsToValidate = [
        "event_title",
      ];

      try {
        const validationResults = await Promise.all(
          fieldsToValidate.map((field) => this.$refs.form.validateField(field))
        );

        // Check if all fields are valid
        const allFieldsValid = validationResults.every((result) => result.valid);

        // Proceed to the next step only if all fields are valid
        if (allFieldsValid) {

                
      if (this.subDivision_id == "") {
        this.alertStore.setAlert(AlertStates.ERROR, "Please select your subdivision");

        return;
      }

      this.alertStore.setAlert(
        AlertStates.PROCESSING,
        "please wait we are creating your account..."
      );

        } else {
          console.log("Some fields are invalid.");
        }
      } catch (error) {
        console.error("Validation error:", error);
      }


    },
  },
};
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

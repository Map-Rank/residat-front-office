<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class=" flex-col ">
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-show="reg_show_alert"
      :class="reg_alert_varient"
    >
      {{ reg_alert_message }}
    </div>

    <vee-form :validation-schema="schema" @submit="registerForm" :initial-values="userData">
      <div 
      class="flex-col space-y-6"
      v-if="this.currentStep === this.step_1">

        <h3 class="text-center">PERSONAL INFORMATION</h3>
        <!-- First Name -->
        <div class="mb-6">
          <label class="inline-block mb-4">First Name</label>
          <vee-field
            name="first_name"
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
            name="second_name"
            :rules="schema.second_name"
            as="input"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Second Name"
          />
          <ErrorMessage class="text-danger-normal" name="second_name" />
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label class="inline-block mb-2">Email</label>
          <vee-field
            name="email"
            :rules="schema.email"
            type="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
          />
          <ErrorMessage class="text-danger-normal" name="email" />
        </div>

        <!-- Telephone -->
        <div class="mb-6">
          <label class="inline-block mb-2">Telephone</label>
          <vee-field
            name="telephone"
            :rules="'required|min:3|max:50|alpha_spaces'"
            as="input"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Second Name"
          />
          <ErrorMessage class="text-danger-normal" name="telephone" />
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label class="inline-block mb-2">Password</label>
          <vee-field name="password" :bails="false" v-slot="{ field, errors }">
            <input
              type="password"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Password"
              v-bind="field"
            />
            <div class="text-danger-normal" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
          <ErrorMessage class="text-danger-normal" name="password" />
        </div>

        <!-- Confirm Password -->
        <div class="mb-6 ">
          <label class="inline-block mb-2">Confirm Password</label>
          <vee-field
            name="confirm_password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password"
          />
          <ErrorMessage class="text-danger-normal" name="confirm_password" />
        </div>

        <button-ui
          label="Next"
          color="bg-secondary-normal"
          textColor="text-white"
          :isRounded="true"
          @clickButton="clickButton()"
        ></button-ui>
      </div>

      <div
      class="flex-col space-y-6"
      v-if="this.currentStep === this.step_2">

        <h3 class="text-center">SPECIFIC INFORMATION</h3>
        <!-- Location -->
        <div class="mb-6">
          <label class="inline-block mb-2">Location</label>
          <vee-field
            name="location"
            :rules="schema.location"
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
            name="location"
            :rules="schema.company_name"
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
                :rules="schema.tos"
                :name="sector.name"
                type="checkbox"
                :id="sector.name"
                class="rounded text-primary-normal focus:ring-primary-light"
              />
              <label :for="sector.name" class="ml-2 block text-sm text-body-dark">
                {{ sector.label }}
              </label>
            </div>
          </div>
        </div>

        <!-- TOS -->
        <div class="mb-3 pl-6">
          <vee-field
            type="checkbox"
            value="1"
            name="tos"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
          />
          <label class="inline-block">Accept terms of service</label> <br />
          <ErrorMessage class="text-red-600" name="tos" />
        </div>

        <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button-ui
            label="Previous"
            color="bg-secondary-normal"
            textColor="text-white"
            :isRounded="true"
            @clickButton="clickButton()"
          ></button-ui>

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
import ButtonUi from '../../../components/base/ButtonUi.vue'
import {mapStores ,mapWritableState} from 'pinia'
import useAuthStore from '../../../stores/auth'

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:50',
        first_name: 'required|min:3|max:50',
        second_name: 'required|min:3|max:50',
        company_name: 'min:3|max:50',
        location: 'required|max:50',
        telephone: 'required|min:3|max:12',
        email: 'required|email',
        age: 'required|min_value:18,max_value:100',
        password: 'required',
        confirm_password: 'required|passwords_mismatch:@password',
        country: 'required|country_excluded:USA',
        tos: 'required|tos'
      },
      userData: {
        country: 'USA'
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
    clickButton() {
      this.currentStep == this.step_1
        ? (this.currentStep = this.step_2)
        : (this.currentStep = this.step_1)
    },

    async registerForm() {

      this.isloggedIn = !this.isloggedIn;
      console.log(this.isloggedIn)
      console.log('clicked')
    }
  },
  components: {
    ButtonUi
  },
  computed:{
    ...mapStores(useAuthStore),
    ...mapWritableState(useAuthStore,['isloggedIn'])
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

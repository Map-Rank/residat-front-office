<!-- eslint-disable vue/no-parsing-error -->
<template>

    <div>
  
      <div
        class="text-white text-center font-bold p-4 rounded mb-4 "
        v-show="reg_show_alert"
        :class="reg_alert_varient"
      >
        {{ reg_alert_message }}
      </div>
  
  
      <vee-form :validation-schema="schema" @submit="registerForm" :initial-values="userData">
        <!-- First Name -->
        <div class="mb-6">
          <label class="inline-block mb-4">First Name</label>
          <vee-field
            name="first_name"
            :rules="'required|min:3|max:50|alpha_spaces'"
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
            :rules="'required|min:3|max:50|alpha_spaces'"
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
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
          />
          <ErrorMessage class="text-danger-normal" name="email" />
        </div>
        
        <!-- Location -->
        <div class="mb-6">
          <label class="inline-block mb-2">Location</label>
          <vee-field
            name="location"
            :rules="'required|min:3|max:50|alpha_spaces'"
            as="input"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Second Name"
          />
          <ErrorMessage class="text-danger-normal" name="location" />
        </div>


        <!-- Location -->
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
        <div class="mb-6">
          <label class="inline-block mb-2">Confirm Password</label>
          <vee-field
            name="confirm_password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password"
          />
          <ErrorMessage class="text-danger-normal" name="confirm_password" />
        </div>


        <button
          type="submit"
          class="block w-full bg-secondary-normal text-white py-1.5 my-8 rounded-full transition hover:bg-secondary-hover"
          :disable="reg_in_submission"
        >
          Submit
        </button>
      </vee-form>
      

      <div class="flex space-x-2">

        <button-ui
          leftIcon="src\assets\icons\colored\google.svg"
          label="Google"
          color="bg-white-gray"
          :isRounded="true"
          >
        </button-ui>
        <button-ui
        leftIcon="src\assets\icons\colored\facebook.svg"
        label="Apple"
        color="bg-white-gray"
        :isRounded="true"
        >
      </button-ui>
      
      <button-ui
      leftIcon="src\assets\icons\colored\facebook.svg"
          label="Facebook"
          color="bg-white-gray"
          :isRounded="true"
        >
        </button-ui>

      </div>
  
    </div>
  </template>
  
  <script>
  import ButtonUi from '../../../components/base/ButtonUi.vue'

  export default {
    name: 'RegisterForm',
    data() {
      return {
        schema: {
          name: 'required|min:3|max:50',
          first_name: 'required|min:3|max:50',
          second_name: 'required|min:3|max:50',
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
        reg_in_submission: false,
        reg_show_alert: false,
        reg_alert_varient: 'bg-blue-500',
        reg_alert_message: 'please wait your account is being created '
      }
    },
  
    methods: {

  
     async registerForm() {
        ;(this.reg_in_submission = true),
          (this.reg_show_alert = true),
          (this.reg_alert_varient = 'bg-blue-500'),
          (this.reg_alert_message = 'Wait we are creating your account ')
          
   
          
  
  
          this.reg_in_submission = true,
          this.reg_show_alert = true,
          this.reg_alert_varient = 'bg-green-500',
          this.reg_alert_message = 'Sucessful register '
  
      
      }
    },
    components:{
      ButtonUi
    }
  }
  </script>
  
  <style>

label{
  color: var(--content-secondary, #374151);

/* Paragraphs/P3/Medium */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 142.857% */
}
</style>
  
<template>

    <div>
  
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-show="reg_show_alert"
        :class="reg_alert_varient"
      >
        {{ reg_alert_message }}
      </div>
  
  
      <vee-form :validation-schema="schema" @submit="registerForm" :initial-values="userData">
        <!-- Name -->
        <div class="mb-3">
          <label class="inline-block mb-2">Name</label>
          <vee-field
            name="name"
            :rules="'required|min:3|max:50|alpha_spaces'"
            as="input"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Name"
          />
          <ErrorMessage class="text-red-600" name="name" />
        </div>
        <!-- Email -->
        <div class="mb-3">
          <label class="inline-block mb-2">Email</label>
          <vee-field
            name="email"
            type="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
          />
          <ErrorMessage class="text-red-600" name="email" />
        </div>
        <!-- Age -->
        <div class="mb-3">
          <label class="inline-block mb-2">Age</label>
          <vee-field
            name="age"
            type="number"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          />
          <ErrorMessage class="text-red-600" name="age" />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <label class="inline-block mb-2">Password</label>
          <vee-field name="password" :bails="false" v-slot="{ field, errors }">
            <input
              type="password"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Password"
              v-bind="field"
            />
            <div class="text-red-600" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
          <ErrorMessage class="text-red-600" name="password" />
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
          <label class="inline-block mb-2">Confirm Password</label>
          <vee-field
            name="confirm_password"
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password"
          />
          <ErrorMessage class="text-red-600" name="confirm_password" />
        </div>
        <!-- Country -->
        <div class="mb-3">
          <label class="inline-block mb-2">Country</label>
          <vee-field
            as="select"
            name="country"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="Germany">Germany</option>
          </vee-field>
          <ErrorMessage class="text-red-600" name="country" />
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
        <button
          type="submit"
          class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-600"
          :disable="reg_in_submission"
        >
          Submit
        </button>
      </vee-form>
  
  
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'RegisterForm',
    data() {
      return {
        schema: {
          name: 'required|min:3|max:50',
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
    }
  }
  </script>
  
  <style></style>
  
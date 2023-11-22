<template>

    <div>
  
      <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_varient"
  >
    {{ login_alert_message }}
  </div>
    <vee-form
     @submit="loginForm" 
     :validation-schema="loginSchema">
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
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
          type="password"
          name="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <button
        type="submit"
        :disabled="login_in_submission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      >
        Submit
      </button>
    </vee-form>
    </div>
  
  </template>
  
  <script>
  
  import { ErrorMessage } from 'vee-validate'
  
  export default {
      name:'LoginForm',
    data() {
      return {
        loginSchema: {
          email: 'required|email',
          password: 'required|max:100'
        },
        login_in_submission:false,
        login_show_alert:false,
        login_alert_varient:"bg-blue-500",
        login_alert_message:"please wait we are login you in "
      }
    },
    methods :{ 
  

  
      async loginForm() {
          this.login_in_submission = true,
        this.login_show_alert = true,
        this.login_alert_varient = "bg-blue-500",
        this.login_alert_message = "please wait we are login you in "
  
        // try {
        //   await this.authenticate(val)
        // } catch (error) {
        //     console.log(error);
        //     this.login_alert_varient = "bg-red-500",
        //     this.login_alert_message = "invalid credentials try again"
        // return          
        // };
  
  
        this.login_alert_varient = "bg-green-500",
        this.login_alert_message = "Sucess you are login"
        window.location.reload()      
  
      }

      
    },
    components:{
      ErrorMessage
    }
  }
  </script>
  
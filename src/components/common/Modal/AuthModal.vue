<template>
    <div class="fixed inset-0 z-30 flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
  
      <!-- Modal panel, centered with margin from the viewport's top -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-md w-full">
        <div class="bg-white p-6">
          <div class="flex justify-center mb-4">
            <AppLogo></AppLogo>
          </div>
          <div class="text-center">
            <h3 class="text-xl leading-6 font-medium text-gray-900 mb-4">
              Get Started on Residat
            </h3>
            <div class="grid grid-col">

                <button @click="goToLogin" class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-secondary-normal text-base font-medium text-white hover:bg-secondary-hover sm:w-auto sm:text-sm">
                  Login 
                </button>
                <button @click="closeModal" class="w-full mt-3 inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 sm:w-auto sm:text-sm">
                 Continue as guest
                </button>
            </div>
            <!-- <div class="mt-4 text-sm text-gray-500">
              Ou continuer avec
            </div> -->
       
          </div>
          <div class="mt-4 text-xs text-gray-500">
            En continuant avec un compte basé dans le pays suivant : Cameroun, tu acceptes nos <a href="#" class="underline">Conditions d'utilisation</a> et reconnais avoir lu notre <a href="#" class="underline">Politique de confidentialité</a>.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import useModalStore from '@/stores/modalStore.js';
  import AppLogo from '@/components/base/AppLogo.vue'
  
  export default {
    name: 'AuthModal',
    components:{
        AppLogo,
    },
    methods: {
      goToLogin() {
        this.$router.push({ name: 'authentication' });
        useModalStore().closeAuthModal();
        this.$emit('close');
      },
      closeModal() {
        this.$emit('close');
        useModalStore().closeAuthModal();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Adjust the positioning to center the modal */
  .fixed.inset-0.z-30.flex.items-center.justify-center.min-h-screen {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  
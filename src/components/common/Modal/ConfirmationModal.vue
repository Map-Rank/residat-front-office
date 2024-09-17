<template>
    <transition name="fade">
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="isVisible">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 class="text-lg font-semibold mb-4">{{ message }}</h2>
          <div class="flex justify-end gap-4">
            <button class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700" @click="cancel">Cancel</button>
            <button class="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700" @click="confirm">Confirm</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'ConfirmationModal',
    props: {
      message: {
        type: String,
        default: 'Are you sure you want to proceed?'
      },
    },
    data() {
      return {
        isVisible: false
      };
    },
    methods: {
      show() {
        this.isVisible = true;
      },
      hide() {
        this.isVisible = false;
      },
      confirm() {
        this.$emit('confirm');
        this.hide();
      },
      cancel() {
        this.$emit('cancel');
        this.hide();
      }
    }
  }
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  
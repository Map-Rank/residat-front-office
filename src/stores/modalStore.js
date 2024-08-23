// stores/modalStore.js
import { defineStore } from 'pinia';

export default  defineStore('modal', {
  state: () => ({
    showAuthModal: false,
  }),
  actions: {
    openAuthModal() {
      console.log('openning the modal')
      this.showAuthModal = true;
      console.log('new value'+ this.showAuthModal)
    },
    closeAuthModal() {
      this.showAuthModal = false;
    },
  },
});

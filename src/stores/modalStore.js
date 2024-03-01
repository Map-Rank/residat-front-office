import { defineStore } from 'pinia';

export default defineStore('modal', {
  // The state must return a function to ensure fresh state
  state: () => ({
    showModal: false,
    postLink: '',
    message: 'Check out this post!',
  }),
  // Actions for updating the state
  actions: {
    openModal(link) {
        console.log('open modal')
      this.postLink = link;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    setMessage(message) {
      this.message = message;
    },
  },
  // Getters for computed states
  getters: {
    encodedPostLink: (state) => {
      return encodeURIComponent(state.postLink);
    },
    encodedMessage: (state) => {
      return encodeURIComponent(state.message);
    },
  },
});


import { defineStore } from 'pinia';

export default  defineStore('post', {
  state: () => ({
    showPostDetails: false,
    currentPost: null,
    // Other related states
  }),
  getters: {
  },
  actions: {
    togglePostDetails() {
      this.showPostDetails = !this.showPostDetails;
    //   this.currentPost = post;
    },
  },
});

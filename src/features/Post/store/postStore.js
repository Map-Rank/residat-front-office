
import { defineStore } from 'pinia';

export const usePostStore =  defineStore('post', {
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
      console.log('toogle done')
    //   this.currentPost = post;
    },
    setCurrentPost(post){
      this.currentPost=post
      console.log(this.currentPost)
    }
  },
});

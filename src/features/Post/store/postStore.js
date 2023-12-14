
import { defineStore } from 'pinia';

export const usePostStore =  defineStore('post', {
  state: () => ({
    showPostDetails: false,
    postToShowDetails: null,
    postToEdit:null,

  }),
  getters: {
  },
  actions: {
    togglePostDetails() {
      this.showPostDetails = !this.showPostDetails;
      console.log('toogle done')
    },
    setpostToShowDetails(post){
      this.postToShowDetails=post
    },
    setpostToEdit(post){
      this.postToEdit=post
      console.log(this.postToEdit)
    }
  },
});

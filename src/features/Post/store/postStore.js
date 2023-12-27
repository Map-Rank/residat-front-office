
import { defineStore } from 'pinia';

export default defineStore('post', {
  state: () => ({
    showPostDetails: false,
    postToShowDetails: null,
    postIdToShowDetail: null,
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
    setpostIdToShowDetails(id){
      this.postIdToShowDetail=id
    },
    setpostToEdit(post){
      this.postToEdit=post
      console.log(this.postToEdit)
    }
  },
});



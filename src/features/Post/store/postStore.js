import { defineStore } from 'pinia'
import { getSpecificPost } from '@/features/Post/services/postService'

export default defineStore('post', {
  state: () => ({
    showPostDetails: false,
    postToShowDetails: null,
    postIdToShowDetail: null,
    postToEdit: null
  }),
  getters: {},
  actions: {
    togglePostDetails() {
      if (this.showPostDetails) {
        this.showPostDetails = !this.showPostDetails
        this.postIdToShowDetail = null
      } else {
        this.showPostDetails = true
      }
    },
    setpostToShowDetails(post) {
      this.postToShowDetails = post
    },
    setpostIdToShowDetails(id) {
      this.postIdToShowDetail = id
    },
    setpostToEdit(post) {
      this.postToEdit = post
      console.log(this.postToEdit)
    },
    async showDetails(id) {
      try {
        // const post = await someAsyncFunctionToFetchPostById(id);
        const post = await getSpecificPost(id)
        this.setpostIdToShowDetails(id)
        this.setpostToShowDetails(post)
        this.togglePostDetails()
      } catch (error) {
        console.error('Error fetching post details:', error)
        // Handle errors here, like showing a notification to the user
      }
    }
  }
})

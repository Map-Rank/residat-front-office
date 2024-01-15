import { defineStore } from 'pinia'
import { getSpecificPost } from '@/features/Post/services/postService'

export default defineStore('post', {
  state: () => ({
    showPostDetails: false,
    postToShowDetails: null,
    postIdToShowDetail: null,
    postToEdit: null,
    postToView: null,
    hideComponent:true,
    postSearchMode:false,
    contentFromPostInput:'',
  }),
  getters: {},
  actions: {
    togglePostDetails() {
      if (this.showPostDetails) {
        this.showPostDetails = !this.showPostDetails
        this.postIdToShowDetail = null
        this.hideComponent = true
      } else {
        this.showPostDetails = true
      }
    },
    setContentFromPostInput(content){
      this.contentFromPostInput = content
    },
    tooglePostSearchMode(){
      this.postSearchMode = !this.postSearchMode
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
    showPostDetail(post) {
      this.postToView = post
      console.log(this.postToView)
    },
    async showDetails(id) {
      try {
        // const post = await someAsyncFunctionToFetchPostById(id);
        const post = await getSpecificPost(id)
        this.setpostIdToShowDetails(id)
        this.setpostToShowDetails(post)
        this.togglePostDetails()
        this.hideComponent = false
      } catch (error) {
        console.error('Error fetching post details:', error)
        // Handle errors here, like showing a notification to the user
      }
    }
  }
})

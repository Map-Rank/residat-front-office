import { defineStore } from 'pinia'
import { getSpecificEvent } from '../services/eventService'

export default defineStore('event', {
  state: () => ({
    showEventDetails: false,
    eventToShowDetails: null,
    eventIdToShowDetail: null,
    eventToEdit: null,
    eventToView: null,
    hideComponent:true,
    eventSearchMode:false,
    contentFromEventInput:'',
  }),
  getters: {},
  actions: {
    toggleEventDetails() {
      if (this.showEventDetails) {
        this.showEventDetails = !this.showEventDetails
        this.eventIdToShowDetail = null
        this.hideComponent = true
      } else {
        this.showEventDetails = true
      }
    },
    setContentFromEventInput(content){
      this.contentFromEventInput = content
    },
    toogleEventSearchMode(){
      this.eventSearchMode = !this.eventSearchMode
    },
    seteventToShowDetails(event) {
      this.eventToShowDetails = event
    },
    seteventIdToShowDetails(id) {
      this.eventIdToShowDetail = id
    },
    seteventToEdit(event) {
      this.eventToEdit = event
      console.log(this.eventToEdit)
    },
    showEventDetail(event) {
      this.eventToView = event
      console.log(this.eventToView)
    },
    async showDetails(id) {
      try {
        // const event = await someAsyncFunctionToFetchEventById(id);
        const event = await getSpecificEvent(id)
        this.seteventIdToShowDetails(id)
        this.seteventToShowDetails(event)
        this.toggleEventDetails()
        this.hideComponent = false
      } catch (error) {
        console.error('Error fetching event details:', error)
        // Handle errors here, like showing a notification to the user
      }
    }
  }
})

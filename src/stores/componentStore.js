import { defineStore } from 'pinia'

export default defineStore('component', {
  state: () => ({
    bottomState: false
  }),

  getters:{
    getBottomState(state){
        return state.bottomState
    }
  },

  actions:{
    changeBottomState(){
        this.bottomState = !this.bottomState
    }
  }
})

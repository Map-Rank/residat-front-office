import { defineStore } from 'pinia'
import { AlertStates } from '../components'

export default defineStore('alert', {
  state: () => ({
    message: '',
    variant: AlertStates.INFO,
    show: false
  }),
  actions: {
    setAlert(variant, message) {
      this.message = message
      this.variant= variant,
      this.show = true

      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  }
})

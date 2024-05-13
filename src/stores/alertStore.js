import { defineStore } from 'pinia'
import { AlertStates } from '../components'

export default defineStore('alert', {
  state: () => ({
    message: '',
    variant: AlertStates.INFO,
    timeOut:2000,
    show: false
  }),
  actions: {
    setAlert(variant, message,timeOut) {
      this.message = message
      this.variant= variant,
      timeOut ? this.timeOut = timeOut : null,

      this.show = true

      setTimeout(() => {
        this.show = false
      }, this.timeOut)
    }
  }
})

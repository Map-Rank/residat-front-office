<template>
  <div></div>
</template>

<script>
import { onMessage } from 'firebase/messaging'
import { messaging } from '@/firebaseConfig'
import { useToast, POSITION } from 'vue-toastification'
import AppLogo from '@/assets/images/Logos/logo-small.svg'

export default {
  name: 'NotificationHandler',
  setup() {
    const toast = useToast()
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)

      const notificationTitle = payload.notification.title
      const notificationOptions = {
        body: payload.notification.body,
        icon: AppLogo
      }

      const notificationMessage = `${notificationTitle}: ${notificationOptions.body}`

      window.alert(notificationMessage)

      toast.info(payload.notification.body, {
        title: payload.notification.title,
        position: POSITION.TOP_RIGHT,
        icon: AppLogo,
        timeout: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastClassName: 'my-custom-toast-class',
        bodyClassName: 'custom-body-class'
      })
    })
  }
}
</script>

<style scoped>
/* Add any additional styles if required */
</style>

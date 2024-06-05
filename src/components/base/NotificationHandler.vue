<template>
  <div></div>
</template>

<script>
import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase/firebaseConfig";
import { useToast } from "vue-toastification";
import AppLogo from "@/assets/images/Logos/logo-small.svg";
export default {
  name: "NotificationHandler",
  setup() {
    const toast = useToast();
    

    toast.info('payload.notification.body', {
      title: 'payload.notification.title',
      icon: AppLogo,
      timeout: 10000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastClassName: "my-custom-toast-class",
      bodyClassName: "custom-body-class"
    });
    
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast.info(payload.notification.body, {
        title: payload.notification.title,
        icon: AppLogo,
        timeout: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastClassName: "my-custom-toast-class",
        bodyClassName: "custom-body-class"
      });
    });
  },
};
</script>

<style scoped>
/* Add any additional styles if required */
</style>

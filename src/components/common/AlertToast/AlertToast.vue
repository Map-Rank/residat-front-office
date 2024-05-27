

<template>
    <div></div>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';
  
  export const AlertStates = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    PROCESSING: 'processing',
  };
  
  export default {
    name: 'AlertToast',
    setup() {
      const toast = useToast();
  
      const showAlert = (message, variant) => {
        switch (variant) {
          case AlertStates.INFO:
            toast.info(message);
            break;
          case AlertStates.SUCCESS:
            toast.success(message);
            break;
          case AlertStates.ERROR:
            toast.error(message);
            break;
          case AlertStates.PROCESSING:
            toast.info(message, { icon: '🔄', duration: 5000 }); // Customize the processing toast as needed
            break;
          default:
            toast(message);
        }
      };
  
      return {
        showAlert,
      };
    },
  };
  </script>
  
<!-- components/Alert.vue -->

<template>
  <div
    v-if="store.show"
    :class="['text-center', 'font-bold', 'p-4', 'rounded', 'mb-4', variantClass]"
    class="text-white"
  >
    {{ store.message }}
  </div>
</template>

<script>
import useAlertStore from '@/stores/alertStore'
import { AlertStates } from './AlertState';

export default {
  setup() {
    const store = useAlertStore();
    return { store };
  },
  computed: {
    variantClass() {
      // const store = useAlertStore();
    
      switch (this.store.variant) {
        case AlertStates.INFO:
          return 'bg-blue-500';
        case AlertStates.SUCCESS:
          return 'bg-green-500';
          case AlertStates.ERROR:
            return 'bg-red-500';
            case AlertStates.PROCESSING:
          return 'bg-green-500';
          // return 'bg-yellow-500';
        default:
          return 'bg-gray-500';
      
    }
  },

  },
};
</script>

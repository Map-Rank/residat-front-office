<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <create-event-form v-if="showForm"></create-event-form>
  </div>
</template>

<script>
import CreateEventForm from '@/features/Event/Components/CreateEventForm.vue'

export default {
  name: "EventView",
  components: {
    CreateEventForm
  },
  data() {
    return {
      showForm: true  
    }
  }
}
</script>

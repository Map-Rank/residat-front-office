<template>
  <div class="flex flex-col items-center justify-center ">
    <div class="text-center mb-4">
      <img :src="imageUrl" class="h-full w-full" alt="" />
      <p class="text-2xl font-light text-gray-600">{{ errorMessage }}</p>
    </div>
    <div v-if="!hideButton"> <!-- Add v-if directive to conditionally render the button -->
      <ButtonUi 
        @clickButton="handleRefresh()"
        :label="'Refresh Page'"
        :color="'bg-secondary-normal'"
        :isRoundedFull="true"
        :textCss="'text-white'"
      ></ButtonUi>
    </div>
  </div>
</template>

<script>
import ButtonUi from '../../base/ButtonUi.vue'

export default {
  name: 'RefreshError',
  methods: {
    handleRefresh() {
      this.$emit('refreshPage');
    }
  },
  props: {
    errorMessage: {
      type: String
    },
    imageUrl: String,
    hideButton: {
      type: Boolean,
      default: false // Set default value to false if not provided
    }
  },
  components: {
    ButtonUi
  }
}
</script>

<style scoped></style>

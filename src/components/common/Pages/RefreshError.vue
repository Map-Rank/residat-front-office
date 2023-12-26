<template>
  <div class="flex flex-col items-center justify-center ">
    <div class="text-center mb-4">
      <img :src="imageUrl" class="h-full w-full" alt="" />
      <p class="text-2xl font-light text-gray-600">{{ errorMessage }}</p>
    </div>
    <div>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'RefreshError',
  methods: {

    handleRefresh(){
        this.$emit('refreshPage')
    }
  },
  props: {
    errorMessage: {
      type: String
    },
    imageUrl: String
  },
  components: {
    ButtonUi
  }
}
</script>

<style scoped></style>

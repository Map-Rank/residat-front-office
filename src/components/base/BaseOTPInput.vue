<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="flex justify-center gap-2 mb-4">
    <input
      v-for="(input, index) in otp"
      :key="index"
      class="form-input w-10 h-10 text-center rounded border"
      type="text"
      maxlength="1"
      :ref="'otp' + index"
      v-model="otp[index]"
      @input="focusNext(index, $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseOtpInput',
  data(){
    return{
        
    }
  },
  props: ['otp', 'onFocusNext'],
  methods: {
    focusNext(index, event) {
      this.onFocusNext(index, event);
    },
  },
};
</script>

<style scoped>
/* Optionally add custom styles here */
</style>

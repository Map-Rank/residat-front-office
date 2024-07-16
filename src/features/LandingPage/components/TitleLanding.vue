<template>
  <div :class="classes" class="self-stretch text-center  text-[38px] md:text-5xl font-bold font-[Poppins] leading-[44px]">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'TitleLanding',
  props: {
    text: {
      type: String,
      required: true
    },
    
    classes: {
      type: String,
      default: 'text-secondary-normal'
    }
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>

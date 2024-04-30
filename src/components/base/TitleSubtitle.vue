<template>
  <div class="grid mb-5">
    <label class="inline-block mb-2">{{ label }}</label>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'TitleSubtitle',
  props: {
    label: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
label {
  font-size: 18px;

  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
span {
  font-size: 14px;

  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>
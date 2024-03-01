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
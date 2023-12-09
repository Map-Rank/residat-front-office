<template>
  <a href="#" class="text mb-2 md:mb-0 md:mr-6">{{ text }}</a>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

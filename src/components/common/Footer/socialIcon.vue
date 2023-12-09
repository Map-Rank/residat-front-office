<template>
  <a href="#" class="mr-4">
    <img :src="imgSrc" alt="Facebook" class="w-6 h-6"/>
  </a>
</template>

<script>
export default {
  name: 'SocialIcon',
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="bg-secondary-normal px-5 py-3 mb-4 rounded-lg" :class="css">

    <p class="title ">{{title}}</p>
  </div>
</template>
<script>

export default {
  name: 'SectionTitle',
  props:{
    title:String,
    css:String
  },
}
</script>
<style scoped>
.title {
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

</style>
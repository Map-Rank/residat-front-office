<template>
  <div class="bg-secondary-normal px-5 py-3 mb-4 rounded-lg" :class="css">

    <h2 class="title ">{{title}}</h2>
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
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

</style>

<template>

    <div  class="bg-secondary-normal px-5 py-3 mb-4 rounded-lg " :class="[css, { 'bg-secondary-normal': !isLink, 'hover:bg-primary-normal ': isLink } ]">
    <router-link v-if="isLink" :to="linkTo">
      <a class="title hover:underline ">{{ title }}</a>
    </router-link>
    <p v-else class="title font-bold">{{ title }}</p>
  </div>
</template>
<script>

export default {
  name: 'SectionTitle',
  props: {
    title: String,
    css: String,
    isLink: Boolean, // New prop to determine if it should be a link
    linkTo: String     // New prop for the router link destination
  }
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

<template>
  <div class="flex justify-between border-b mb-2 pb-2">
    <div class="flex items-center space-x-1">
      <img src="src\assets\icons\heart-fill.svg" alt="" />
      <span class="caption-c1-bold">{{ like_count }} and other likes</span>
    </div>
    <span class="ml-4 caption-c1-bold">{{ comment_count }} Comments</span>
  </div>
</template>
<script>
export default {
  name: 'InteractionPostStatistics',
  props: {
    comment_count: {},
    like_count: {}
  }
}
</script>
<style scoped>

.caption-c1-bold {
  font-weight: 600;
}

@media only screen and (max-width: 480px) {

  h5 {
    color: var(--primary-normal, #021d40);

    /* Desktop/H6-SemiBold */
    font-family: Raleway;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>
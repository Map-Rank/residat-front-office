<template>
  <div class="flex justify-between border-b mb-2 pb-2">
    <div class="flex items-center space-x-1">
      <img src="@\assets\icons\heart-fill-green.svg" alt="" />
      <span v-if="like_count > 0" class="caption-c1-bold">{{ like_count }} and other likes</span>
      <span v-else class="caption-c1-bold">Be the first to like</span>
    </div>

    <span v-if="comment_count < 1" class="caption-c1-bold">{{ comment_count }} Comment{{ comment_count !== 1 ? 's' : '' }} • {{ share_count }} Share{{ share_count > 1 ? 's' : '' }}</span>
    <span v-else class="caption-c1-bold">{{ comment_count }} Comment{{ comment_count !== 1 ? 's' : '' }} • {{ share_count }} Share{{ share_count > 1 ? 's' : '' }}</span>
  
  </div>
</template>
<script>
export default {
  name: 'InteractionPostStatistics',
  props: {
    comment_count: {},
    like_count: {},
    share_count:{},
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
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>
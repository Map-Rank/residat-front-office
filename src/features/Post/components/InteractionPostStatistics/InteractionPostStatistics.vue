<template>
  <div class="flex justify-between border-b mb-2 pb-2">
    <div class="flex items-center space-x-1">
      <img src="@\assets\icons\heart-fill-green.svg" alt="" />
      <p class="caption-c1-bold">{{ likeCountText }}</p>
    </div>

    <p 
    @click="showPostDetails"
  
    v-if="comment_count < 1" class="caption-c1-bold cursor-pointer ">{{ comment_count }} {{ $t('comment') }}{{ comment_count !== 1 ? 's' : '' }} • {{ share_count }} {{ $t('share') }}{{ share_count > 1 ? 's' : '' }}</p>
    <p 
    @click="showPostDetails"
    v-else class="caption-c1-bold cursor-pointer">{{ comment_count }} {{ $t('comment') }}{{ comment_count !== 1 ? 's' : '' }} • {{ share_count }} {{ $t('share') }}{{ share_count > 1 ? 's' : '' }}</p>
  
  </div>
</template>
<script>
export default {
  name: 'InteractionPostStatistics',
  props: {
    comment_count: {},
    like_count: {},
    share_count:{},

  },

  computed: {
    likeCountText() {
      if (this.like_count === 1) {
        return `${this.like_count} ${this.$t('like')}`;
      } else if (this.like_count > 1) {
        return `${this.like_count} ${this.$t('like')}s`;
      } else {
        return this.$t('be_first_to_like');
      }
    }
  },

  methods:{
    showPostDetails() {
      this.$emit('showPostDetails')
    },
  }
}
</script>
<style scoped>

.caption-c1-bold {
  font-weight: 400;
  font-size: 12px;
}



@media only screen and (max-width: 480px) {

  h5 {
    color: var(--primary-normal, #021d40);

    /* Desktop/H6-SemiBold */
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  }
}
</style>
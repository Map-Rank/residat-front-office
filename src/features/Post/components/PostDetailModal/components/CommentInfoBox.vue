<template>
  <avatar-placeholder
  :username="`${comment.user.first_name} ${comment.user.second_name}`"
></avatar-placeholder>

  <div>
    <div>
      <div>
        <h5 class="comment-user-name">{{ comment.user.first_name }}</h5>
        <div class="comment-text">{{ comment.text }}</div>
        <div class="text-sm caption-1">{{ comment.created_at }}</div>
      </div>

    </div>
  </div>
</template>
<script>
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';

export default {
  name: 'CommentInfoBox',
  components:{
    AvatarPlaceholder

  }
  ,
  props: {
    comment: {},
    imageHost: {}
  }
}
</script>
<style scoped>

.btn2 {
  color: var(--gray-normal, #6b6b6b);

  /* Buttons/B2-Bold */
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
}

@media only screen and (max-width: 600px) {
}

.comment-user-name {
  color: #000;

  /* Paragraphs/P3-Bold */
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.comment-text {
  color: #000;

  /* Paragraphs/P4 */
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}

.caption-1 {
  color: var(--gray-normal, #6b6b6b);

  /* Captions/C1 */
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>
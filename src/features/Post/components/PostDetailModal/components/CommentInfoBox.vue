<template>
  <avatar-placeholder
    :username="`${comment.user.first_name} ${comment.user.second_name}`"
  ></avatar-placeholder>

  <div>
    <div>
      <div>
        <h5 class="comment-user-name">{{ comment.user.first_name }}</h5>
        <p class="comment-text">{{ comment.text }}</p>
        <div class="text-sm caption-1">{{ comment.created_at }}</div>

        <!-- Delete Button -->
        <div v-if="showDeleteComment">
          <button @click="deleteUserComment" class="delete-comment-btn">Delete</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';
import useAuthStore from '@/stores/auth'
import {
  deleteComment,
 
} from "@/features/Post/services/postService";

export default {
  name: 'CommentInfoBox',
  components:{
    AvatarPlaceholder
  },
  data() {
    const authStore = useAuthStore();
    return {
      authStore,
      showDeleteComment: authStore?.user?.id === this.comment.user.id
    };
  },
  props: {
    comment: {},
    imageHost: {}
  },
  methods: {
    async deleteUserComment() {
     await  deleteComment(this.comment.id);
     this.$emit('refreshPost')
    }
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

.delete-comment-btn {
  color: red;
  border: none;
  cursor: pointer;
  margin-top: 2px;
}

.delete-comment-btn:hover {
  text-decoration:underline;
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
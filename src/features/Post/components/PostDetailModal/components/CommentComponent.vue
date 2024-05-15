<template>
  <div>
    <img class="w-10 h-10 rounded-full" :src="comment.userImage" alt="User profile" />

    <div>
      <div>
        <h5 class="comment-user-name">{{ comment.username }}</h5>
        <div class="comment-text">{{ comment.text }}</div>
        <div class="text-sm caption-1">{{ comment.postedDate }}</div>
      </div>

      <div class="flex space-x-2 mt-2">
        <button class="rounded hover:bg-gray-100 text-gray-normal font-bold">
          Like
        </button>

        <button class="rounded hover:bg-gray-100 text-gray-normal font-bold">
          Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    },
  }
}
</script>

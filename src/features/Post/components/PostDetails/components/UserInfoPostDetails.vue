<template>
  <div>

    <div class="flex space-x-2 mb-4">
      <img
        class="w-10 h-10 rounded-full"
        :src="`${imageHost}${post.creator[0].avatar}`"
        alt="User profile"
      />
      <div class="flex-1">
        <h5 class="font-bold">{{ post.creator[0].first_name }}</h5>
        <div class="text-sm text-gray-600">{{ post.published_at }}</div>
      </div>
    </div>
    <p class=" pb-3">{{ post.content }}</p>
  </div>
</template>
<script>
export default {
  name: 'UserInfoPostDetails',
  props: {
    imageHost: {},
    post: {}
  }
}
</script>
<style scoped>

@media only screen and (max-width: 600px) {
}

</style>
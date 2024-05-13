<template>
  <div class="flex items-center space-x-4">
    <img :src="userProfileImage" class="h-10 w-10" alt="" />
    <h2 class="text-sm md:text-lg font-light text-gray-normal mb-4">
      Hello happy to share to our community
    </h2>
  </div>
</template>

<script>
export default {
  name: 'TopContentForm',
  props: {
    userProfileImage: {
      type: String,
      required: false,
      default:"assets/images/smile.png"
    }
  }
}
</script>
>
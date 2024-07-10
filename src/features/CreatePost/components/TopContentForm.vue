<template>
  <div class="flex items-center space-x-4">
    <img :src="userProfileImage" class="h-10 w-10" alt="" />
    <h2 class="text-sm md:text-lg font-[400] text-gray-normal mb-4">
      Share your environmental sightings,stories and impacts
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
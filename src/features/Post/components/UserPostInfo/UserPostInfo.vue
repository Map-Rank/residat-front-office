<template>
  <div class="user-profile flex items-center space-x-2">
    <!-- <img :src="userProfileImage" alt="User profile" class="w-10 h-10 rounded-full" /> -->
    <avatar-placeholder
    :username="username"
    :size="20"
  />
    <div>
      <h5 class="font-bold">{{ username }}</h5>
      <span class="caption-c1">{{ postDate }}</span>
    </div>
  </div>
</template>
<script>
import AvatarPlaceholder from '../../../../components/common/AvatarPlaceholder/AvatarPlaceholder.vue';
export default {
  name: 'UserPostInfo',
  components:{
    AvatarPlaceholder
  },
  props: {
    postDate: {},
    userProfileImage: {},
    username: {}
  }
}
</script>
<style scoped>

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
<template>
  <div class="h-full">
    <div class="bg-white p-6">
      <div class="flex flex-col items-center">
        <!-- Logo/Profile Image -->
        <img
          src="public\images\unicef.png"
          alt="Profile Image"
          class="w-26 h-26 rounded-full mb-4"
        />

        <!-- Profile Name -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-1">Profile name</h2>

        <!-- Followers and Articles/Posts Info -->
        <div class="flex space-x-3 mb-4">
          <p><span> 500 </span>followers</p>
          ·
          <p><span> 500 </span>Articles/Posts</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button-ui
            label="Edit Profile"
            width="full"
            leftIcon="src\assets\icons\edit.svg"
            :color="'bg-primary-normal'"
            :isRoundedMd="true"
            :textCss="'text-white-normal font-bold'"
          >
          </button-ui>

          <button-ui
            label="Edit Profile"
            width="full"
            leftIcon="src\assets\icons\add-circle-white.svg"
            :color="'bg-primary-normal'"
            :isRoundedMd="true"
            :textCss="'text-white-normal font-bold'"
          >
          </button-ui>
        </div>
      </div>
    </div>


    <div class="md:px-100 pb-5">
        <div class="container mx-auto pt-3 sm:grid grid-cols-1 md:grid-cols-4 gap-10">

        </div>
    </div>
  </div>
</template>

<script>
import ButtonUi from '../../components/base/ButtonUi.vue'
// import PostComponent from '../../components//'
export default {
  name: 'SocialProfile',

  components: {
    ButtonUi
  }
}
</script>

<style scoped>
span {
  color: var(--gray-darker, #252525);
  text-align: center;
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
}

p {
  color: var(--gray-dark, #505050);

  /* Paragraphs/P2 */
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
</style>

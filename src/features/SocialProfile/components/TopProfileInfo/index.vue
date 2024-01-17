<template>
  <div class="flex flex-col items-center">
    <!-- Logo/Profile Image -->
    <div>
      <img
        v-if="profileImageUrl"
        :src="formatHostImageUrl(profileImageUrl)"
        alt="Profile Image"
        class="w-14 h-14 rounded-full mb-4"
      />

      <avatar-placeholder
        v-else
        :username="profileName"
        :size="100"
      />
    </div>

    <!-- Profile Name -->
    <h2 class="text-2xl font-semibold text-gray-800 mb-1">{{ profileName }}</h2>

    <!-- Followers and Articles/Posts Info -->
    <div class="flex space-x-3 mb-4">
      <p>
        <span>{{ followersCount }}</span> followers
      </p>
      ·
      <p>
        <span>{{ postsCount }}</span> Articles/Posts
      </p>
    </div>

    <!-- Action Buttons -->
    <div v-if="false" class="flex space-x-2">
      <button-ui
        label="Edit Profile"
        leftIcon="src/assets/icons/edit.svg"
        color="bg-primary-normal"
        isRoundedMd="true"
        textCss="text-white-normal font-bold"
        @clickButton="editProfile"
      />

      <button-ui
        label="Create Post"
        leftIcon="src/assets/icons/add-circle-white.svg"
        color="bg-primary-normal"
        isRoundedMd="true"
        textCss="text-white-normal font-bold"
        @clickButton="createPost"
      />
    </div>
  </div>
</template>

<script>
import ButtonUi from "@/components/base/ButtonUi.vue";
import AvatarPlaceholder from "../../../../components/common/AvatarPlaceholder/AvatarPlaceholder.vue";
import { formatHostImageUrl } from '@/utils/formating';

export default {
  name: "TopProfileInfo",
  data(){
    return {
      formatHostImageUrl
    }
  },
  components: {
    ButtonUi,
    AvatarPlaceholder,
  },
  props: {
    profileImageUrl: {
      type: String,
      required: true,
    },
    profileName: {
      type: String,
      required: true,
    },
    followersCount: {
      type: [Number, String],
      required: true,
    },
    postsCount: {
      type: [Number, String],
      required: true,
    },
    isCurrentUser: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    editProfile() {
      // Trigger edit profile action
    },
    createPost() {
      // Trigger create post action
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your styles here if necessary */
span {
  color: var(--gray-darker, #252525);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
}

p {
  color: var(--gray-dark, #505050);

  /* Paragraphs/P2 */
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
</style>

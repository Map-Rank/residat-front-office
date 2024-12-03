<template>
  <div class="flex flex-col items-center">
    <!-- Logo/Profile Image -->
    <div>
      <img
        v-if="profileImageUrl"
        :src="profileImageUrl"
        :alt="$t('profile_image_alt')"
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
        <span>{{ followersCount }}</span> {{ $t('followers_count') }}
      </p>
      <p>
        <span>{{ followingCount }}</span> {{ $t('following_count') }}
      </p>
      ·
      <p>
        <span>{{ postsCount }}</span> {{ $t('posts_count') }}
      </p>
    </div>
  </div>
</template>

<script>
import AvatarPlaceholder from "@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue";
import { formatHostImageUrl } from '@/utils/formating';

export default {
  name: "TopProfileInfo",
  data(){
    return {
      formatHostImageUrl
    }
  },
  components: {
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
    followingCount: {
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

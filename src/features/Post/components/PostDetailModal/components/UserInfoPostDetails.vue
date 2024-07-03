<template>
  <div>
    <div class="flex space-x-2 mb-4 ">
      <avatar-placeholder
        :username="`${post.creator[0].first_name} ${post.creator[0].last_name}`"
      ></avatar-placeholder>
      <div class="flex-1">
        <h5 class="cursor-pointer hover:underline" @click="viewProfileUser(post.creator[0].id)">
          {{ post.creator[0].first_name }} {{ post.creator[0].last_name ?? "" }}
        </h5>
        <div class="flex items-center">
          <img src="\assets\icons\location.png" class="h-4 mr-1" alt="" />
          <h5 class="zoneName" @click="viewProfileUser(post.creator[0].id)">{{ post.zone.name }}</h5>
          <p style="font-weight: 400; margin: 0 5px;"> • </p>
          <span class="zoneName">{{ post.humanize_date_creation }}</span>
        </div>
      </div>
    </div>
    <p class="pb-3 overflow-hidden" :class="{ 'limited-text': !showFullDescription }" v-html="formattedPostContent"></p>
    <p class="text-gray-700 text-start mt-1 content">
      <span v-if="shouldShowReadMore" @click="toggleReadMore" class="text-blue-700 cursor-pointer">
        {{ showFullDescription ? 'Read less' : 'Read more' }}
      </span>
    </p>
  </div>
</template>


<script>
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue';

export default {
  name: 'UserInfoPostDetails',
  components: {
    AvatarPlaceholder
  },
  data() {
    return {
      maxDescriptionLength: 100,
      showFullDescription: false,
    }
  },
  props: {
    imageHost: String,
    post: Object,
    postDate: String,
    zoneName: {
      type: String,
      default: 'Zone Name'
    },
    id: String,
  },
  computed: {
    formattedPostContent() {
      // Ensure the content is correctly formatted with paragraphs
      return this.showFullDescription ? this.post.content.replace(/\n/g, '<br>') : this.truncateText(this.post.content, this.maxDescriptionLength);
    },
    shouldShowReadMore() {
      return this.post.content.length > this.maxDescriptionLength;
    },
  },
  methods: {
    viewProfileUser(id) {
      this.$router.push({ name: 'view-profile-user', params: { id } });
    },
    toggleReadMore() {
      this.showFullDescription = !this.showFullDescription;
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    }
  }
}
</script>


<style scoped>
h5 {
  color: var(--primary-normal, #021d40);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}

.date {
  font-size: 13px;
  color: gray;
  font-weight: 400;
  font-family: 'Poppins';
}

.limited-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits the text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

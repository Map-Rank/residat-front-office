<template>
  <div class="flex-col space-y-5">
    <section>
      <SectionTitle :title="sectionTitle" />
      <ul class=" ">
        <li v-for="(post, index) in limitedPosts" :key="index" class="mb-2 last:mb-0 bg-white px-5 py-3 rounded-lg">
          <div class="space-y-2">
            <div class="flex space-x-4 items-center">
              <avatar-placeholder
                :username="`${post.creator[0].first_name} ${post.creator[0].last_name}`"
                :size="20"
              />
              <div>

                <p class="user-name mb-3">{{
                  `${post.creator[0].first_name} ${post.creator[0].last_name}`
                }}</p>
                <p class="caption-C1">{{ formatDate(post.published_at) }}</p>
              </div>
            </div>

            <h5 class="post-title hover:cursor-pointer">{{ truncateText(post.content ,70 )  }}</h5>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import AvatarPlaceholder from '@/components/common/AvatarPlaceholder/AvatarPlaceholder.vue'
import { formatDate, truncateText } from '@/utils/formating'
import SectionTitle from '@/components/base/SectionTitle.vue'

export default {
  name: 'RecentlyPosted',
  data() {
    return {
      formatDate,
      truncateText,
      sectionTitle:'Recently Posted'
    }
  },
  computed: {
    limitedPosts() {
      return this.recentPosts.slice(0, this.maxPosts);
    }
  },
  components: {
    SectionTitle,
    AvatarPlaceholder
  },
  props: {
    recentPosts: {
      type: Array,
      required: true
    },
    maxPosts: {
      type: Number,
      default: 3 // Set a default value or remove this line if no default is needed
    }

    // username:String
  }
}
</script>

<style scoped>

.button {
  display: flex;
  padding: 4px 19px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--white-normal, #fff);
  cursor: pointer;
}

.caption-C1 {
  color: var(--gray-normal, #6b6b6b);

  /* Captions/C1 */
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 6px; /* 133.333% */
}
.user-name {
  color: var(--body-dark, #1b1b1b);

  /* Desktop/H5 */
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 6px; /* 133.333% */
  letter-spacing: -0.225px;
}

.post-title {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

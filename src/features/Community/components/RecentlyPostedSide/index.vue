<template>
  <div class="flex-col space-y-5">
    <section>
      <SectionTitle :title="sectionTitle" />
      <ul class=" ">
        <li v-for="(post, index) in limitedPosts" :key="index" class="mb-2 last:mb-0 bg-white px-5 py-3 rounded-lg">
          <div class="space-y-2">
            <div class="flex space-x-4 items-center">
              <img
                :src="post.creator[0].avatar"
                alt="Event image"
                class="h-12 w-12 rounded-full border-2 border-white"
              />
              <div>
                <p class="user-name mb-3 cursor-pointer hover:underline" @click="viewProfileUser(post.creator[0].id)">
                  {{ `${post.creator[0].first_name} ${post.creator[0].last_name}` }}
                </p>
                <p class="caption-C1">{{ formatDate(post.published_at) }}</p>
              </div>
            </div>
            <h5 class="post-title hover:cursor-pointer" @click="viewPost(post.id)">
              <p v-html="truncateHtmlText(post.content, 70)"></p>
            </h5>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>



<script>
import { formatDate } from '@/utils/formating'
import SectionTitle from '@/components/base/SectionTitle.vue'
import { checkAuthentication } from '@/utils/authUtils.js';

export default {
  name: 'RecentlyPosted',
  data() {
    return {
      formatDate,
      sectionTitle: this.$t('section_title_recently_posted')
    }
  },
  onMounted: {
    limitedPosts() {
      console.log();
      return this.recentPosts.slice(0, this.maxPosts);
    }
  },
  components: {
    SectionTitle,
  },
  props: {
    recentPosts: {
      type: Array,
      required: true
    },
    maxPosts: {
      type: Number,
      default: 3 
    }
  },
  methods: {
    viewProfileUser(id) {
      if (checkAuthentication()) {
        console.log(id)
        this.$router.push({ name: 'view-profile-user', params: { id: id } })
        return
      }

    },
    viewPost(id) {
      // if (checkAuthentication()) {
        this.$router.push({ name: 'show-post', params: { id: id } })
        return
      // }

    },
    truncateHtmlText(html, length) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.innerText;
      return text.length > length ? text.substring(0, length) + '...' : text;
    }
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


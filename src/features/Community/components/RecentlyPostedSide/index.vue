<template>
  <div class="flex-col space-y-5">
    <section>
      <h2 class="title mb-5">Recently Posted</h2>
      <ul>
        <li v-for="(post, index) in recentPosts" :key="index" class="mb-4 last:mb-0">
          <div class="space-y-3">
            <div class="flex space-x-4 items-center">
              <img class="h-8 w-8 rounded-xl" :src="post.logoImg" alt="" loading="lazy" />
              <span class="user-name">{{ post.author }}</span>
            </div>

            <h5 class="post-title">{{ post.title }}</h5>
            <p class="caption-C1">{{ post.postedDate }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="title mb-5">Recommended Topics</h2>
      <div class="flex flex-wrap gap-2">
        <span class="button" v-for="topic in topics" :key="topic">
          {{ topic }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RecentlyPosted',
  props: {
    topics: {
      type: Array,
      required: true
    },
    recentPosts: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>
.title {
  color: var(--primary-normal, #021d40);
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

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
  font-family: Raleway;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
.post-title {
  color: var(--body-dark, #1b1b1b);

  /* Desktop/H5 */
  font-family: Raleway;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.225px;
}

.user-name {
  color: var(--body-normal, #242424);

  /* Paragraphs/P3 */
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

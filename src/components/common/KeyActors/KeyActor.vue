<template>
  <SectionTitle :title="sectionTitle" />

  <div
    v-for="(actor, index) in actors"
    :key="index"
    class="mt-3 p-2 bg-white rounded-xl ring-1 ring-secondary-normal flex items-center space-x-4"
  >
    <div class="flex-shrink-0">
      <img
        :src="actor.logoUrl"
        alt="Event image"
        class="h-16 w-16 rounded-full border-2 border-white"
      />
    </div>
    <div class="text-black gap-3">
      <div class="text-lg font-semibold">{{ actor.name }}</div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '@/components/base/SectionTitle.vue'

export default {
  name: 'KeyActors',
  data() {
    return {
    //   sectionTitle: 'Upcoming Event'
    }
  },
  props: {
    actors: Array,
    sectionTitle: String,
  },
  components: {
    SectionTitle
  }
}
</script>

<style scoped>
/* Additional styles if needed */
.menu {
  color: var(--body-normal, #242424);
  margin-top: 2px;

  /* Paragraphs/P3 */
  font-family: Roboto;
  font-size: 14px;
  font-style: medium;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}

span {
  color: var(--body-normal, #242424);

  /* Paragraphs/P3 */
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}

.title {
  color: var(--primary-normal, #021d40);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}
</style>

  
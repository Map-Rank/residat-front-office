<template>
  <SectionTitle :title="sectionTitle" :isLink="true" linkTo="event" />
  <div class="h-[250px] grid space-y-2">
    <div
    v-for="(event) in displayedEvents" 
      :key="event"
      class="p-3 bg-white rounded-xl flex items-start space-x-4"
    >
      <div class="flex-shrink-0 justify-start flex">
        <img
          :src="event.image"
          alt="Event image"
          class="h-16 w-16 rounded-full border-2 border-white"
        />
      </div>
      <div class="text-black gap-3">
        <div class="text-lg font-semibold title">{{ event.title }}</div>
        <p class="menu">
          Organized by:
          <span>{{ event.organized_by }}</span>
        </p>
        <p class="menu">
          Date:
          <span>{{ event.published_at }}</span>
        </p>
        <p class="menu">
          Location:
          <span>{{ event.location }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '@/components/base/SectionTitle.vue'

export default {
  name: 'EventAlertBox',
  mounted() {
    this.startRotation()
  },

  data() {
    return {
      currentIndex: 0,
      interval: null
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    sectionTitle: String
  },
  components: {
    SectionTitle
  },

  computed: {
    // displayedEvents() {
    //   return this.events.slice(this.currentIndex, this.currentIndex + 2)
    // }

    displayedEvents() {
      const endIndex = this.currentIndex + 2;
      return this.events.slice(
        this.currentIndex,
        endIndex > this.events.length ? this.events.length : endIndex
      );
    },
  },
  methods: {
    startRotation() {
      this.interval = setInterval(this.rotateActors, 5000);
    },
    rotateActors() {
      this.currentIndex = (this.currentIndex + 1) % this.events.length;

      if (this.currentIndex > this.events.length - 2) {
        this.currentIndex = 0;
      }
    },
  },
}
</script>

<style scoped>
.title {
  color: var(--primary-normal, #021d40);
  font-size: 18px;
  font-weight: 600;
  line-height: 24px; /* 120% */
  letter-spacing: -0.3px;
}

.menu {
  color: var(--body-normal, #242424);
  margin-top: 2px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}

span {
  color: var(--body-normal, #242424);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

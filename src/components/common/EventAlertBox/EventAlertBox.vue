<template>
  <SectionTitle :title="sectionTitle" :isLink="true" linkTo="event" />
  <div class=" grid space-y-2">
    <div
      v-for="event in displayedEvents"
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
        <div class="menu font-semibold title">{{  truncateText(event.title ,25 )  }}</div>
        <p class="menu">
          {{ $t('organized_by') }}
          <span>{{   truncateText(event.organized_by  ,25 ) }}</span>
        </p>
        <p class="menu">
          {{ $t('date') }}
          <span>{{ event.published_at }}</span>
        </p>
        <p class="menu">
          {{ $t('location') }}
          <span>{{ event.location }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '@/components/base/SectionTitle.vue'
import { truncateText } from '@/utils/formating'

export default {
  name: 'EventAlertBox',
  mounted() {
    this.startRotation()
    this.startRotation()
    // this.displayedEvents()
  },

  data() {
    return {
      currentIndex: 0,
      interval: null,
      truncateText
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
    displayedEvents() {
      return this.events.slice(this.currentIndex, this.currentIndex + 2)
    }

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
  font-family: 'Poppins';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

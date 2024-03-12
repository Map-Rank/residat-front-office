<template>
  <div v-for="(actor, index) in displayedActors" :key="actor.id" class="mt-3 p-1 bg-white rounded-xl flex items-center space-x-4">
    <div class="flex-shrink-0">
      <img :src="actor.logoUrl" alt="Event image" class="h-16 w-16 rounded-full border-2 border-white" />
    </div>
    <div class="text-black gap-3">
      <div class="text-lg font-semibold">{{ actor.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyActors',
  data() {
    return {
      currentIndex: 0, 
      interval: null, 
    };
  },
  props: {
    actors: Array,
    sectionTitle: String,
    showAll: Boolean, 
  },
  computed: {
    displayedActors() {
      return this.showAll ? this.actors : this.actors.slice(this.currentIndex, this.currentIndex + 3);
    },
  },
  watch: {
    showAll(newVal) {
      if (newVal) {
        clearInterval(this.interval);
      } else {
        this.startRotation();
      }
    },
  },
  mounted() {
    if (!this.showAll) {
      this.startRotation();
    }
  },
  unmounted() {
    clearInterval(this.interval); 
  },
  methods: {
    startRotation() {
      this.interval = setInterval(this.rotateActors, 3000);
    },
    rotateActors() {
      this.currentIndex = (this.currentIndex + 1) % this.actors.length;

      if (this.currentIndex > this.actors.length - 3) {
        this.currentIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.menu {
  color: var(--body-normal, #242424);
  margin-top: 2px;

  font-family: Roboto;
  font-size: 14px;
  font-style: medium;
  font-weight: 600;
  line-height: 20px;
}

span {
  color: var(--body-normal, #242424);

  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; 
}

.title {
  color: var(--primary-normal, #021d40);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; 
  letter-spacing: -0.3px;
}
</style>

  
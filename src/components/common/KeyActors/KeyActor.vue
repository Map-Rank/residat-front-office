<template>

  <div
    v-for="(actor, index) in actors"
    :key="index"
    class="mt-3 p-1 bg-white rounded-xl l flex items-center space-x-4"
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

export default {
  name: 'KeyActors',
  data() {
    return {
    }
  },
  props: {
    actors: Array,
    sectionTitle: String,
  },

}
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

  
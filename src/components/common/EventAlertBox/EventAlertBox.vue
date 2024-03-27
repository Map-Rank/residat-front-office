<template>
  <SectionTitle :title="sectionTitle " :isLink="true" linkTo="event"/>

    
<div class=" h-[250px] grid  space-y-2">

  <div v-for="item in [1, 2]" :key="item" class="  p-3 bg-white rounded-xl flex items-start space-x-4">
    <div class="flex-shrink-0 justify-start flex">
      <img
        :src="eventImage"
        alt="Event image"
        class="h-16 w-16 rounded-full border-2 border-white"
      />
    </div>
    <div class="text-black gap-3">
      <div class="text-lg font-semibold title">{{ title }}</div>
      <p class="menu">
        Organized by:
        <span>{{ organizer }}</span>
      </p>
      <p class="menu">
        Date:
        <span>{{ date }}</span>
      </p>
      <p class="menu">
        Location:
        <span>{{ location }}</span>
      </p>
    </div>
  </div>
</div>
  <!-- </div> -->
</template>

<script>
import SectionTitle from '@/components/base/SectionTitle.vue'

export default {
  name: 'EventAlertBox',
  props: {
    title: String,
    organizer: String,
    date: String,
    location: String,
    eventImage: String,
    sectionTitle: String,
  },
  components: {
    SectionTitle
  }
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

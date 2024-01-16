<template>
    <div class="bg-white px-5 py-3 mb-4 mt-3 rounded-lg">

        <h2 class="title ">Upcoming Event</h2>
      </div>

  <div
    class="mt-3 p-4 bg-white rounded-xl  ring-1 ring-secondary-normal flex items-center space-x-4"
  >
    <div class="flex-shrink-0">
      <!-- Event icon or image -->
      <img
        :src="eventImage"
        alt="Event image"
        class="h-16 w-16 rounded-full border-2 border-white"
      />
    </div>
    <div class="text-black gap-3">
      <div class="text-lg font-semibold">{{ title }}</div>
      <p class="menu">
        Organized by:
        <span>
          {{ organizer }}
        </span>
      </p>
      <p class="menu">
        Date:
        <span>
          {{ date }}
        </span>
      </p>
      <p class="menu">
        Location:
        <span>
          {{ location }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventAlertBox',
  props: {
    title: String,
    organizer: String,
    date: String,
    location: String,
    eventImage: String
  }
}
</script>

<style scoped>
/* Additional styles if needed */
.menu {
  color: var(--body-normal, #242424);
  margin-top: 2px;

  /* Paragraphs/P3 */
  font-family: Raleway;
  font-size: 14px;
  font-style: medium;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
}

span{
    color: var(--body-normal, #242424);

    /* Paragraphs/P3 */
    font-family: Raleway;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */ 
}

.title {
    color: var(--primary-normal, #021d40);
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 120% */
    letter-spacing: -0.3px;
  }
</style>

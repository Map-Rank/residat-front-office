<template>
  <div class="flex items-center mt-14 justify-center  ">
    <div class="text-center">
      <h1 class="text-6xl font-semibold text-gray-900">No Result Found</h1>
      <router-link to="/community" class="inline-block bg-primary-normal px-6 py-3 mt-6 text-sm font-medium leading-6 text-center text-white uppercase transition  rounded-full shadow ripple hover:shadow-lg focus:outline-none hover:bg-secondary-normal">
        Return to community  
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "NoSearchResult",

}
</script>

<style scoped>
/* Styles go here */
</style>

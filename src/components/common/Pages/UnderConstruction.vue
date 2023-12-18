<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-semibold text-gray-900">Under Construction</h1>
      <img src="path-to-your-image-or-gif" alt="Under Construction" class="mx-auto mt-4" />
      <p class="text-2xl font-light text-gray-600 mt-4">{{ errorMessage }}</p>
      <router-link to="/community" class="inline-block bg-primary-normal px-6 py-3 mt-6 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg focus:outline-none hover:bg-blue-600">
        Visit Our Community 
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "UnderConstruction",
    props: {
      errorMessage: {
        type: String,
        default: "This section is still under construction. Check back soon!"
      }
    },
}
</script>

<style scoped>
/* Styles go here */
</style>

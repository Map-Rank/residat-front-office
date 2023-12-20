<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-semibold text-gray-900">404</h1>
      <p class="text-2xl font-light text-gray-600">{{ errorMessage }}</p>
      <router-link to="/community" class="inline-block bg-primary-normal px-6 py-3 mt-6 text-sm font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded-full shadow ripple hover:shadow-lg focus:outline-none hover:bg-blue-600">
        Go back Our Community 
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Page404",
    props: {
      errorMessage: {
        type: String,
        default: "Page not found. Sorry, we couldn't find the page you're looking for."
      }
    },
}
</script>

<style scoped>
</style>

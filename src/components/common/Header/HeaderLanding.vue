<template>
  <header class="bg-green-600 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <img src="@/assets/logo.png" alt="Logo" class="h-10" />
      <nav>
        <ul class="flex space-x-4 text-white">
          <li><a href="#about-us" class="hover:underline">About Us</a></li>
          <li><a href="#solution" class="hover:underline">Solution</a></li>
          <li><a href="#demo" class="hover:underline">Demo</a></li>
          <li><a href="#blog" class="hover:underline">Blog</a></li>
          <li><a href="#contact-us" class="hover:underline">Contact Us</a></li>
        </ul>
      </nav>
      <div>
        <button class="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100 mr-2">Register</button>
        <button class="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-100">Sign In</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderLanding'
}
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>

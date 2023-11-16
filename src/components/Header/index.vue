<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="py-4 md:px-100">
    <!-- Mobile view: Hamburger icon -->
    <div class="flex justify-between items-center  space-x-6 p-4 md:hidden">
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15" />
      <div class="flex-grow items-center">

        <input
          type="search"
          placeholder="Search"
          class="h-8 p-2 w-10 bg-gray-300 rounded-md w-full w-3"
        />
      </div>
    </div>

    <!-- Full menu for larger screens, hidden menu for mobile -->
    <div
      :class="{ flex: isMenuOpen, hidden: !isMenuOpen }"
      class="flex-col md:flex-row md:flex item-center"
    >
      <!-- Logo -->
      <img src="@\assets\images\Logos\logo-small.svg" alt="Logo" class="h-15 " />

      <!-- Search bar -->
      <div class="flex-grow items-center">
        <input
          type="search"
          placeholder="Search"
          class="h-8 p-2 m-4 bg-gray-300 rounded-md w-full md:w-auto"
        />
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col md:flex-row items-center space-x-10">
        <IconWithLabel
          svgContent="src\assets\icons\dashboard-outline.svg"
          svgContentHover="src\assets\icons\dashboard-fill.svg"
          labelText="Dashboard"
          iconSize="w-8 h-8"
        />
        <IconWithLabel
          svgContent="src\assets\icons\community-outline.svg"
          svgContentHover="src\assets\icons\community-fill.svg"
          labelText="Community"
          iconSize="w-8 h-8"
        />
        <IconWithLabel 
        svgContent="src\assets\icons\chat-outline.svg"
        svgContentHover="src\assets\icons\chat-fill.svg" 
        labelText="Chat" 
        iconSize="w-8 h-8" />

        
        <IconWithLabel
          svgContent="src\assets\icons\profile-outline.svg"
          svgContentHover="src\assets\icons\profile-fill.svg"
          labelText="Profile"
          iconSize="w-8 h-8"
        />

        <IconWithLabel
          svgContent="src\assets\icons\post-outline.svg"
          svgContentHover="src\assets\icons\post-fill.svg"
          labelText="Subscribe"
          iconSize="w-9 h-9"
        />

        <IconWithLabel
          svgContent="src\assets\icons\subscribe-outline.svg"
          svgContentHover="src\assets\icons\subscribe-fill.svg"
          labelText="Subscribe"
          iconSize="w-9 h-9"
        />
      </nav>
      <br />

 
    </div>
  </header>
</template>

<script>
import IconWithLabel from '../IconWithLabel/index.vue'

export default {
  name: 'HeaderApp',
  components: {
    IconWithLabel
  },
  data() {
    return {
      isMenuOpen: false 
    }
  }
}
</script>

<style lang="scss" scoped>

header{
  background-color: var(--white-normal, #FFF);
}
</style>


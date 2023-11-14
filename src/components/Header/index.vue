<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header >
      <!-- Mobile view: Hamburger icon -->
      <div class="flex justify-between items-center p-4 md:hidden">
        <img src="src\assets\images\logo-small.svg" alt="Logo" class="h-15 m-4">
        <button @click="toggleMenu" class="p-2">
          <svg viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
            <!-- Hamburger icon SVG path -->
          </svg>
        </button>
      </div>
  
      <!-- Full menu for larger screens, hidden menu for mobile -->
      <div :class="{'flex': isMenuOpen, 'hidden': !isMenuOpen}" class="flex-col md:flex-row md:flex item-cente ">
        <!-- Logo -->
        <img src="src\assets\images\logo-small.svg" alt="Logo" class="h-15 m-4">
        
        <!-- Search bar -->
        <div class="flex-grow items-center">
  <input type="search" placeholder="Search" class=" h-8 p-2  m-4 bg-gray-300 rounded-md w-full md:w-auto">
</div>

  
        <!-- Navigation Links -->
        <nav class="flex flex-col md:flex-row items-center space-x-5">
            <IconWithLabel svgContent="src\assets\icons\dashboard.svg" labelText="Dashboard" iconSize="w-5 h-5" />
            <IconWithLabel svgContent="src\assets\icons\community.svg" labelText="Community" iconSize="w-5 h-5" />
            <IconWithLabel svgContent="src\assets\icons\chat.svg" labelText="Chat" iconSize="w-5 h-5" />
          <!-- ... other navigation links ... -->
        </nav>
        <br>
  
        <!-- Profile, Post, Subscribe -->
        <div class="flex flex-col md:flex-row items-center space-x-5 ml-5">
          <IconWithLabel svgContent="src\assets\icons\profile.svg" labelText="Profile" iconSize="w-5 h-5" />
          <IconWithLabel svgContent="src\assets\icons\home.svg" labelText="Home" iconSize="w-5 h-5" />
          <IconWithLabel svgContent="src\assets\icons\premium.svg" labelText="Subscribe" iconSize="w-5 h-5" />
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import IconWithLabel from '../IconWithLabel/index.vue';
  
  export default {
    name:'HeaderApp',
    components: {
      IconWithLabel
    },
    data() {
      return {
        isMenuOpen: false, // State to track the toggle status of the menu
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen; // Toggle the menu visibility
      }
    }
  }
  </script>
  
  <style>
  /* Additional styles if needed */
  </style>
  
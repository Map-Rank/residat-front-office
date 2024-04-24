<template>
    <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      <span class="text-gray-700 text-sm font-medium">{{ title }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarItem',
    props: ['title']
  }
  </script>
  
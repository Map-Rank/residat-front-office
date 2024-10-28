<template>
  <router-link to="/community">
    <img 
      v-if="isWhite"
      src="@/assets/images/Logos/logo-small-white.svg" 
      alt="Logo" 
      class="h-15" 
    />
    <img 
      v-else
      src="@/assets/images/Logos/logo-small.svg" 
      alt="Logo" 
      class="h-15" 
    />
  </router-link>
</template>

<script>
export default {
  name: 'AppLogo',
  props: {
    isWhite: {
      type: Boolean,
      default: false
    }
  }
};
</script>


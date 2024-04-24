import IconWithLabel from '@/components/common/IconWithLabel/index.vue';
<template>
  <div
    class="flex items-center p-2 my-1 text-gray-700 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-100"
    :class="{ 'bg-gray-200': isActive }"
    @click="handleClick"
  >

    <!-- <span class="ml-2 text-sm font-medium">{{ title }}</span> -->
    <IconwithLabel
    
    >

    </IconwithLabel>

  </div>
</template>

<script>
import IconwithLabel from '@/components/common/IconWithLabel/index.vue'

export default {
  name: 'SidebarItem',
  props: {
    title: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    // Add any other props here, such as routing information if needed
  },
  components:{
    IconwithLabel
  },
  methods: {
    handleClick() {
      // Emit an event when the item is clicked
      this.$emit('clicked', this.title);
      // Add your own logic to handle the click event, like routing
    },
  },
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>

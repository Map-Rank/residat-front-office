<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 px-4 py-2 transition rounded-none',
      'disabled:opacity-50 disabled:cursor-not-allowed bg-black',
      isRounded ? 'rounded-full' : 'rounded-lg',
      buttonWidthClass,
      buttonColorClass,
      hoverShadowClass
    ]"
    :disabled="isDisabled"
    @click.prevent="handleClick()"
  >
    <img v-if="leftIcon" :src="leftIcon" alt="Left icon" class="w-5 h-5" />
    {{ label }}
    <img v-if="rightIcon" :src="rightIcon" alt="Right icon" class="w-5 h-5" />
    <span v-if="loading" class="loader"></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonUi',
  props: {
    label: {
      type: String,
      required: true,
    },
    leftIcon: String,
    rightIcon: String,
    isDisabled: Boolean,
    hoverState: Boolean,
    color: String,
    loading: Boolean,
    isRounded: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'full', // full, auto, or any specific width like 1/2, 1/3, etc.
    },
  },
  computed: {
    buttonColorClass() {
      return this.color ? `bg-${this.color}-500 text-white` : 'bg-blue-500 text-white';
    },
    hoverShadowClass() {
      return this.hoverState ? 'hover:shadow-md' : '';
    },
    buttonWidthClass() {
      return {
        full: 'w-full',
        auto: 'w-auto',
      }[this.width] || `w-${this.width}`;
    },
  },
  methods: {
    handleClick() {
      if (!this.isDisabled &&  !this.loading) {
        console.log('clicked')
      this.$emit('clickButton')
      }
    },
  },
};
</script>

<style scoped>
.loader {
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 99999px;
  width: 1em;
  height: 1em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 px-2 py-2 transition ',
      'disabled:opacity-50 disabled:cursor-not-allowed ',
      isRoundedFull ? 'rounded-full' : '',
      isRoundedMd ? 'rounded-lg' : '',
      color,
      colorObject,
      buttonWidthClass,
      hoverShadowClass
    ]"
    :disabled="isDisabled"
    @click.prevent="handleClick()"
  >
    <img v-if="leftIcon" :src="leftIcon" alt="Left icon" class="w-6 h-6" />
    <span :class="[textCss, colorObject]">
      {{ label }}
    </span>
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
      required: true
    },
    leftIcon: String,
    rightIcon: String,
    isDisabled: Boolean,
    hoverState: Boolean,
    colorObject: Object,
    color: String,
    loading: Boolean,
    isRoundedMd:Boolean,
    textCss: {
      type: String
    },
    isRoundedFull: {
      type: Boolean
    },
    width: {
      type: String,
      default: 'full' // full, auto, or any specific width like 1/2, 1/3, etc.
    }
  },
  computed: {
    hoverShadowClass() {
      return this.hoverState ? 'hover:shadow-md' : ''
    },
    buttonWidthClass() {
      return (
        {
          full: 'w-full',
          auto: 'w-auto'
        }[this.width] || `w-${this.width}`
      )
    }
  },
  methods: {
    handleClick() {
      if (!this.isDisabled && !this.loading) {
        console.log('clicked')
        this.$emit('clickButton')
      }
    }
  }
}
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

span {
  font-family: Raleway;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 171.429% */
  letter-spacing: 0.75px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

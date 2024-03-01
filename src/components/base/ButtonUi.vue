<template>
  <button
  :type="type"
    :class="[
      'flex items-center  gap-2 px-2 py-2 transition secon ',
      'disabled:opacity-50 disabled:cursor-not-allowed ',
      isRoundedFull ? 'rounded-full' : '',
      isRoundedMd ? 'rounded-lg' : '',
      color,
      colorObject,
      buttonWidthClass,
      hoverShadowClass,
      customCss
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
    customCss:String,
    hoverState: Boolean,
    colorObject: Object,
    color: String,
    loading: Boolean,
    isRoundedMd:Boolean,
    type:String,
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
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  line-height: 20px; /* 171.429% */
  letter-spacing: 0.75px;
}


@media (max-width: 767px) {
  span {
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    line-height: 20px; /* 171.429% */
    letter-spacing: 0.75px;
  }
}


@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

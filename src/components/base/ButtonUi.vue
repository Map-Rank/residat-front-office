<template>
  <button
    :type="type"
    :class="[
      'flex items-center gap-2 px-2 py-2 transition',
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
    <p :class="[textCss, colorObject,'flex-wrap text-wrap']">
      {{ label }}
    </p>
    <img v-if="rightIcon" :src="rightIcon" alt="Right icon" class="w-5 h-5" />
    <p v-if="loading" class="loader"></p>
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
    isDisabled: {
      type:Boolean,
      default:false
    },
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
      default: 'full' 
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

p {
  font-size: 14px;
  font-style: normal;
  line-height: 20px; /* 171.429% */
  letter-spacing: 0.75px;
}


@media (max-width: 767px) {
  p {
    font-size: 12px;
    font-style: normal;
    line-height: 20px; /* 171.429% */
    letter-spacing: 0.75px;
    white-space: nowrap; /* Prevent wrapping */
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

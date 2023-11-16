<template>
  <div
    class="icon-with-label relative"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="handleClick"
  >
    <!-- Label -->
    <div 
      :class="['label', positionClass[position]]" 
      v-for="(position, index) in ['top', 'left', 'right', 'bottom']" 
      :key="index"
      v-show="this[position]"
    >
      {{ this[`labelText${position.charAt(0).toUpperCase() + position.slice(1)}`] }}
    </div>

    <!-- Image -->
    <img
      :src="imageSource"
      :class="[iconSize, 'block mx-auto']"
    />
  </div>
</template>

<script>
export default {
  name: 'IconWithLabel',
  props: {
    svgContent: {
      type: String,
      required: true
    },
    svgContentHover: {
      type: String,
      required: true
    },
    iconSize: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    right: Boolean,
    left: Boolean,
    top: Boolean,
    bottom: Boolean,
    labelTextTop: String,
    labelTextRight: String,
    labelTextBottom: String,
    labelTextLeft: String,
  },
  data() {
    return {
      hover: false,
      positionClass: {
        top: 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full',
        left: 'absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2',
        right: 'absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2',
        bottom: 'absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full'
      }
    }
  },
  computed: {
    imageSource() {
      return this.hover || this.isActive ? this.svgContentHover : this.svgContent;
    }
  },
  methods: {
    handleClick() {
      this.$emit('toggleActive');
      this.$emit('customFunction');
    }
  }
}
</script>

<style scoped>
.label {
  color: var(--gray-dark, #505050);
  text-align: center;
  font-family: Raleway;
  font-size: 10px;
  line-height: 16px; /* 160% */
}

.icon-with-label:hover {
  cursor: pointer;
}
.icon-with-label:hover .label {
  color: var(--primary-normal, #021d40);
  text-align: center;

  /* Captions/C2-Bold */
  font-family: Raleway;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 160% */
}
</style>

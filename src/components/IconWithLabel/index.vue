<template>
  <div
    class="icon-with-label relative"
    :class="top || bottom ? 'relative' : 'flex items-center'"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="handleClick()"
  >
    <!-- Label on Top -->
    <div
      class="label "
      :class="positionClass.top"
      v-show="top"
    >
      {{ labelTextTop }}
    </div>
    
    <!-- Label on left -->
    <span
      class="label "
      v-show="left"
    >
      {{ labelTextRight }}
    </span>
    <!-- Image -->
    <img
      :src="hover || isActive ? svgContentHover : svgContent"
      :class="[
    hover || isActive ? iconDesktopSize : iconMobileSize, 
    'md:' + (iconDesktopSize), 
    'sm:' + (iconMobileSize)
  ]"
    />

    <!-- Label on Right -->
    <span
    class="label "
    :class="positionClass.right"
    v-show="right"
    >
    {{ labelTextRight }}
  </span>
  
  
  <!-- Label on Bottom -->
    <div
      class="label "
      :class="positionClass.bottom"
      v-show="bottom"
    >
      {{ labelTextBottom }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconWithLabel',

  props: {
    svgContent: {
      type: String,
      require: true
    },
    svgContentHover: {
      type: String,
      require: true
    },
    labelText: {
      type: String,
    },
    iconDesktopSize: {
      type: String,
      require: true
    },
    iconMobileSize: {
      type: String,
      require: true
    },
    isActive: {
      type: Boolean
    },
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    labelTextTop: String,
    labelTextRight: String,
    labelTextBottom: String,
    labelTextLeft: String
  },
  data() {
    return {
      hover: false,
      positionClass: {
        top: 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full',
        left: 'mr-1',
        right: 'ml-1',
        bottom: 'absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full'
      }
    }
  },

  methods: {
    handleClick(){
      console.log(this.iconSize)
      console.log(this.isActive)
      this.$emit('clickIcon')
      this.$emit('customFunction')
    },
  }
}
</script>

<style scoped>
.label {
  color: var(--gray-dark, #505050);
  text-align: center;
  font-family: Raleway;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 160% */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-with-label:hover {
  cursor: pointer;
}
.icon-with-label:hover .label {
  color: var(--primary-normal, #021d40);
  text-align: center;

  font-family: Raleway;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 160% */
}
</style>

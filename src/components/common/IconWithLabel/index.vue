<template>
  <router-link :to="{ name: routerName  }" 
    class="icon-with-label relative"
    :class="[top || bottom ? 'grid place-items-center' : 'flex items-center' , customCss]"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click.prevent="handleClick()"
  >
      <!-- Label on Top -->
      <p :class="this.textCss" v-show="top">
        {{ labelTextTop }}
      </p>

      <!-- Label on left -->
      <p :class="this.textCss" v-show="left">
        {{ labelTextLeft }}
      </p>
      <!-- Image -->

      <img
        :src="hover || isActive ? svgContentHover : svgContent"
        class="m-1"
        :class="[
          hover || isActive ? iconDesktopSize : iconMobileSize,
          'md:' + iconDesktopSize,
          'sm:' + iconMobileSize,
          imageCss
        ]"
      />

      <!-- Label on Right -->
      <p :class="this.textCss" v-show="right">
        {{ labelTextRight }}
      </p>

      <!-- Label on Bottom -->
      <p :class="this.textCss" class="text-primary-normal text-center" v-show="bottom">
        {{ labelTextBottom }}
      </p>
  </router-link>
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
      type: String
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
      type: Boolean,
      default: false
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
    routerName: {
      type: String
      // default: null
    },
    textCss:String,
    labelTextTop: String,
    labelTextRight: String,
    labelTextBottom: String,
    labelTextLeft: String,
    customCss:String,
    imageCss:String,
  },
  data() {
    return {
      hover: false,
    }
  },

  methods: {
    handleClick() {
      this.$emit('clickIcon')
      this.$emit('customFunction')
    }
  }
}
</script>

<style scoped>




.icon-with-label:hover {
  cursor: pointer;
}
.icon-with-label:hover .label {
  color: var(--primary-normal, #021d40);
  text-align: center;

  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 160% */
}
</style>

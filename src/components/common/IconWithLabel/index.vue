<template>
  <router-link :to="{ name: routerName }" 
    class="icon-with-label relative"
    :class="top || bottom ? 'grid place-items-center' : 'flex items-center'"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click.prevent="handleClick()"
  >
      <!-- Label on Top -->
      <span :class="this.textCss" v-show="top">
        {{ labelTextTop }}
      </span>

      <!-- Label on left -->
      <span :class="this.textCss" v-show="left">
        {{ labelTextRight }}
      </span>
      <!-- Image -->

      <img
        :src="hover || isActive ? svgContentHover : svgContent"
        class="m-1"
        :class="[
          hover || isActive ? iconDesktopSize : iconMobileSize,
          'md:' + iconDesktopSize,
          'sm:' + iconMobileSize
        ]"
      />

      <!-- Label on Right -->
      <span :class="this.textCss" v-show="right">
        {{ labelTextRight }}
      </span>

      <!-- Label on Bottom -->
      <span :class="this.textCss" v-show="bottom">
        {{ labelTextBottom }}
      </span>
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
    labelTextTop: String,
    labelTextRight: String,
    labelTextBottom: String,
    labelTextLeft: String
  },
  data() {
    return {
      hover: false,
      textCss: 'label'
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

<template>
  <div
    class="icon-with-label relative"
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

    <!-- Label on Left -->
    <div
      class="label "
      :class="positionClass.left"
      v-show="left"
    >
      {{ labelTextLeft }}
    </div>

    <!-- Image -->
    <img
      :src="hover || isActive ? svgContentHover : svgContent"
      :class="this.iconSize ? this.iconSize : 'w-4 h-4'"
    />

    <!-- Label on Right -->
    <div
      class="label "
      :class="positionClass.right"
      v-show="right"
    >
      {{ labelTextRight }}
    </div>

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
      require: true
    },
    iconSize: {
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
        left: 'absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2',
        right: 'absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2',
        bottom: 'absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full'
      }
    }
  },

  methods: {
    handleClick(){
      console.log(this.iconSize)
      console.log(this.isActive)
      this.$emit('toggleActive')
      this.$emit('customFunction')
    },
  }
}
</script>

<style scoped>
.label {
  color: var(--gray-dark, #505050);
  text-align: center;
  /* Captions/C2 */
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

  /* Captions/C2-Bold */
  font-family: Raleway;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 160% */
}
</style>

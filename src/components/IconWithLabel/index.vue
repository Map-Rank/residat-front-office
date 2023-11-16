<template>
  <div
    class="icon-with-label grid place-items-center"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="toggleActive"
  >
    <img
      :src="hover || isActive ? svgContentHover : svgContent"
      :class="iconSize"
      class="items-center mb-1"
    />
    <div class="label text-center">
      {{ labelText }}
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
    }
  },
  data() {
    return {
      hover: false
    }
  },

  methods: {
    toggleActive() {
      this.$emit('toggleActive')
      console.log(this.isActive)
    }
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

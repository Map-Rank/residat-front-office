<template>
  <div class="flex items-center">
    <input
      :name="list.name"
      type="checkbox"
      :id="list.name"
      class="w-6 h-6 rounded text-primary-normal focus:ring-primary-light focus:ring form-checkbox"
      v-model="checked"
      @change="updateCheckedItems"
    />
    <label
      :for="list.name"
      class="ml-2.5 w-3/4 text-body-dark cursor-pointer sm:text-[14px] lg:text-[15px] font-normal leading-6 transition-all"
    >
      {{ list.name }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // Initialize checked based on the check value in the list object
      checked: this.list.check
    }
  },
  methods: {
    updateCheckedItems() {
      // console.log('This is the checkbox list id ' + this.list.id);
      // console.log('Change event emitted', { list: this.list, checked: this.checked });
      this.$emit('change', { list: this.list, checked: this.checked });
    }
  }
}
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-input:checked + .checkbox-label {
  font-weight: 600;
}
</style>

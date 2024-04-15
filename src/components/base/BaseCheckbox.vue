<template>
  <div class="flex items-center"> <!-- .checkbox-container -->
    <input
      :name="list.name"
      type="checkbox"
      :id="list.name"
      class="w-6 h-6 rounded text-primary-normal focus:ring-primary-light focus:ring form-checkbox" 
      v-model="checked"
      @change="updateCheckedItems"
    />
    <label :for="list.name" class="ml-2.5 text-body-dark cursor-pointer  text-base font-normal leading-6 transition-all" >
      {{ list.name }}
    </label>
  </div>
</template>

<script>
export default {
  name:'BaseCheckbox',
  props: {
    list: Object,
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    updateCheckedItems() {
      this.$emit('change', { list: this.list, checked: this.checked });
    },
  },
};
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-input {
  width: 24px;
  height: 24px;
}



.checkbox-input:checked + .checkbox-label {
  font-weight: 600;
}

label{
  color: var(--body-dark, #1b1b1b);
  font-size: 15px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
</style>

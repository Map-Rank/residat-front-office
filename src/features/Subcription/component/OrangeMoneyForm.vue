<template>
     <form @submit.prevent="handleSubmit" class="space-y-4">
      <SelectInput
      v-model="formData.period"
      @update-period="$emit('update-period', $event)"    />
    <label class="block">
    
      {{ titleNumber }}
      <input
        v-model="formData.orangeMoneyNumber"
        type="text"
        placeholder="+237 698 90 56 896"
        class="w-full mt-1 p-2 border rounded"
        required
      />
    </label>
   
    <button
      type="submit"
      :disabled="!isFormValid"
      class="w-full bg-[#7AA64E] text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Pay
    </button>
  </form>
</template>

<script>

import SelectInput from './SelectInput.vue';


export default {
  components:{
    SelectInput
  },
    name:"OrangeMoneyForm",
    props: {
    initialData: {
      type: Object,
      default: () => ({
        orangeMoneyNumber: '',
        period: ''

      }),
    },
    titleNumber:{
      type:String
    }  
  },
        
        data() {
    return {
      formData: { ...this.initialData },

    };
    },
    computed: {
    isFormValid() {
      return this.formData.orangeMoneyNumber.trim() !== ''
      // this.formData.period.trim() !== '';
    },
  },
  methods: {
    handleSubmit() {
     this.$emit('submit', this.formData);
   },
  
  },
}
</script>

<style lang="scss" scoped>

</style>
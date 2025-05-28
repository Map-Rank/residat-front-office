<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <SelectInput
      v-model="formData.period"
      @change="handlePeriodChange"
      @update-period="$emit('update-period', $event)"    
    />
   <label class="block">
enter your mobile money number
    <input
       v-model="formData.MobileMoneyNumber"
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
   name:"MobileMoneyForm",
   props: {
   initialData: {
     type: Object,
     default: () => ({
        MobileMoneyNumber: '',
        period:''
     }),
   },
  
 },
       
       data() {
   return {
     formData: { ...this.initialData },

   };
   },
   computed: {
   isFormValid() {
     return this.formData.MobileMoneyNumber.trim() !== ''
    //  this.formData.period.trim() !== '';
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
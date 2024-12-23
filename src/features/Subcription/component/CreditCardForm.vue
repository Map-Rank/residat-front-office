<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <SelectInput
      v-model="formData.period"
      @update-period="$emit('update-period', $event)"    />
    <!-- Card Name -->

    <label class="block">
      Card Name
      <input
        v-model="formData.cardName"
        type="text"
        placeholder="Cardholder Name"
        class="w-full mt-1 p-2 border rounded"
        required
      />
    </label>

    <!-- Expire Date and CVV -->
    <div class="flex gap-4">
      <!-- Expire Date -->
      <label class="block flex-1">
        Expire Date
        <input
          v-model="formData.expireDate"
          type="text"
          placeholder="MM / YY"
          class="w-full mt-1 p-2 border rounded"
          :class="{ 'border-red-500': !isExpireDateValid && formData.expireDate }"
          required
        />
        <span v-if="!isExpireDateValid && formData.expireDate" class="text-red-500 text-sm">
          Expire Date must be in MM/YY format.
        </span>
      </label>

      <!-- CVV -->
      <label class="block flex-1">
        CVV
        <input
          v-model="formData.cvv"
          type="text"
          placeholder="CVV"
          class="w-full mt-1 p-2 border rounded"
          :class="{ 'border-red-500': !isCVVValid && formData.cvv }"
          required
        />
        <span v-if="!isCVVValid && formData.cvv" class="text-red-500 text-sm">
          CVV must contain digits.
        </span>
      </label>
    </div>

    <!-- Country -->
    <label class="block">
      Country
      <input
        v-model="formData.country"
        type="text"
        placeholder="Country"
        class="w-full mt-1 p-2 border rounded"
        :class="{ 'border-red-500': !isCountryValid && formData.country }"
        required
      />
      <span v-if="!isCountryValid && formData.country" class="text-red-500 text-sm">
        Country must only contain letters.
      </span>
    </label>

    <!-- Submit Button -->
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

  name: 'CreditCardForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({
        cardName: '',
        expireDate: '',
        cvv: '',
        country: '',
        period: ''

      }),
    },
  },
  emits: ['submit'],
  data() {
    return {
      formData: { ...this.initialData },
    };
  },
  computed: {
    // Validate Expire Date: MM/YY format
    isExpireDateValid() {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM between 01 and 12, followed by YY
      return regex.test(this.formData.expireDate);
    },
  // Validate CVV: Digits only
isCVVValid() {
  const regex = /^\d+$/; // Matches one or more numeric digits
  return regex.test(this.formData.cvv);
},
    // Validate Country: Letters only
    isCountryValid() {
      const regex = /^[a-zA-Z\s]+$/; // Matches only letters (uppercase, lowercase) and spaces
      return regex.test(this.formData.country);
    },
    // Ensure all fields are valid
    isFormValid() {
      return (
        this.formData.cardName.trim() &&
        this.isExpireDateValid &&
        this.isCVVValid &&
        this.isCountryValid
        // this.formData.period.trim()
      );
    },
  },
  methods: {
    handleSubmit() {
      if (this.isFormValid) {
        this.$emit('submit', this.formData);
      }
    },
  },
};
</script>


<style lang="scss" scoped>

</style>
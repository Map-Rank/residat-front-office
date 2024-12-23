<template>
    <div class="flex flex-col border border-gray-200 rounded-lg shadow-lg bg-white h-96 ">
    <div class="bg-[#7AA64E] text-white p-4">
      <h2 class="text-lg font-semibold capitalize">{{ title }}</h2>
      <p class="text-sm mt-3 ">{{ price }}xaf /{{ period }}</p>
    </div>
    <div class="p-4 text-sm text-gray-700">
      <h3 class="font-semibold mb-2">Benefits</h3>
      <ul class="list-disc list-inside space-y-1">
        <li v-for="(benefit, index) in parsedBenefits" :key="index">{{ benefit }}</li>
      </ul>
    </div>
    <div class="p-4 flex justify-end ">
      <button
        class="flex items-center gap-2 text-[#7AA64E] font-medium hover:text-[#5C7D3B] transition BuyBottom "
      @click="goToPaymentPage"
        >
Buy Now        <span class="text-lg">&#8594;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name:'PackCard',
    props: {
      id: Number,
      title: String,
      price: String,
      benefits: String,
      period: String
  },
  computed: {
   parsedBenefits() {
      try {
        return JSON.parse(this.benefits);
      } catch (error) {
        console.error('Error parsing benefits:', error);
        return [];
      }
    },
},

    data () {
      const router= useRouter();
  

        return {
          router,
        }
    },
    methods:{
      goToPaymentPage(){
       this.router.push({
          name: 'PaymentOption', params: { id: this.id }  // Pass the package id

         
        })

      }
    }
}

</script>

<style scoped>
 /* .BuyBottom{
  position: fixed;
}  */

</style>
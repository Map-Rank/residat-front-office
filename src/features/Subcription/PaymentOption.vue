<template>
  <div class="flex flex-col lg:flex-row gap-10 bg-white">
    <!-- Left Section: Payment Methods -->
    <div class="flex-1 bg-white md:min-h-screen md:px-24 px-6">
      <div class="mt-10">
        <h2 class="text-2xl font-bold mb-10">Payment Method</h2>
        <div class="grid md:grid-cols-2 gap-4 grid-cols-2">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            :class="[
              'border rounded-lg px-4 py-2 text-center font-semibold transition-all md:w-56 w-36 ',
              selectedMethod === method.id
                ? 'bg-[#7AA64E] bg-opacity-50 border-[#7AA64E]'
                : 'bg-white border-gray-300'
            ]"
            @click="selectMethod(method.id)"
          >
            {{ method.label }}
          </button>
        </div>

        <!-- Payment Forms -->
        <transition name="fade" mode="out-in">
          <div v-if="selectedMethod" class="mt-6">
            <!-- Orange Money Form -->
            <OrangeMoneyForm
              titleNumber="Enter your Orange Money number"
              v-if="selectedMethod === 'orange-money'"
              :initialData="{
                orangeMoneyNumber: formData.orangeMoneyNumber,
              }"
              @submit="handleOrangeMoneySubmit"
              @update-period="updatePeriod"
            />
            <MobileMoneyForm
              titleNumber="Enter your Mobile Money number"
              v-if="selectedMethod === 'mtn-money'"
              :initialData="{ MobileMoneyNumber: formData.MobileMoneyNumber }"
              @submit="handleMobileMoneySubmit"
              @update-period="updatePeriod"

            />

            <!-- Credit Card Form -->
            <CreditCardForm
              v-if="selectedMethod === 'credit-card'"
              :initialData="{
                cardName: formData.cardName,
                expireDate: formData.expireDate,
                cvv: formData.cvv,
                country: formData.country
              }"
              @submit="handleCreditCardSubmit"
              @update-period="updatePeriod"

            />
          </div>
        </transition>
        <button @click="goTochoosePack" class="w-full bg-[#7AA64E] text-white py-2 rounded mt-5">
          Choose another package
        </button>
      </div>
    </div>

    <!-- Right Section: Package Summary -->
    <div class="flex-1 bg-gray-100 p-6 rounded-lg md:px-24 ">
      <h2 class="text-2xl font-bold mb-9">Package</h2>
      <div class="p-4 bg-[#7AA64E] border-l-4 border-[#7AA64E] rounded-lg" >
        <h3 class="text-lg font-bold text-white text-[1.5rem]">{{ packageDetails.name_en }}</h3>
        <p class="text-gray-700 mt-6 text-[1.1rem]" v-for="pack in filteredPackages" :key="pack.id">
          {{ pack.price }}xaf/
          {{ selectedPeriod }}        </p>
      </div>
      <hr class="my-4" />
      <div class="flex justify-between items-center">
        <p class="font-semibold text-lg">Total</p>
        <p class="text-gray-700  text-[1.1rem]" v-for="pack in filteredPackages" :key="pack.id">
          {{ pack.price }}xaf  /
          {{ selectedPeriod }}
        </p>
      </div>
      <p class="text-gray-500 mt-4">
        Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s.
      </p>
    </div>
  </div>
</template>

<script>
import CreditCardForm from './component/CreditCardForm.vue'
import OrangeMoneyForm from './component/OrangeMoneyForm.vue'
import MobileMoneyForm from './component/MobileMoneyForm.vue'
import { useRoute } from 'vue-router'
import { getPackageById } from '../../services/packageService'
import { getPackages } from '../../services/packageService'


export default {
  name: 'PaymentOption',
  components: {
    CreditCardForm,
    OrangeMoneyForm,
    MobileMoneyForm
  },

  data() {
    const router = useRoute()
    // const packageData = {
    //   title: router.query.title,
    //   price: router.query.price,
    //   period: router.query.period,
    //   benefits: router.query.benefits ? router.query.benefits.split("\n").map((b) => b.trim()) : []
    // };

    return {
      router,
      // pack: packageData,
      packageDetails:[],
      packagesItem: [],


      paymentMethods: [
        { id: 'orange-money', label: 'Orange Money' },
        { id: 'credit-card', label: 'Credit Card' },
        { id: 'mtn-money', label: 'MTN Money' }
      ],
      selectedMethod: null,
      formData: {
        orangeMoneyNumber: '',
        MobileMoneyNumber: '',
        cardName: '',
        expireDate: '',
        cvv: '',
        country: ''
      },
      selectedPeriod: '',
 
    }
  },

  
 computed:{
  // Filter packages based on selected period and package name
  filteredPackages() {
    return this.packagesItem.filter(
      (pkg) =>
        pkg.periodicity === this.selectedPeriod &&
        (!this.packageDetails.name_fr || pkg.name_fr.includes(this.packageDetails.name_fr))
    );
  },
 },

  async mounted() {
    console.log(this.$route.params.id)
    try {
      await this.fetchSpecificId()
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
    try {
      await this.fetchPackages();

    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  },

  methods: {

    async fetchPackages(){
        this.loading= true;
        this.error = null;
        try{
          const response = await getPackages();
          this.packagesItem = response.data;

        // Extract unique periodicities
        this.periodicities = [
          ...new Set(this.packagesItem.map((item) => item.periodicity)),
        ];
          console.log('fetchthe pack',  this.packagesItem)
        } catch (error){
          console.error('Error fetching packages:', error);
          this.error = 'Failed to load packages. Please try again later.'; 
        }finally {
        this.loading = false;
      }
      },

    async fetchSpecificId() {
      console.log(this.$route.params)
      this.loading = true
      this.error = null
      const packageId = this.$route.params.id // Get the package id from route params
      console.log('packageId')
      try {
        const response = await getPackageById(packageId) // Fetch package details by ID
        console.log(response.data)
        this.packageDetails = response.data // Assuming you get an array of packages
      } catch (error) {
        console.error('Error fetching package details:', error)
        this.error = 'Failed to load package details. Please try again later.'
      } finally {
        this.loading = false
      }
    },
    selectMethod(methodId) {
      this.selectedMethod = methodId
    },
    handleOrangeMoneySubmit(data) {
      alert(`Orange Money Payment Successful! Number: ${data.orangeMoneyNumber}, Period: ${this.selectedPeriod} `)
      
    },
  
    handleMobileMoneySubmit(data) {
      alert(`Orange Money Payment Successful! Number: ${data.MobileMoneyNumber}, Period: ${this.selectedPeriod} `)
    },
    handleCreditCardSubmit(data) {
      alert(`Credit Card Payment Successful! Name: ${data.cardName}, Expiry: ${data.expireDate}, Period: ${this.selectedPeriod} `)
    },
    updatePeriod(period) {
      this.selectedPeriod = period;
    },

    goTochoosePack() {
      this.$router.push({
        name: 'ChoosePack'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

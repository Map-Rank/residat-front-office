<template>
    <label class="block">
      Select your period
      <select
        v-model="selectedPeriod"
        @change="handleChange"
        class="w-full mt-1 p-2 border rounded"
      >
        <option v-for="period in periodicities" :key="period" :value="period">{{period}}</option>
        
      </select>
    </label>
  </template>
  
  <script>
  import { getPackages } from '../../../services/packageService';
  export default {
    name: "SelectInput",
    
    async mounted() {
    try {
      await this.fetchPackages();

    } catch (error) {
      console.error("Failed to load posts:", error);
    }

   
  },

  data(){
    return{
        packagesItem: [],
        periodicities: [],
        selectedPeriod:''

   
    }
  },
   
    methods: {
        handleChange() {
  this.$emit('update-period', this.selectedPeriod);
}, 


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
      }

    },
  };
  </script>
  
  <style scoped>
  /* Add specific styles if needed */
  </style>
  
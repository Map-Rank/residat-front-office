<template>
   <div class="bg-gray-50 min-h-screen py-8 px-4">
    <!-- Header -->
    <div class="text-center mb-8">
      <img alt="Map & Rank Logo" class="mx-auto mb-4 w-20" />
      <h1 class="text-2xl font-bold text-gray-800">Premium Features for Institutions</h1>
      <p class="text-gray-600 mt-2">
        Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>
    </div>

    <!-- Packages -->
    <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-9">
      <div         v-for="(pack, index) in filteredPackages" :key="index"
      > 
      <PackCard
        :id="pack.id"
        :title="pack.name_en || 'Unknown Package'"
        :price="pack.price || 0"
        :period="pack.periodicity || 'N/A'"
        :benefits="pack.description_en"
      />

    </div>
    </div>
  </div>
</template>

<script>
import PackCard from './component/PackCard.vue';
import { getPackages } from '../../services/packageService';
// import { getPackagesByIds } from '../../services/packageService';
export default {
    name:'ChoosePack',
    components:{
        PackCard,   
    },
    data () {
        

        return {
          packagesItem: [],
        //  packageIds: [13, 5, 1], // Specify your desired IDs here

          loading: false, // Loading state
      error: null, // Error state
          
        }
    },
computed:{
  filteredPackages(){
    return this.packagesItem.filter((pack) => pack.periodicity==='Month')
  },
},
    async mounted() {
    try {
      await this.fetchPackages();

    } catch (error) {
      console.error("Failed to load posts:", error);
    }

   
  },
    methods:{
      async fetchPackages(){
        this.loading= true;
        this.error = null;
        try{
          const response = await getPackages();
          this.packagesItem = response.data;
          console.log('fetchthe pack',  this.packagesItem)
        } catch (error){
          console.error('Error fetching packages:', error);
          this.error = 'Failed to load packages. Please try again later.'; 
        }finally {
        this.loading = false;
      }
      }
    }
}
</script>

<style lang="scss" scoped>


</style>
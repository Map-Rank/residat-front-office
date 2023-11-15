<template>
    <footer class=" text-white p-4 px-24 ">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <!-- Left Side -->
        <div class="flex flex-col md:space-y-10">
            <div class="flex flex-col items-center md:flex-row mb-4 md:mb-0">
                <a href="#" class="mb-2 md:mb-0 md:mr-6">Privacy</a>
                <a href="#" class="mb-2 md:mb-0 md:mr-6">Terms</a>
                <a href="#" class="mb-2 md:mb-0 md:mr-6">Contact</a>
                <a href="#" class="mb-2 md:mb-0 md:mr-6">About</a>
            </div>

            <div class="flex flex-col md:flex-row items-center">
              <div class="flex mb-4 md:mb-0">
                <a href="#" class="mr-4">
                  <img src="src\assets\icons\facebook.svg" alt="Facebook" class="w-6 h-6"/>
                </a>
                <a href="#" class="mr-4">
                  <img src="src\assets\icons\insta.svg" alt="Instagram" class="w-6 h-6"/>
                </a>
                <a href="#" class="mr-4">
                  <img src="src\assets\icons\linkedin.svg" alt="LinkedIn" class="w-6 h-6"/>
                </a>
              </div>
              <!-- Copyright -->
              <div>
                © {{ currentYear }} Map and Rank
              </div>
            </div>
        </div>
  

        <!-- Right Side -->
        <div class="flex flex-col md:flex-row items-center sm:mt-5">
            <img src="src\assets\images\logo-medium-white.svg" alt="">
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterApp',
    computed:{
      currentYear(){
        return  new Date().getFullYear();
      }
    }
  }
  </script>
  
  <style scoped>
footer{
    background-color:  #021D40;
}
  </style>
  
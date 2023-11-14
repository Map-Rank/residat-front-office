
<template>

<h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <icon-with-label
      svgContent="src\assets\images\logo-medium.svg"
      labelText="Dashboard"
      iconSize="w-20 h-20" 
    >
  </icon-with-label>
</template>

<script >
import IconWithLabel from './components/IconWithLabel/index.vue';

export default{
    name:'App',
    components:{
        IconWithLabel,
    },

    data(){
        return{
        dashboardIcon:'<svg></svg>'
        }
    }
}
</script>

<style scoped>

</style>

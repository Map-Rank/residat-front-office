
<template>

    <header-app></header-app>


</template>

<script >
// import IconWithLabel from './components/IconWithLabel/index.vue';
import HeaderApp from './components/Header/index.vue'

export default{
    name:'App',
    components:{
        // IconWithLabel,
        HeaderApp
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




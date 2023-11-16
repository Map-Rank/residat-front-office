
<template>

    <header-app></header-app>
    
        <body class="md:px-100">
            <community></community>
        </body>

    <footer-app></footer-app>


</template>

<script >

import HeaderApp from './components/Header/index.vue'
import FooterApp from './components/Footer/index.vue'
import Community from './views/Community/index.vue'


export default{
    name:'App',
    components:{
        HeaderApp,
        FooterApp,
        Community,
    },

    data(){
        return{
        dashboardIcon:'<svg></svg>'
        }
    }
}
</script>

<style scoped >

body{
    background: var(--primary-light, #E6E8EC);
}
</style>




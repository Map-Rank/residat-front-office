
<template>

    <header-app></header-app>
    
        <body class="px-100">
            <h1>body</h1>
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
    height: 50vh;
    background: var(--primary-light, #E6E8EC);
}
</style>




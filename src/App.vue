
<template>

    <header-app></header-app>
    
    <div class="contain">


        <body >
            <h1>body</h1>
        </body>
    </div>

    <footer-app></footer-app>


</template>

<script >

import HeaderApp from './components/Header/index.vue'
import FooterApp from './components/Footer/index.vue'


export default{
    name:'App',
    components:{
        // IconWithLabel,
        HeaderApp,
        FooterApp
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
}

@media (min-width: 1024px) {

.contain {
padding: 0px 100px;
}
}
</style>




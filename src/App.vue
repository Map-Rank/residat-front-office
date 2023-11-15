
<template>

    <div class="contain">

        <header-app></header-app>

        <body >
            <community></community>
        </body>
    </div>

    <footer-app></footer-app>


</template>

<script >

import HeaderApp from './components/Header/index.vue'
import FooterApp from './components/Footer/index.vue'
import Community from './components/Community/index.vue'


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
    /* height: 50vh; */
}

@media (min-width: 1024px) {

.contain {
padding: 0px 100px;
}
}
</style>




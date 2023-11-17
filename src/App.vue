
<template>

    <header-app></header-app>
    
        <body class="md:px-100 pb-5">
            <router-view></router-view>
        </body>

    <footer-app></footer-app>


</template>

<script >

import HeaderApp from './components/common/Header/index.vue'
import FooterApp from './components/common/Footer/index.vue'
// import CommunityView from './features/Community/CommunityView.vue'


export default{
    name:'App',
    components:{
        HeaderApp,
        FooterApp,
        // CommunityView,
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
    min-height:80vh
}
</style>




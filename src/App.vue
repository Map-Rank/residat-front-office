
<template>

    <header-app></header-app>
    
        <body class="md:px-100">
            <community-view></community-view>
        </body>

    <footer-app></footer-app>


</template>

<script >

import HeaderApp from './components/common/Header/index.vue'
import FooterApp from './components/common/Footer/index.vue'
import CommunityView from './features/Community/CommunityView.vue'


export default{
    name:'App',
    components:{
        HeaderApp,
        FooterApp,
        CommunityView,
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




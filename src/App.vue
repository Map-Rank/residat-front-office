
<template>

    <header-app
    :class="hiddenClass"
    ></header-app>
    
        <body class="md:px-100 pb-5">
            <router-view></router-view>
        </body>
    
    <bottom-navigation-app-app 
    :class="hiddenClass"
    class="mobile-nav md:hidden"></bottom-navigation-app-app>
    <footer-app></footer-app>



</template>

<script >
import {mapState} from 'pinia'
import useAuthStore from './stores/auth'
import HeaderApp from './components/common/Header/index.vue'
import FooterApp from './components/common/Footer/index.vue'
import BottomNavigationAppApp from './components/common/BottomNavigator/index.vue'

export default{
    name:'App',
    components:{
        HeaderApp,
        FooterApp,
        BottomNavigationAppApp,
    },

    data(){
        return{
        dashboardIcon:'<svg></svg>'
        }
    },
    computed:{
    ...mapState(useAuthStore,['hiddenClass'])
  }
}
</script>

<style scoped >

body{
    background: var(--primary-light, #E6E8EC);
}


/* By default, the nav is not fixed */
.mobile-nav {
  position: static;
  
}

@media only screen and (max-width: 480px) {
  .mobile-nav {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%; /* Make sure it spans the full width of the screen */
    z-index: 999; /* Optional: Use a high z-index value to ensure the nav appears above other elements */
  }


}

</style>




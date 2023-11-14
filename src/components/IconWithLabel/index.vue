<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <div class="icon-with-label">
    <img :src="svgContent" :class="iconSize"  />
    <div class="label">
        {{ labelText }}
    </div>
    <div>{{ iconSizeClass }}</div>
   </div>
</template>

<script>
    export default {
        name:'IconWithLabel',
        props:{
            svgContent:{
                type:String,
                require:true
            },
            labelText:{
                type:String,
                require:true
            },
            iconSize:{
                type:String,
                require:true
            },

        }
        
    }
</script>

<style scoped>

</style>
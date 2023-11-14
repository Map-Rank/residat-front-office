<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <div class="icon-with-label">
    <div
    v-html="svgContent"
    :class="iconSizeClass"
    ></div>
    <div class="label">
        {{ labelText }}
    </div>
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

        computed:{
            iconSizeClass(){
                return this.iconSize
            }
        }
        }
        
    }
</script>

<style scoped>

</style>
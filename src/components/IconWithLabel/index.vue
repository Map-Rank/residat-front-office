<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <div class="icon-with-label grid place-items-center">
    <img :src="svgContent" :class="iconSize" class="items-center" />
    <div class="label text-center">
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

.label{
    color: var(--gray-dark, #505050);
text-align: center;

/* Captions/C2 */
font-family: Segoe UI;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 16px; /* 160% */
}

</style>
<template>
    <svg class="svg-icon" :class="iconClass" aria-hidden="true">
        <use :xlink:href="icon"></use>
    </svg>
</template>
<script>
import "./fonts/iconfont.js";
    export default {
        name: "BaseIcon",
        props:{
            iconName:{
                required:true,
                default:""
            },
            iconClass:{
                default:""
            }
        },
        computed:{
            icon(){
                return "#icon-" + this.iconName;
            }
        }
    }
</script>
<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
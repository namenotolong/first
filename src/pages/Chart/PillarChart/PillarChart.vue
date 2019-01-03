<template>
    <div class="chart-wrap">
        <section class="chart">
            <p class="title">基础柱状图</p>
            <chart-base></chart-base>
        </section>

        <section class="chart">
            <p class="title">自定义label</p>
            <chart-custom></chart-custom>
        </section>
       
    </div>
</template>

<script>
    import ChartBase from "./components/ChartBase.vue";
    import ChartCustom from "./components/ChartCustom.vue";
 
    export default {
        name: "PillarChart",
        components: {
            ChartBase,
            ChartCustom,
        
        },
        data() {
            return {
               
            }
        },
        mounted() {
          
        },
        methods: {
          
           
        }
    }
</script>

<style lang="scss" scoped>
    .chart-wrap {
        .title {
            font-size: 16px;
            font-weight: 600;
            text-indent: 2em;
            line-height: 40px;
        }
    }
</style>
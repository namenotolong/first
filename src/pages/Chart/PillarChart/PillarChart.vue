<template>
    <div class="chart-wrap">
        <section class="chart">
            <p class="title">基础柱状图</p>
            <chart-base></chart-base>
        </section>

        <section class="chart">
            <p class="title">自定义顶部图片</p>
            <chart-custom></chart-custom>
        </section>

        <section class="chart">
            <p class="title">分组柱状图1</p>
            <chart-group1></chart-group1>
        </section>
        <section class="chart">
            <p class="title">分组柱状图2</p>
            <chart-group2></chart-group2>
        </section>
       
        <section class="chart">
            <p class="title">辅助元素</p>
            <chart-guide></chart-guide>
        </section>

        <section class="chart">
            <p class="title">瀑布图</p>
            <chart-waterfall></chart-waterfall>
        </section>

        <section class="chart">
            <p class="title">堆叠柱状图</p>
            <chart-overlay></chart-overlay>
        </section>
    </div>
</template>

<script>
    import ChartBase from "./components/ChartBase.vue";
    import ChartCustom from "./components/ChartCustom.vue";
    import ChartGroup1 from "./components/ChartGroup1.vue";
    import ChartGroup2 from "./components/ChartGroup2.vue";
    import ChartGuide from "./components/ChartGuide.vue";
    import ChartWaterfall from "./components/ChartWaterfall.vue";
    import ChartOverlay from "./components/ChartOverlay.vue";
 
    export default {
        name: "PillarChart",
        components: {
            ChartBase,
            ChartCustom,
            ChartGroup1,
            ChartGroup2,
            ChartGuide,
            ChartWaterfall,
            ChartOverlay,
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
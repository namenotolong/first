<template>
    <div class="chart-wrap">
        <section class="chart">
            <p class="title">基础折线图</p>
            <chart-base></chart-base>
        </section>

        <section class="chart">
            <p class="title">渐变色曲线图</p>
            <chart-gradual></chart-gradual>
        </section>

        <section class="chart">
            <p class="title">阶梯图</p>
            <chart-ladder></chart-ladder>
        </section>

        <section class="chart">
            <p class="title">双折线图</p>
            <chart-double></chart-double>
        </section>

        <section class="chart">
            <p class="title">趋势线</p>
            <chart-trend></chart-trend>
        </section>

        <section class="chart">
            <p class="title">均值线</p>
            <chart-average></chart-average>
        </section>
    </div>
</template>

<script>
    import ChartBase from "./components/ChartBase.vue";
    import ChartGradual from "./components/ChartGradual.vue";
    import ChartLadder from "./components/ChartLadder.vue";
    import ChartDouble from "./components/ChartDouble.vue";
    import ChartTrend from "./components/ChartTrend.vue";
    import ChartAverage from "./components/ChartAverage.vue";
    export default {
        name: "LineChart",
        components: {
            ChartBase,
            ChartGradual,
            ChartLadder,
            ChartDouble,
            ChartTrend,
            ChartAverage
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
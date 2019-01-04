<template>
    <div class="chart-wrap">
        <el-row :gutter="20">
            <el-col :lg="12" :sm="24">
                <p class="title">基础面积图</p>
                <chart-base></chart-base>
            </el-col>

            <el-col :lg="12" :sm="24">
                <p class="title">堆叠</p>
                <chart-overlay></chart-overlay>
            </el-col>
        </el-row>

    <el-row :gutter="20">
            <el-col :lg="12" :sm="24">
                <p class="title">基础面积图</p>
                <chart-negative></chart-negative>
            </el-col>

            <el-col :lg="12" :sm="24">
                <p class="title">堆叠</p>
                
            </el-col>
        </el-row>
       

      
    </div>
</template>

<script>
    import ChartBase from "./components/ChartBase.vue";
    import ChartOverlay from "./components/ChartOverlay.vue";
    import ChartNegative from "./components/ChartNegative.vue";
 
    export default {
        name: "LineChart",
        components: {
            ChartBase,
            ChartOverlay,
            ChartNegative,
         
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
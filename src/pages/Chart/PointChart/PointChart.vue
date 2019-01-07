<template>
    <div class="chart-wrap">
        <el-row :gutter="20">
            <el-col :lg="24" :sm="24">
                <p class="title">散点图</p>
                <chart-base></chart-base>
            </el-col>

            <el-col :lg="24" :sm="24">
                <p class="title">气泡图</p>
                <chart-bubble></chart-bubble>
            </el-col>
        </el-row>

       

      



    </div>
</template>

<script>
    import ChartBase from "./components/ChartBase.vue";
    import ChartBubble from "./components/ChartBubble.vue";
   
   

    export default {
        name: "LineChart",
        components: {
            ChartBase,
            ChartBubble,
         
          
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
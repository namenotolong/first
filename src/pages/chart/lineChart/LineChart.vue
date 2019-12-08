<template>
  <div class="chart-wrap">
    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">基础折线图</p>
        <chart-base></chart-base>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">渐变色曲线图</p>
        <chart-gradual></chart-gradual>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">阶梯图</p>
        <chart-ladder></chart-ladder>
      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">双折线图</p>
        <chart-double></chart-double>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :lg="12" :sm="24">
        <p class="title">趋势线</p>
        <chart-trend></chart-trend>

      </el-col>

      <el-col :lg="12" :sm="24">
        <p class="title">均值线</p>
        <chart-average></chart-average>
      </el-col>
    </el-row>


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

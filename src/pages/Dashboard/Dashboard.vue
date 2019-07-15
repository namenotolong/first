<template>
  <div>
    <grid-group></grid-group>
    <line-chart></line-chart>

    <el-row :gutter="20">
      <el-col :span="8">
        <todo-list></todo-list>
      </el-col>
      <el-col :span="8">
        <progress-bar></progress-bar>
      </el-col>
      <el-col :span="8">
        <new-goods></new-goods>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import GridGroup from "./components/GridGroup.vue";
  import LineChart from "./components/LineChart.vue";
  import TodoList from "./components/TodoList.vue";
  import ProgressBar from "./components/ProgressBar.vue";
  import NewGoods from "./components/NewGoods.vue";
  export default {
    name: "Dashboard",
    components: {
      GridGroup,
      LineChart,
      TodoList,
      ProgressBar,
      NewGoods
    },
    data() {
      return {
        img: require('@/assets/img/login/login-bg.jpg')
      }
    },
  }
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
</style>

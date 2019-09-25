<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="文本溢出" name="first">
      <TextEllipsis />
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>

  </el-tabs>
</template>

<script>
  import TextEllipsis from './components/TextEllipsis';

  export default {
    components: {
      TextEllipsis
    },
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

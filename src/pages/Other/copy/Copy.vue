<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="利用textarea或者input" name="directive">
        <Directive />
      </el-tab-pane>

      <el-tab-pane label="直接复制DOM内容" name="copyDom">

      </el-tab-pane>
    </el-tabs>

    <p>#复制完可以到word文档上粘贴查看下效果</p>
  </div>
</template>

<script>
  import Directive from './components/Directive';


  export default {
    name: 'Copy',
    components: {
      Directive
    },
    data() {
      return {
        activeName: 'directive',

      }
    },
  }
</script>

<style>
  .copy-dom__content {
    background-color: #fff;
    font-size: 18px;
    color: red;
  }
</style>

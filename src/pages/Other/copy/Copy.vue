<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="指令方式" name="directive">
        <Directive />
      </el-tab-pane>

      <el-tab-pane label="组件方式" name="component">
        <comp />
      </el-tab-pane>
    </el-tabs>

    <p>#复制完可以到word文档上粘贴查看下效果</p>
    <p>有个bug就是：如果触发复制的是el-button，这个按钮紧挨着要复制的元素，且这个按钮后边也跟有一个相邻兄弟元素，那么这个按钮也会被复制下来</p>
    <p>把按钮换成任何带有.el-button样式的元素，都会有这个问题</p>
  </div>
</template>

<script>
  import Directive from './components/Directive';
  import Comp from './components/Comp';


  export default {
    name: 'Copy',
    components: {
      Directive,
      Comp
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

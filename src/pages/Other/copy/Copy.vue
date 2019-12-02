<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="利用textarea或者input" name="copyForm">
        <copy-form :text="formText" />
      </el-tab-pane>
      <el-tab-pane label="直接复制DOM内容" name="copyDom">
        <copy-dom :text="domText" />
      </el-tab-pane>
    </el-tabs>

    <p>#复制完可以到word文档上粘贴查看下效果</p>
  </div>
</template>

<script>
  import CopyForm from '@/components/copy/copyForm';
  import CopyDom from '@/components/copy/copyDom';

  export default {
    name: 'Copy',
    components: {
      CopyForm,
      CopyDom
    },
    data() {
      return {
        activeName: 'copyForm',
        formText: `第一行内容1111
                 第二行内容2222222
              第三行内容33`,
        domText: '<p>第一行内容111</p> <p style="text-indent: 2em">第二行内容222</p><p>第三行内容333</p>',
      }
    }
  }
</script>

<style>
  .copy-dom__content {
    background-color: #fff;
    font-size: 18px;
    color: red;
  }
</style>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="利用textarea或者input" name="formElem">
        <FormElem />
      </el-tab-pane>
      <el-tab-pane label="直接复制DOM内容" name="domElem">
        <DomElem />
      </el-tab-pane>
    </el-tabs>
    <p>#复制完可以到word文档上粘贴查看下效果</p>
  </div>
</template>

<script>
  import FormElem from './components/FormElem';
  import DomElem from './components/DomElem';

  export default {
    name: 'Copy',
    components: {
      FormElem,
      DomElem
    },
    data() {
      return {
        activeName: 'formElem'
      }
    }
  }
</script>

<template>
  <div class="component-demo">
    <el-tabs v-model="activeName">
      <el-tab-pane label="文本溢出" name="first">
        <TextEllipsis />
      </el-tab-pane>

      <el-tab-pane label="返回顶部" name="second">
        <BackToTop />
      </el-tab-pane>

      <el-tab-pane label="消息提示" name="third">
        <Reminder />
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import TextEllipsis from './components/TextEllipsis';
  import BackToTop from './components/BackToTop';
  import Reminder from './components/Reminder';

  export default {
    name:'ComponentDemo',
    components: {
      TextEllipsis,
      BackToTop,
      Reminder
    },
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>
<style scoped>
  .component-demo {
    min-height: 400px;
    padding: 0 20px 20px;
    background-color: #fff;
  }
</style>

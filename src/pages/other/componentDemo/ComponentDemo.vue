<template>
  <div class="component-demo">
    <el-tabs v-model="activeName">
      <el-tab-pane label="文本溢出" name="first">
        <keep-alive v-if="activeName === 'first'">
          <TextEllipsis />
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="返回顶部" name="second">
        <keep-alive v-if="activeName === 'second'">
          <BackToTop />
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="滚动条" name="third">
        <keep-alive v-if="activeName === 'third'">
          <!-- <Scrollbar /> -->
        </keep-alive>
      </el-tab-pane>

      <el-tab-pane label="消息提示" name="forth">
        <keep-alive v-if="activeName === 'forth'">
          <Reminder />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import TextEllipsis from './components/TextEllipsis';
  import BackToTop from './components/BackToTop';
  import Scrollbar from './components/Scrollbar';
  import Reminder from './components/Reminder';

  export default {
    name: 'ComponentDemo',
    components: {
      TextEllipsis,
      BackToTop,
      Scrollbar,
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

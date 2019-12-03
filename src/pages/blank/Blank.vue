<template>
  <div>
    <div ref="dom">
      <p>第一行内容111</p>
      <input type="text" value="3333gfgf">
      <img src="https://s2.ax1x.com/2019/08/02/edRc1P.jpg" alt="">
      <p style="text-indent: 2em">第二行内容222</p>
      <p>第三行内容333</p>
    </div>
    <el-button v-copy="dom">复制</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Blank',
    data() {
      return {
        dom: 'aaa'
      }
    },
    created() {},
    mounted() {
      setTimeout(() => {
        this.dom = this.$refs.dom;
      }, 3000);

    },
    updated() {},
    methods: {

    },
  }
</script>
<style scoped>

</style>

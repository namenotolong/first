<template>
  <div class="copy-dom">
    <div class="content" ref="content">
      <p>第一行内容111</p>
      <p style="text-indent: 2em">第二行内容222</p>
      <p>第三行内容333</p>
    </div>

    <el-button type="primary" @click="handleCopy">复制</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      handleCopy() {
        const content = this.$refs.content;
        const selection = window.getSelection();
        // 如果剪切板中已经有复制了的内容，需要清掉。
        if (selection.rangeCount > 0) selection.removeAllRanges();
        const range = document.createRange();
        range.selectNode(content);
        selection.addRange(range);
        document.execCommand("Copy");
        // 清除选中的内容,也可以使用 window.getSelection().removeAllRanges()
        range.collapse(false);
        this.$message.success('复制成功');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .copy-dom {
    .content {
      background-color: #fff;
      font-size: 18px;
      color: red;
    }
  }
</style>

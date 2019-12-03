<template>
  <div>
    <el-button type="primary" @click="handleCopy">复制</el-button>
  </div>
</template>


<script>
  export default {
    props: ['elem'],
    methods: {
      handleCopy() {
        console.log(this.elem);
        // const content = this.$refs.copyContent;
        const content = this.elem;
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

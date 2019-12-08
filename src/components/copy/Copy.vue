<template>
  <div>
    <el-button type="primary" @click="handleCopy">复制</el-button>
  </div>

</template>

<script>
  export default {
    props: ['content'],
    methods: {
      handleCopy() {
        const copyNode = (elem) => {
          const selection = window.getSelection();
          // 如果剪切板中已经有复制了的内容，需要清掉。
          if (selection.rangeCount > 0) selection.removeAllRanges();
          const range = document.createRange();
          range.selectNodeContents(elem);
          selection.addRange(range);
          document.execCommand('Copy');
          // 清除选中的内容,也可以使用 window.getSelection().removeAllRanges()
          range.collapse(false);
          this.$message.success('复制成功');
        }

        if (!this.content) {
          this.$message.warning('没有要复制的内容');
        } else if (this.content.nodeType === 1) {
          copyNode(this.content);
        } else if (typeof this.content === 'string') {
          const wrap = document.createElement('p');
          wrap.innerText = this.content;
          document.body.appendChild(wrap);
          copyNode(wrap);
          document.body.removeChild(wrap);
        } else {
          this.$message.warning('没有可以复制的内容');
        }
      }
    }
  }
</script>

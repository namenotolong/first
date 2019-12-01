<template>
  <div class="copy-form">
    <!-- textarea不能禁用 -->
    <textarea class="content" ref="content" cols="50" rows="5" :value="text" @focus="handleFocus"></textarea>

    <el-button type="primary" @click="handleCopy">复制</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: `第一行内容1111
                 第二行内容2222222
              第三行内容33`,
        isCopy: false,
      }
    },
    methods: {
      handleFocus(e) {
        // 避免用户点击textarea的时候，textarea获得焦点。
        // 而在进行复制的时候，textarea又需要获得焦点而被选中，这点通过isCopy来控制
        if (!this.isCopy) {
          e.target.blur();
        }
      },
      handleCopy() {
        this.isCopy = true;
        const content = this.$refs.content;
        // 选择要复制的内容
        content.select();
        // 执行浏览器复制命令
        document.execCommand("Copy");
        // 复制完之后自动失去焦点，不然文字内容会是选蓝状态。
        content.blur();
        this.isCopy = false;
        this.$message.success('复制成功');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .copy-form {
    .content {
      border: none;
      resize: none;
      cursor: default;
    }
  }
</style>

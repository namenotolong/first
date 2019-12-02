<template>
  <div class="copy-form">
    <!-- 利用textarea和input进行复制-->
    <!-- textarea和inpu不能禁用 -->
    <textarea
      ref="copyContent"
      v-show="visible"
      :cols="cols"
      :rows="rows"
      :value="text"
      @focus="handleFocus">
     </textarea>
    <el-button type="primary" @click="handleCopy">复制</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      cols: {
        type: Number,
        default: 50
      },
      rows: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        isCopy: false
      }
    },
    methods: {
      handleFocus(e) {
        // 避免点击textarea的时候，textarea获得焦点。
        // 而在进行复制的时候，textarea又需要获得焦点而被选中，这点通过isCopy来控制
        if (!this.isCopy) {
          e.target.blur();
        }
      },
      handleCopy() {
        this.isCopy = true;
        const content = this.$refs.copyContent;
        // 选择要复制的内容
        content.select();
        // 执行浏览器复制命令
        document.execCommand("Copy");
        // 复制完之后自动失去焦点。
        content.blur();
        this.isCopy = false;
        this.$message.success('复制成功');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .copy-form {
    textarea {
      display: block;
      margin-bottom: 1em;
      border: 1px solid #d9d9d9;
      resize: none;
      cursor: default;
    }
  }
</style>

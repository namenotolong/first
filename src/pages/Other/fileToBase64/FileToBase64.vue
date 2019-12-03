<template>
  <div class="file-to-base64" ref="page">
    <div class="operation-wrap">
      <div class="operation">
        <el-button type="primary" @click="handleClear">清除</el-button>
        <el-button type="primary" @click="handleCopy">复制</el-button>
      </div>
    </div>

    <div class="empty" v-if="!haveFile">任意文件<br />拖到这里</div>
    <div class="content" ref="content"></div>

  </div>
</template>

<script>
  // import { copyNode } from '@/utils/core';

  export default {
    name: 'FileToBase64',
    data() {
      return {
        haveFile: false,
        text: ''
      }
    },
    mounted() {
      this.onDrop();
    },
    methods: {
      onDrop() {
        const page = this.$refs.page;
        page.addEventListener('dragenter', (event) => { event.preventDefault() });
        page.addEventListener('dragover', (event) => { event.preventDefault() });
        page.addEventListener('drop', (event) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target.result;
            this.$refs.content.insertAdjacentHTML('afterBegin', `<p>${result}</p>`);
            this.text = result;
            this.haveFile = true;
          };
          reader.readAsDataURL(event.dataTransfer.files[0]);
          event.preventDefault();
        });
      },
      handleClear() {
        this.$refs.content.innerHTML = '';
        this.text = '';
        this.haveFile = false;
      },
      handleCopy() {
        // if (copyNode(this.$refs.content)) {
        //   this.$message.success('复制成功');
        // }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .file-to-base64 {
    box-sizing: border-box;
    min-height: 100%;
    padding: 1em;
    background-color: #fff;

    .operation-wrap {
      height: 50px;

      .operation {
        float: right;
      }
    }

    .empty {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      font-family: Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace;
      white-space: pre;
      text-align: center;
      color: gray;
    }

    .content {
      word-break: break-all;
      font-family: Consolas, "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", Monaco, "Courier New", monospace;
    }

    .copy-dom {
      // display: inline-block;
      margin-left: 10px;
    }
  }
</style>

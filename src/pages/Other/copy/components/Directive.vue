<template>
  <div class="copy-directive">
    <div class="content" v-copy>
      <p>点我就可以复制我</p>
      <p>点我就可以复制我</p>
      <p>点我就可以复制我</p>
      <p>点我就可以复制我</p>
      <p>点我就可以复制我</p>
      <p>点我就可以复制我</p>
    </div>

    <div class="content red">
      <p>我是红色的内容</p>
      <p>我是红色的内容</p>
      <p>我是红色的内容</p>
      <p>我是红色的内容</p>
      <p>我是红色的内容</p>
    </div>

    <el-button type="primary" v-copy="">点击复制红色内容</el-button>

  </div>

</template>

<style lang="scss" scoped>
  .copy-directive {
    .content {
      padding: 1em;
      text-align: center;
      border: 1px solid #d9d9d9;
      cursor: pointer;
      margin-bottom: 1em;
    }

    .red {
      color: #f56c6c
    }
  }
</style>

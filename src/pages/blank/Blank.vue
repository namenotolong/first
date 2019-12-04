<template>
  <div>
    <section>
      <div class=" copy-directive__content red" ref="dom">
        内容 内容 内容 内容 内容 内容
      </div>
      <p  v-copy="dom"> 地方</p>
      <!-- <el-button v-copy="dom">点击复制红色内容</el-button> -->
      <p>dd</p>
    </section>

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
      this.dom = this.$refs.dom;

    },
    updated() {},
    methods: {

    },
  }
</script>
<style scoped>

</style>

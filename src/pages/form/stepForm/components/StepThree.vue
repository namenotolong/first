<template>
  <div>
    <div style="text-align:center;">
      <el-button type="primary" @click="handleReload">重新填写</el-button>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleReload() {
        this.$emit('onReload');
      }
    },
  }
</script>

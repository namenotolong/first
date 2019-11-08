<template>
  <div>
    <input type="text">
    <button @click="handleAdd">增加</button>
    <button @click="handleRefresh">刷新</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        number: 0
      }
    },
    created() {
      console.log('组件创建')
    },
    updated() {
      console.log('组件刷新了');
      console.log(this.number);
    },
    methods: {
      handleAdd() {
        this.number++;
      },
      handleRefresh() {
        this.$router.replace('/');
        // this.$router.replace('/blank/index')
      }
    },
  }
</script>

<template>
  <div class="table-title">
    <span class="table-title__tag"></span>
    <span class="table-title__name">{{name}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
    }
  }
</script>

<style lang="scss" scoped>
  .table-title {
    display: inline-block;
    margin-right: 10px;

    .table-title__tag {
      display: inline-block;
      width: 6px;
      height: 18px;
      background-color: var(--theme);
      border-radius: 50%;
      vertical-align: middle;
    }

    .table-title__name {
      font-size: 18px;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
</style>

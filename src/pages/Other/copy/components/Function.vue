<template>
  <div>
    <p></p>
    <el-button type="primary">复制</el-button>
  </div>
</template>

<script>
  import { copy } from '@/utils/core';

  export default {
    methods: {
      handleCopy(){
        copy()
      }
    },
  }
</script>

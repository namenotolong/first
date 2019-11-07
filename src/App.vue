<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';

  export default {
    created() {
      this.initBaseTable();
    },
    methods: {
      // 初始化基础数据表
      async initBaseTable() {
        const response = await api.common.getBaseTable();
        tableMng.initTable(response.data);
      }
    },
  }
</script>

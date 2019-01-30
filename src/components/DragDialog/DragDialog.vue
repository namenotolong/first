<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <p>这是一段信息</p>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    props: {},
    data() {
      return {
        dialogVisible: false
      };
    }
  };
</script>
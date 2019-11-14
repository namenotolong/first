<template>
  <div>
    <input type="text">
    <el-input v-model="value"></el-input>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <!--  带不带sync都可以 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Blank',
    data() {
      return {
        value: '',
        dialogVisible: false
      }
    },
    created() {},
    updated() {},
    methods: {
      handleClose() {
        console.log(11);
        this.dialogVisible = false;
      }
    },
  }
</script>

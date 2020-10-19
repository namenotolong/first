<template>
  <el-dialog
    class="user-edit"
    :title="id ? '编辑消息' : '新增系统消息'"
    width="700px"
    :visible="visible"
    :before-close="handleBeforeClose">
    <el-form
      ref="form"
      :model="userInfo"
      :rules="formRules"
      label-width="70px"
      v-loading="getDetailLoading">
      <el-form-item label="内容:" prop="content">
        <el-input v-model="userInfo.content" placeholder="请填写昵称" clearable/>
      </el-form-item>
      <el-form-item label="时间:" prop="createTime">
        <el-date-picker
          v-model="userInfo.createTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import api from '@/api';

  const defaultInfo = {
    content: '',
    createTime: '',
  }

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        params:{},
        userInfoBackup: { ...defaultInfo },
        userInfo: { ...defaultInfo },
        formRules: {
          content: [
            { required: true,
              message: '请输入内容',
              trigger: 'blur'
            }
          ],
          createTime: [
            { required: true,
              message: '请选择时间',
              trigger: 'blur'
            }
          ],
        },
        submitLoading: false,
        getDetailLoading: false
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.submitLoading = true;
            await api.message.update(this.userInfo);
            this.submitLoading = false;
            this.handleClose();
            this.$emit('onSave');
            this.$message.success('提交成功');
          } else {
            this.$message.error('请按照正确格式填写');
          }
        });
      },
      handleBeforeClose() {
        if (window.JSON.stringify(this.userInfoBackup) === window.JSON.stringify(this.userInfo)) {
          this.handleClose();
        } else {
          this.$confirm('信息修改后未提交，确认关闭？', '提示', {
            type: 'warning',
          }).then(() => {
            this.handleClose();
          }).catch(() => {})
        }
      },
      handleClose() {
        this.$refs.form.resetFields();
        this.userInfo = defaultInfo;
        this.userInfoBackup = defaultInfo;
        this.$emit('onClose');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-edit {}
</style>

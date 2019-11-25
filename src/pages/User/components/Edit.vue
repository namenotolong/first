<template>
  <el-dialog
    class="user-edit"
    :title="id ? '编辑用户' : '新增用户'"
    width="700px"
    :visible="visible"
    :before-close="handleBeforeClose">
    <el-form
      :model="userInfo"
      :rules="formRules"
      ref="form"
      label-width="70px"
      v-loading="getDetailLoading">
      <el-form-item label="账号:" prop="account">
        <el-input v-model="userInfo.account" placeholder="请填写账号" clearable :disabled="id ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="userInfo.name" placeholder="请填写用户姓名" clearable></el-input>
      </el-form-item>

      <el-form-item label="角色:" prop="roles">
        <el-select v-model="userInfo.roles" multiple placeholder="请选择用户角色">
          <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别:">
        <el-radio-group v-model="userInfo.gender">
          <el-radio v-for="item in tableMng.getTable('gender')" :key="item.id" :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像:">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          :style="{backgroundImage:`url(${userInfo.avatar ? userInfo.avatar : '' })`}">
          <i class="icon" :class="uploading ? 'el-icon-loading' : 'el-icon-plus' " v-if="!userInfo.avatar"></i>
        </el-upload>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="手机:" placeholder="请填写手机号" prop="mobilePhone">
            <el-input v-model="userInfo.mobilePhone" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱:" placeholder="请填写邮箱地址" prop="email">
            <el-input v-model="userInfo.email" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';

  const defaultInfo = {
    account: '',
    name: '',
    roles: [],
    gender: '',
    avatar: '',
    mobilePhone: '',
    email: ''
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
    watch: {
      visible(value) {
        if (value) {
          this.getDetail();
        }
      }
    },
    data() {
      return {
        tableMng,
        userInfoBackup: { ...defaultInfo },
        userInfo: { ...defaultInfo },
        formRules: {
          account: [{
            required: true,
            message: '请填写账号',
            trigger: 'blur'
          }, {
            pattern: /^[a-zA-Z0-9_]{5,10}$/,
            message: '账号为5到10位的字母、数字或下划线组成',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }, {
            max: 6,
            message: '姓名长度不能超过6个字',
            trigger: 'blur'
          }],
          roles: [{
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }],
          mobilePhone: [{
            required: true,
            message: '请填写手机号',
            trigger: 'blur'
          }, {
            pattern: /^1[345789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }],
          email: [{
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }]
        },
        uploading: false,
        submitLoading: false,
        getDetailLoading: false
      }
    },
    methods: {
      async getDetail() {
        if (!this.id) return;
        this.getDetailLoading = true;
        const response = await api.user.getDetail({ id: this.id });
        this.userInfo = { ...response.data.detail };
        this.userInfoBackup = { ...response.data.detail };
        this.getDetailLoading = false;
      },
      handleSubmit() {
        this.submitLoading = true;
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.user.save({
              detail: this.userInfo
            }).then(res => {
              this.submitLoading = false;
              this.handleClose();
              this.$emit('onSave');
              this.$message.success('提交成功');
            })
          } else {
            this.submitLoading = false;
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
      },
      beforeUpload(file) {
        this.uploading = true;
        this.userInfo.avatar = '';
        const isImage = /\.(jpg|png)$/.test(file.name);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isImage) {
          this.$message.error('上传头像图片只能是jpg或png格式!');
          this.uploading = false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          this.uploading = false;
        }
        return isImage && isLt2M;
      },
      handleUploadSuccess(res, file) {
        this.uploading = false;
        this.userInfo.avatar = window.URL.createObjectURL(file.raw);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .user-edit {
    .avatar-uploader {
      box-sizing: border-box;
      width: 140px;
      height: 140px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      border: 1px dashed #d9d9d9;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        border-color: #409EFF;
      }

      .icon {
        font-size: 28px;
        color: #8c939d;
        line-height: 140px;
        text-align: center;
      }
    }
  }
</style>

<style lang="scss">
  .user-edit {
    .avatar-uploader {
      .el-upload {
        width: 100%;
        height: 100%;
      }
    }

  }
</style>

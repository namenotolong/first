<template>
  <div class="mine">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
      label-width="70px">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="角色：">
        <el-select v-model="userInfo.roles" multiple disabled placeholder="请选择用户角色">
          <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别：" prop="gender">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess">
          <img class="avatar" v-if="userInfo.avatar" :src="userInfo.avatar">
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          <p>点击上传</p>
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

    <el-button type="primary" round :loading="submitLoading" @click="handleSubmit">提交</el-button>

  </div>
</template>
<script>
  import api from '@/api';
  import tableMng from '@/utils/tableMng';

  export default {
    name: "Mine",
    data() {
      return {
        tableMng,
        userInfo: {
          name: '',
          roles: '',
          gender: '',
          avatar: '',
          mobilePhone: '',
          email: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请填写姓名',
            trigger: 'blur'
          }, {
            max: 6,
            message: '姓名长度不能超过6个字',
            trigger: 'blur'
          }],
          gender: [{
            required: true,
            message: '请选择性别',
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
          }],
        },
        submitLoading: false
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      async getUserInfo() {
        const response = await api.account.getUserInfo({ userId: sessionStorage.getItem('userId') });
        this.userInfo = response.data.userInfo;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是jpg或png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
      },
      handleAvatarSuccess(res, file) {
        // 实例开发中使用后端返回的图片地址。
        this.userInfo.avatar = URL.createObjectURL(file.raw);
      },
      handleSubmit() {
        this.submitLoading = true;
        this.$refs.userInfo.validate(valid => {
          if (valid) {
            this.$message.success("更新成功");
          } else {}
          this.submitLoading = false;
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mine {
    width: 50%;
    min-width: 300px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }

    .avatar {
      width: 120px;
      display: block;
    }

    .el-button {
      display: block;
      margin: 0 auto
    }
  }
</style>

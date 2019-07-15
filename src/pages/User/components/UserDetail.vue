<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="handleClose" width="500px">
    <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="70px" label-position="left" v-loading="getDetailLoading">
      <el-form-item label="账号：" prop="account">
        <el-input v-model="userInfo.account" placeholder="请填写账号" clearable :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="userInfo.name" placeholder="请填写用户姓名" clearable></el-input>
      </el-form-item>

      <el-form-item label="角色：" prop="role">
        <el-select v-model="userInfo.role" placeholder="请选择用户角色">
          <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别：">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像：">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>

      <el-form-item label="手机：" placeholder="请填写手机号" prop="mobilePhone">
        <el-input v-model="userInfo.mobilePhone" clearable></el-input>
      </el-form-item>

      <el-form-item label="邮箱：" placeholder="请填写邮箱地址" prop="email">
        <el-input v-model="userInfo.email" clearable></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { getUserDetail } from "@/api/user.js";
  import bus from "@/utils/bus.js";

  export default {
    data() {
      return {
        isEdit: false,
        userInfo: {
          account: "",
          name: "",
          role: "",
          gender: "",
          avatar: "",
          mobilePhone: "",
          email: "",
        },
        userInfoReset: {},
        userInfoBackup: {},
        rules: {
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
          role: [{
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }],
          mobilePhone: [{
            pattern: /^1[345789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }],
          email: [{
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }]
        },
        roleList: [{
          value: "管理员",
          label: "管理员"
        }, {
          value: "编辑",
          label: "编辑"
        }, {
          value: "普通会员",
          label: "普通会员"
        }, {
          value: "高级会员",
          label: "高级会员"
        }, {
          value: "普通用户",
          label: "普通用户"
        }],
        submitLoading: false,
        getDetailLoading: false,
        dialogVisible: false,
        title: "编辑用户"
      }
    },
    created() {
      bus.$on("userDetail", (id) => {
        Object.assign(this.userInfoReset, this.userInfo);
        Object.assign(this.userInfoBackup, this.userInfo);
        if (id) {
          this.isEdit = true;
          this.title = "编辑用户";
          this.getUserDetail(id);
        } else {
          this.isEdit = false;
          this.title = "创建用户";
        }
        this.dialogVisible = true;
      })
    },
    methods: {
      getUserDetail(id) {
        this.getDetailLoading = true;
        getUserDetail({
          id
        }).then(res => {
          this.userInfo = res.data.userDetail;
          Object.assign(this.userInfoBackup, this.userInfo);
          this.getDetailLoading = false;
        }).catch(error => {
          this.getDetailLoading = false;
        })
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
        // 实际开发中使用后端返回的图片地址。
        this.userInfo.avatar = URL.createObjectURL(file.raw);
      },
      submit() {
        this.submitLoading = true;
        this.$refs.userInfo.validate(valid => {
          if (valid) {
            this.$message.success("提交成功");
            this.submitLoading = false;
            if (this.isEdit) {
              this.dialogVisible = false;
              this.resetForm();
            } else {
              this.resetForm();
            }
          } else {
            this.submitLoading = false;
          }
        });
      },
      handleClose() {
        const userInfo = this.userInfo;
        const userInfoBackup = this.userInfoBackup;
        const result = Object.keys(userInfo).every(key => {
          return userInfo[key] === userInfoBackup[key];
        })
        if (result) {
          this.dialogVisible = false;
          this.resetForm();
        } else {
          this.$confirm("信息修改后未提交，确认关闭？", "提示", {
            type: 'warning',
          }).then(() => {
            this.dialogVisible = false;
            this.resetForm();
          }).catch(() => {

          })
        }
      },
      resetForm() {
        Object.assign(this.userInfo, this.userInfoReset);
        this.$refs.userInfo.resetFields();
      },
    }
  }
</script>
<style lang="scss" scoped>
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
</style>
<style lang="scss">
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        border-color: #409EFF;
      }
    }
  }
</style>

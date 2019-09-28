<template>
  <!-- 忘记密码 -->
  <div class="forget-password">

    <div class="form">
      <div class="title">找回密码</div>
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请填写手机号"></el-input>
        </el-form-item>

        <el-form-item class="valid-code" label="验证码：" prop="validCode">
          <el-input v-model="formData.validCode" placeholder="短信验证码"></el-input>
          <el-button class="valid-button" @click="getValidCode" :disabled="getValidCodeLoading" v-text="validButtonText"></el-button>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="6~20位数字、字母、符号组合"></el-input>
        </el-form-item>

        <el-form-item label="确认密码：" prop="checkPassword">
          <el-input v-model="formData.checkPassword" type="password" placeholder="请再次输入密码确认" @keyup.enter.native="submit"></el-input>
        </el-form-item>

        <el-form-item class="submit">
          <el-button type="primary" size="large" :loading="loading" @click="submit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
  import api from '@/api';

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
          callback(new Error('密码至少要包含数字和字母！'));
        } else {
          if (this.formData.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };
      return {
        formData: {
          mobile: '',
          validCode: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          mobile: [{
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          }, {
            pattern: /^1[345789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }],
          validCode: [{
            required: true,
            message: '请填写验证码',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, {
            validator: validatePass,
            trigger: 'blur'
          }, {
            min: 6,
            max: 20,
            message: '密码长度为6~20位',
            trigger: 'blur'
          }],
          checkPassword: [{
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          }, {
            validator: validatePass2,
            trigger: 'blur'
          }],
        },
        loading: false,
        getValidCodeLoading: false,
        validButtonText: '获取验证码'
      }
    },
    methods: {
      // 设置获取验证码按钮的默认状态
      setDefaultValidButton(timer) {
        clearInterval(timer);
        this.getValidCodeLoading = false;
        this.validButtonText = '获取验证码';
      },
      // 获取验证码
      getValidCode() {
        if (!this.formData.mobile.match(/^1[345789]\d{9}$/)) {
          this.$message({
            type: 'error',
            message: '请填写正确的手机号！'
          });
          return false;
        }

        this.getValidCodeLoading = true;
        let totalTime = 60;
        let timer = null;
        timer = setInterval(() => {
          totalTime--;
          if (totalTime > 0) {
            this.validButtonText = `获取验证码(${totalTime}s)`;
          } else {
            this.setDefaultValidButton(timer);
          }
        }, 1000);

        // 发送获取验证码的请求
        api.account.getValidCode({
          phone: this.formData.mobile
        }).then(res => {
          if (res.meta.success == true) {
            this.$message({
              type: 'success',
              message: `验证码已发送至手机${
                  this.formData.mobile
                }，请注意查收！`
            });
          } else {
            this.$message({
              type: 'error',
              message: res.meta.msg
            });
            this.setDefaultValidButton(timer);
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '发送失败，请稍后再试！'
          });
          this.setDefaultValidButton(timer);
        });
      },
      // 提交
      submit() {
        this.loading = true;
        this.$refs.form.validate(valid => {
          if (valid) {
            const formData = this.formData;
            api.account.modifyPassword({
              phone: formData.mobile,
              verifyCode: formData.validCode,
              password: formData.password,
              retryPassword: formData.checkPassword,
            }).then(res => {
              if (res.meta.success == true) {
                this.$message({
                  type: "success",
                  message: "密码修改成功，请重新登录！"
                });
                this.$router.push('/login')
              } else {
                this.$message({
                  type: "error",
                  message: res.data.users
                });
              }
              this.loading = false;
            }).catch(err => {
              this.loading = false;
            });
          } else {
            this.$message({
              type: 'error',
              message: '请填写正确的信息！'
            });
            this.loading = false;
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .forget-password {
    .form {
      box-sizing: border-box;
      width: 1100px;
      height: 600px;
      padding: 20px 350px;
      border: 10px solid rgba(255, 255, 255, 0.4);
      border-radius: 14px;
      background-clip: padding-box;
      background-color: #fff;

      .title {
        margin-bottom: 20px;
        text-align: center;
        font-size: 18px;
        color: $primary-text-color;
      }

      .valid-code {
        .el-input {
          display: inline-block;
          width: 135px;
          margin-right: 8px;
        }

        .valid-button {
          float: right;
        }
      }

      .submit {
        .el-button {
          width: 100%;
        }
      }
    }
  }
</style>

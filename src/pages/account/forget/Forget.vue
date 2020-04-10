<template>
  <!-- 忘记密码 -->
  <div class="forget">
    <p class="forget__header">忘记密码</p>

    <el-form class="forget__body" ref="form" :model="formData" :rules="rules" label-width="80px">

      <el-form-item label="新密码" prop="password">
        <el-input v-model="formData.password" type="password" placeholder="6~20位数字、字母、符号组合"></el-input>
      </el-form-item>

      <el-form-item label="确认" prop="checkPassword">
        <el-input v-model="formData.checkPassword" type="password" placeholder="请再次输入密码确认" @keyup.enter.native="submit"></el-input>
      </el-form-item>


      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入你的邮箱"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="captcha">
        <el-row>
          <el-col :span="12">
            <el-input v-model="formData.captcha" placeholder="请输入短信验证码"></el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-button style="width:100%" @click="getCaptcha" :disabled="captchaLoading">{{captchaButtonText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-row>
          <el-col :span="11">
            <el-button style="width:100%" type="primary" :loading="submitLoading" @click="handleSubmit">确认</el-button>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-button style="width:100%" type="info" @click="handleCancel">取消 </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
  import api from '@/api';

  export default {
    data() {
      let validateEmail = (rule, value, callback) => {
        let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!reg.test(value)) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      };
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
          email: '',
          captcha: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          email: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }, {
            validator: validateEmail,
            trigger: 'blur'
          }],
          captcha: [{
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
        submitLoading: false,
        captchaLoading: false,
        captchaButtonText: '获取验证码'
      }
    },
    methods: {
      // 设置获取验证码按钮的默认状态
      setDefaultCaptchaButton(timer) {
        clearInterval(timer);
        this.captchaLoading = false;
        this.captchaButtonText = '获取验证码';
      },
      // 校验邮箱
      validPhone(email) {
        let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        return reg.test(email);
      },
      // 获取验证码
      async getCaptcha() {
        if (!this.validPhone(this.formData.email)) return;

        // 倒计时
        this.captchaLoading = true;
        let totalTime = 60;
        let timer = null;
        timer = setInterval(() => {
          totalTime--;
          if (totalTime > 0) {
            this.captchaButtonText = `获取验证码(${totalTime}s)`;
          } else {
            this.setDefaultCaptchaButton(timer);
          }
        }, 1000);

        await api.account.getCaptcha({ email: this.formData.email });
        this.$message.success(`验证码已发送至邮箱${ this.formData.email }，请注意查收！`);
      },
      // 提交
      handleSubmit() {
        this.submitLoading = true;
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if(this.captchaButtonText == '获取验证码') {
              this.$message.error("请获取验证码！");
              return;
            }
            const formData = {};
            formData.code = this.formData.captcha;
            formData.email = this.formData.email;
            formData.password = this.formData.password;
            try {
              await api.account.modifyPassword(formData);
            } catch (e) {
              this.submitLoading = false;
              return;
            }
            this.$message.success('修改成功,请使用新密码进行登录');
            this.$router.replace('/');
            this.submitLoading = false;
          } else {
            this.$message.warning('请按正确格式填写信息');
            this.submitLoading = false;
          }
        });
      },
      handleCancel() {
        this.$router.push('/account/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .forget {
    padding: 15px 20px;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
    border-radius: 10px;

    .forget__header {
      font-size: 22px;
      text-align: center;
      color: #fff;
    }

    .forget__body {
      margin-top: 20px;
    }
  }
</style>

<style lang="scss">
  .forget {

    .el-form-item__label,
    .el-checkbox__label {
      color: #fff;
    }
  }
</style>

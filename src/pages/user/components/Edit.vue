<template>
  <el-dialog
    class="user-edit"
    :title="id ? '编辑用户' : '新增用户'"
    width="700px"
    :visible="visible"
    :before-close="handleBeforeClose">
    <el-form
      ref="form"
      :model="userInfo"
      :rules="formRules"
      label-width="70px"
      v-loading="getDetailLoading">
      <el-form-item label="昵称:" prop="userName">
        <el-input v-model="userInfo.userName" placeholder="请填写昵称" clearable/>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="userInfo.email" placeholder="请填写邮箱" clearable/>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="userInfo.password" placeholder="请填写密码" clearable :type="passwordType">
          <svg-icon icon-name="password" slot="prefix" icon-class="icon" />
          <svg-icon icon-name="eye" slot="suffix" @click.native="showPwd" icon-class="icon icon-eye" />
        </el-input>
      </el-form-item>

      <el-form-item label="角色:" prop="role">
        <el-select v-model="userInfo.role" placeholder="请选择用户角色">
          <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="性别:" prop="gender">
        <el-radio-group v-model="userInfo.gender">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="头像:">
        <avatar-upload
          :params="params"
          :baseUrl="baseUrl"
          v-on:update-img="updateImg"
          v-model="baseUrl + userInfo.picture"
          :action= "baseUrl + '/file/uploadImg'"
          name="file" />
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="学校:" placeholder="请填写学校" prop="school">
            <el-input v-model="userInfo.school" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工作:" placeholder="请填写工作" prop="work">
            <el-input v-model="userInfo.work" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄:" placeholder="请填写年龄" prop="age">
            <el-input v-model="userInfo.age" type="number" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址:" placeholder="请填写地址" prop="address">
            <el-input v-model="userInfo.address" clearable></el-input>
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
  import AvatarUpload from '@/components/upload/avatarUpload';
  import { encrypt,decrypt } from '@/utils/crypto';

  const defaultInfo = {
    id: '',
    userName: '',
    email: '',
    school: '',
    work: '',
    age: '',
    address: '',
    role: '',
    gender: '',
    picture: '',
    password: '',
    sex: '',
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
    components: {
      AvatarUpload
    },
    watch: {
      visible(value) {
        if (value) {
          this.getDetail();
        }
      }
    },
    data() {
      let validateUserName = (rule, value, callback) => {
        let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (reg.test(value)) {
          callback(new Error('用户名不能是邮箱格式'));
        } else if (!this.id) {
          this.checkAccountUnique(value, 1).then(data => {
            if (!data) {
              callback('该用户名已被注册');
            } else {
              callback();
            }
          })
        } else {
          callback();
        }
      };
      let validateEmail = (rule, value, callback) => {
        let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!reg.test(value)) {
          callback(new Error('邮箱格式不正确'));
        } else if (!this.id){
          this.checkAccountUnique(value, 0).then(res => {
            if (!res) {
              callback('该邮箱已被注册');
            } else {
              callback();
            }
          })
        } else {
          callback();
        }
      };
      return {
        baseUrl: 'http://zhsdsb.top:8081',
        tableMng,
        params:{},
        passwordType: "password",
        userInfoBackup: { ...defaultInfo },
        userInfo: { ...defaultInfo },
        formRules: {
          userName: [
            { validator: validateUserName, trigger: 'blur',required: true }
          ],
          role: [{
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }],
          gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          email: [
            { validator: validateEmail, trigger: 'blur',required: true }
          ],
        },
        submitLoading: false,
        getDetailLoading: false
      }
    },
    methods: {
      /**
       * 更新头像的回调方法
       * @param url
       */
      updateImg(url){
        this.userInfo.picture = url;
      },
      showPwd() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
      },
      //验证账号唯一性
      async checkAccountUnique(account,ops) {
        let obj = {}
        obj.account = account;
        obj.ops = ops;
        return await api.user.unique(obj);
      },
      async getDetail() {
        if (!this.id) return;
        this.getDetailLoading = true;
        const data = await api.user.getDetail({ id: this.id });
        this.userInfo = { ...data };
        this.userInfo.role = tableMng.getNameById('role',this.userInfo.role)
        this.userInfo.password = decrypt(this.userInfo.password)
        this.userInfoBackup = { ...data };
        this.getDetailLoading = false;
      },
      handleSubmit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.submitLoading = true;
            this.id ? this.userInfo.ops = 1 : this.userInfo.ops = 0;
            this.userInfo.role = tableMng.getIdByName("role", this.userInfo.role)
            this.userInfo.sex = tableMng.getNameById("gender", this.userInfo.gender)
            this.userInfo.password = encrypt(this.userInfo.password)
            await api.user.update(this.userInfo);
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

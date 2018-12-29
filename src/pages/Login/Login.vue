<template>
    <div class="login">
        <h1 class="login__header">后台管理系统</h1>

        <el-form ref="loginForm" :model="loginForm" :rules="loginRule" auto-complete="on">
            <el-form-item label="账号" prop="username">
                <i class="iconfont icon-account"></i>
                <el-input type="text" auto-complete="on" autofocus v-model="loginForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <i class="iconfont icon-password"></i>
                <el-input :type="passwordType" auto-complete="on" v-model="loginForm.password" @keyup.enter.native="submitLogin"
                    placeholder="请输入密码"></el-input>
                <i class="iconfont icon-eye" @click="showPwd"></i>
            </el-form-item>

            <el-form-item>
                <el-checkbox v-model="loginForm.rememberPwd">记住密码</el-checkbox>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loginLoading" round @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script>
    import {
        login
    } from "../../api/sysUser.js";
    export default {
        data() {
            return {
                loginForm: {
                    username: "admin",
                    password: "123456",
                    rememberPwd: false
                },
                loginRule: {
                    username: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }, {
                        min: 6,
                        message: "密码长度不能少于六位",
                        trigger: "blur"
                    }]
                },
                passwordType: "password",
                loginLoading: false
            };
        },
        created() {

        },
        mounted() {
            document.body.className = "body-background";
        },
        methods: {
            showPwd() {
                this.passwordType = this.passwordType == "password" ? "text" : "password";
            },
            submitLogin() {
                this.loginLoading = true;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        login(this.loginForm).then(() => {
                            sessionStorage.setItem("ms_username", this.loginForm.username);
                            this.loginLoading = false;
                            this.$router.push("/dashboard");
                            document.body.className = "";
                        })
                    } else {
                        this.$message({
                            type: "error",
                            message: "登录失败"
                        })
                        this.loginLoading = false;
                    }
                })
            }
        }
    };
</script>
<style lang="scss" scoped>
    .login {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        width: 400px;
        padding: 15px 30px;
        background-color: rgba(255, 255, 255, 0);
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
        border-radius: 10px;

        .login__header {
            line-height: 60px;
            text-align: center;
            font-weight: normal;
            color: #fff;
        }

        .iconfont {
            position: absolute;
            top: 40px;
            z-index: 10;
        }

        .icon-account,
        .icon-password {
            left: 10px;
        }

        .iconfont.icon-eye {
            right: 10px;
            cursor: pointer;
        }
    }
</style>

<style lang="scss">
    .body-background {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: url(../../assets/img/login-bg.jpg) no-repeat fixed center;
        background-size: cover;
    }

    .login {
        .el-input__inner {
            border-radius: 20px;
            padding-left: 30px;
            padding-right: 30px;
        }

        .el-form-item__label,
        .el-checkbox__label {
            color: #fff;
        }

        .el-button {
            display: block;
            width: 100%;
            color: #fff;
            border: none;
            transition: 0.5s all;
        }
    }
</style>
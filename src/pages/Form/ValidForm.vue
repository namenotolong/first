<template>
    <div class="valid-form">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon label-width="100px">

            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass"></el-input>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>

        </el-form>
        <div style="text-align:center;">
            <el-button type="primary" round @click="submit" :loading="submitLoading">提交</el-button>
            <el-button round @click="resetForm">重置</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name:"ValidForm",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validatekAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入正整数'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
            };
            return {
                ruleForm: {
                    pass: "",
                    checkPass: "",
                    age: ""
                },
                rules: {
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    age: [{
                        validator: validatekAge,
                        trigger: 'blur'
                    }]
                },
                submitLoading: false
            };
        },
        methods: {
            submit() {
                this.submitLoading = true;
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.$message.success("提交成功！");
                    } else {
                        this.$message.error("请填写带*星号的内容！");
                    }
                })
                this.submitLoading = false;
            },
            resetForm() {
                this.$refs.ruleForm.resetFields();
            }
        },

    }
</script>
<style scoped>
    .valid-form {
        width: 50%;
        min-width: 500px;
        padding: 20px;
        margin: 0 auto;
        border-radius: 20px;
        background-color: #fff;

    }
</style>
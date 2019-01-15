<template>
    <div class="base-form">
        <el-form ref="form" :model="form" :rules="formRules" status-icon label-width="80px" label-position="left">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" clearable placeholder="请填写活动名称"></el-input>
            </el-form-item>

            <el-form-item label="区域" prop="region">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option v-for="item in regionList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="时间" prop="time">
                <el-date-picker v-model="form.time" type="datetime" placeholder="请选择日期时间"></el-date-picker>
            </el-form-item>

            <el-form-item label="手机" prop="mobilePhone">
                <el-input v-model="form.mobilePhone" clearable placeholder="请输入主办方联系电话"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" clearable placeholder="请输入主办方联系邮箱"></el-input>
            </el-form-item>

            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>

            <el-form-item label="类型" prop="type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食线上活动"></el-checkbox>
                    <el-checkbox label="地推活动"></el-checkbox>
                    <el-checkbox label="线下主题活动"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="描述" prop="desc">
                <textarea-limit v-model="form.desc" :maxlength="100" :rows="3"></textarea-limit>
            </el-form-item>
        </el-form>

        <div style="text-align:center;">
            <el-button type="primary" round @click="submit" :loading="submitLoading">提交</el-button>
            <el-button round @click="resetForm">重置</el-button>
        </div>
    </div>
</template>
<script>
    import TextareaLimit from "../../components/TextareaLimit/TextareaLimit.vue";
    export default {
        name:"BaseForm",
        components: {
            TextareaLimit
        },
        data() {
            return {
                form: {
                    name: "",
                    region: "",
                    time: "",
                    mobilePhone: "",
                    email: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                },
                formRules: {
                    name: [{
                        required: true,
                        message: "请填写名称",
                        trigger: "blur"
                    }],
                    region: [{
                        required: true,
                        message: "请选择区域",
                        trigger: "change"
                    }],
                    time: [{
                        required: true,
                        message: "请选择时间",
                        trigger: "change"
                    }],
                    mobilePhone: [{
                        required: true,
                        message: '请填写手机号',
                        trigger: 'blur'
                    }, {
                        pattern: /^1[345789]\d{9}$/,
                        message: "手机号码格式不正确",
                        trigger: "blur"
                    }],
                    email: [{
                        required: true,
                        message: '请填写邮箱',
                        trigger: 'blur'
                    }, {
                        type: "email",
                        message: "邮箱格式不正确",
                        trigger: "blur"
                    }],
                    type: [{
                        required: true,
                        message: "请选择类型",
                        trigger: "change"
                    }]
                },
                regionList: [{
                    label: "区域一",
                    value: "1",
                }, {
                    label: "区域二",
                    value: "2",
                }, {
                    label: "区域三",
                    value: "3",
                }],
                submitLoading: false,
            }
        },
        methods: {
            submit() {
                this.submitLoading = true;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$message.success("提交成功！");
                    } else {
                        this.$message.error("请填写带*星号的内容！");
                    }
                })
                this.submitLoading = false;
            },
            resetForm() {
                this.$refs.form.resetFields();
                this.form.desc = "";
            }
        }
    }
</script>
<style scoped>
    .base-form {
        width: 50%;
        min-width: 500px;
        padding: 20px;
        margin: 0 auto;
        border-radius: 10px;
        background-color: #fff;
    }
</style>
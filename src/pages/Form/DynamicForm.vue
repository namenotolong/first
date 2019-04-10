<template>
    <div class="dynamic-form">
        <el-form ref="form" :model="form" label-position="top">

            <transition-group name="block" tag="div">
                <div class="block-item" v-for="(item,index) in form.workItem" :key="item.id">
                    <div class="block-item__index" v-text="index + 1"></div>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="item.label1">
                                <el-date-picker type="daterange" v-model="item.value1" format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期"
                                    end-placeholder="结束日期" unlink-panels>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item :label="item.label2">
                                <el-input v-model="item.value2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item :label="item.label3">
                        <el-input v-model="item.value3"></el-input>
                    </el-form-item>

                    <el-form-item :label="item.label4">
                        <el-input v-model="item.value4"></el-input>
                    </el-form-item>

                    <div class="block-item--remove" @click="removeBlock(index)">
                        <span class="block-item--remove__inner"></span>
                    </div>
                </div>
            </transition-group>

        </el-form>
        <div class="block-item--add" @click="addBlock">点击新增履历</div>
        <div style="text-align:center;">
            <el-button type="success" round @click="submit" :loading="submitLoading">提交</el-button>
        </div>
    </div>
</template>
<script>
    import {
        guid
    } from "../../utils/util.js";
    export default {
        data() {
            return {
                formTemplate: {
                    label1: "起止时间",
                    value1: [],
                    label2: "所在单位",
                    value2: "",
                    label3: "主要工作",
                    value3: "",
                    label4: "职务职称",
                    value4: "",
                },
                form: {
                    workItem: []
                },
                submitLoading: false,
            }
        },
        created() {
            this.initFormItem(3);
        },
        methods: {
            initFormItem(amount) {
                for (let i = amount; i--;) {
                    this.addBlock();
                }
            },
            addBlock() {
                const template = Object.assign({}, this.formTemplate);
                template.id = guid();
                this.form.workItem.push(template);
            },
            removeBlock(index) {
                this.form.workItem.splice(index, 1)
            },
            submit() {
                this.$message.success("提交成功！");
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dynamic-form {
        box-sizing: border-box;
        width: 1000px;
        padding: 20px 100px;
        margin: 0 auto;
        border-radius: 10px;
        background-color: #fff;

        .block-item {
            position: relative;
            box-sizing: border-box;
            width: 800px;
            border-left: 1px solid #e6e6e6;
            border-right: 1px solid #e6e6e6;
            margin: 20px 0px;
            padding: 0px 10px;
            transition: all 1s;
        }

        .block-enter,
        .block-leave-to {
            opacity: 0;
            transform: translateY(30px);
        }

        .block-leave-active {
            position: absolute;
        }

        .block-item--remove {
            position: absolute;
            top: 50%;
            right: -61px;
            transform: translate(0, -11px);
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #d95d5d;
            cursor: pointer;

            .block-item--remove__inner {
                position: absolute;
                top: 10px;
                left: 5px;
                width: 12px;
                height: 3px;
                background-color: #fff;
            }
        }

        .block-item--add {
            margin: 0px -100px 20px -100px;
            height: 200px;
            line-height: 200px;
            text-align: center;
            background: url(../../assets/img/form/add-bg.png) no-repeat;
            background-size: cover;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }

        .block-item__index {
            position: absolute;
            left: -100px;
            top: 50%;
            transform: translate(0, -30px);
            width: 100px;
            height: 60px;
            font-size: 50px;
            font-weight: 500;
            background: linear-gradient(to bottom right, red, blue);
            color: transparent;
            -webkit-background-clip: text;
            text-align: center
        }
    }
</style>
<style>
    .dynamic-form .el-form-item__label {
        line-height: 20px;
    }
</style>
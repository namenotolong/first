<template>
    <div class="mine">
        <el-form :model="userInfo" ref="userInfo" label-width="60px" label-position="left">
            <el-form-item label="姓名：">
                <el-input v-model="userInfo.name"></el-input>
            </el-form-item>

            <el-form-item label="角色：">
                <el-input v-model="userInfo.roles" disabled></el-input>
            </el-form-item>

            <el-form-item label="头像：">
                <img :src="userInfo.avatar" alt="">
            </el-form-item>
            <el-form-item label="手机：">
                <el-input v-model="userInfo.mobilePhone"></el-input>
            </el-form-item>

            <el-form-item label="邮箱：">
                <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
        </el-form>
      
            <el-button type="primary" round :loading="submitLoading" @click="submit">提交更新</el-button>
       

    </div>
</template>
<script>
    import {
        getUserInfo
    } from "../../api/sysUser.js";
    export default {
        name: "Mine",
        data() {
            return {
                userInfo: {
                    name: "",
                    roles: "",
                    avatar: ""
                },
                roleList: ["总经理", "管理员", "编辑"],
                value5: [],
                submitLoading:false
            }
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                getUserInfo({
                    username: sessionStorage.getItem("ms_username")
                }).then(res => {
                    this.userInfo = Object.assign(res.userInfo, {
                        roles: res.userInfo.role
                    })
                })
            },
            submit(){
                this.submitLoading = true;
                this.$message.success("更新成功");
                 this.submitLoading = false;
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
        border-radius: 20px;

        .el-button {
            display: block;
            margin:0 auto
        }
    }
</style>
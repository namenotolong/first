<template>
    <el-table :data="tableData" border v-loading="tabLoading">
        <el-table-column prop="name" label="姓名" width="180px"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="180px"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobilePhone" label="手机"></el-table-column>
    </el-table>
</template>
<script>
    import {
        getTabList
    } from "../../../api/tab.js";
    export default {
        props: {
            name: {
                required: true,
                type: String,
            }

        },
        data() {
            return {
                tableData: [],
                tabLoading: false
            }
        },
        created() {
            this.getTabList();
        },
        methods: {
            getTabList() {
                this.tabLoading = true;
                getTabList({
                    name: this.name
                }).then(res => {
                    this.tableData = res.tabData.list
                    this.tabLoading = false;
                }).catch(error => {
                    this.tabLoading = false;
                })
            }
        }
    }
</script>
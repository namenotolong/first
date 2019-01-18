<template>
    <div>
        <el-table :data="userList" border highlight-current-row v-loading="userTableLoading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄" sortable></el-table-column>
            <el-table-column prop="gender" label="性别" :filters="genderList" :filter-method="filter" filter-placement="bottom"></el-table-column>
            <el-table-column prop="role" label="角色" :filters="roleList" :filter-method="filter" filter-placement="bottom"></el-table-column>
            <el-table-column prop="registerDate" label="注册时间" sortable></el-table-column>
            <el-table-column prop="consume" label="累计消费额(元)" sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="editUser(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" plain @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagination" :total="userAmount" :current-page="queryCondition.currentPageNum" :page-sizes="[20, 50, 100,1000]"
            :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper" background
            @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script>
    import {
        scroll
    } from "../../utils/util.js";
    import {
        getUserList,
        getUserDetail
    } from "../../api/user.js";
    export default {
        data() {
            return {
                userList: [],
                genderList: [{
                    text: "男",
                    value: "男"
                }, {
                    text: "女",
                    value: "女"
                }],
                roleList: [{
                    text: "管理员",
                    value: "管理员"
                }, {
                    text: "编辑",
                    value: "编辑"
                }, {
                    text: "普通会员",
                    value: "普通会员"
                }, {
                    text: "高级会员",
                    value: "高级会员"
                }, {
                    text: "普通用户",
                    value: "普通用户"
                }],
                userTableLoading: false,
                queryCondition: {
                    name: "",
                    currentPageNum: 1,
                    pageSize: 20
                },
                userAmount: 0,
                multipleSelection: []
            }
        },
        created() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                this.userTableLoading = true;
                getUserList(this.queryCondition).then(res => {
                    this.userList = res.data.userList.map((item, index) => {
                        return {
                            id: item.id,
                            index: (this.queryCondition.currentPageNum - 1) * this.queryCondition.pageSize +
                                index + 1,
                            name: item.name,
                            age: item.age,
                            gender: item.gender,
                            role: item.role,
                            registerDate: item.registerDate,
                            consume: item.consume
                        }
                    });
                    this.userAmount = res.data.userAmount;
                    this.userTableLoading = false;
                    const scrollElement = document.querySelector(".page");
                    scroll(scrollElement, 0, 300);
                })
            },
            filter(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            editUser() {

            },
            deleteUser(index, row) {
                this.$confirm(`确认删除用户“${row.name}”？`, "提示", {
                    type: 'warning',
                }).then(() => {
                    this.getUserList();
                    this.$message.success("删除成功！");
                }).catch(() => {

                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(pageSize) {
                this.queryCondition.pageSize = pageSize;
                this.getUserList();
            },
            handleCurrentChange(currentPageNum) {
                this.queryCondition.currentPageNum = currentPageNum;
                this.getUserList();
            },
        }
    }
</script>
<style lang="scss" scoped>
    .pagination {
        margin-top: 10px;
    }
</style>
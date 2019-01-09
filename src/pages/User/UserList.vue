<template>
    <div>
        <div class="handle">
            <div class="fr">
                <el-button class="handle-item" type="primary" round @click="editUser">创建用户</el-button>
                <el-button class="handle-item" type="primary" round @click="deleteUserBatch">批量删除</el-button>
                <export-excel file-name="用户列表" :data="userList">导出表格</export-excel>
            </div>
            <el-input class="handle-item" v-model="queryCondition.name" placeholder="请输入用户姓名" clearable style="width: 200px;"></el-input>
            <el-button class="handle-item" type="primary" round @click="getUserList">搜索用户</el-button>
        </div>

        <el-table :data="userList" border highlight-current-row v-loading="userTableLoading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="index" label="序号" width="80px"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120px"></el-table-column>
            <el-table-column prop="age" label="年龄" width="120px" sortable></el-table-column>
            <el-table-column prop="gender" label="性别" width="120px" :filters="genderList" :filter-method="filter"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="role" label="角色" width="120px" :filters="roleList" :filter-method="filter"
                filter-placement="bottom"></el-table-column>
            <el-table-column prop="registerDate" label="注册时间" width="120px" sortable></el-table-column>
            <el-table-column prop="purchaseAmount" label="累计购买商品数量" width="160px" sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="editUser(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" plain @click="deleteUser(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagination" :total="userAmount" :current-page="queryCondition.currentPageNum" :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="queryCondition.pageSize" layout="total, sizes, prev, pager, next, jumper" background
            @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>

        <user-detail></user-detail>

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
    import bus from "../../utils/bus.js";
    import UserDetail from "./components/UserDetail.vue";
    import ExportExcel from "../../components/ExportExcel/ExportExcel.vue";
    export default {
        name: "UserList",
        components: {
            UserDetail,
            ExportExcel
        },
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
                            purchaseAmount: item.purchaseAmount
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
            deleteUserBatch() {
                if (this.multipleSelection.length === 0) {
                    this.$message.warning("请勾选要删除的用户！");
                } else {
                    const names = this.multipleSelection.map(row => {
                        return row.name;
                    })
                    this.$confirm(`确认删除用户“${names.join("，")}”？`, "提示", {
                        type: 'warning',
                    }).then(() => {
                        this.getUserList();
                        this.$message.success("删除成功！");
                    }).catch(() => {

                    })
                }
            },
            editUser(index, row) {
                if (!row) {
                    row = {};
                }
                bus.$emit("userDetail", row.id)
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    .handle {
        .handle-item {
            margin-bottom: 10px;
        }
    }

    .pagination {
        margin-top: 10px;
    }
</style>
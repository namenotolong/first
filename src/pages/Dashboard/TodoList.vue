<template>
    <el-card class="task-card">
        <div slot="header">
            <span class="task-card__header">待办事项</span>
            <el-button type="text" class="button--add" @click="addTask">添加</el-button>
        </div>

        <el-table :data="taskData" height="400">
            <el-table-column width="50">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isCompleted"></el-checkbox>
                </template>
            </el-table-column>

            <el-table-column>
                <template slot-scope="scope">
                    <span v-text="scope.row.content" :class="{del:scope.row.isCompleted}"></span>
                </template>
            </el-table-column>

            <el-table-column width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click="editTask(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" plain @click="deleteTask(scope.$index)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>


    </el-card>
</template>
<script>
    import {
        getTodoListData
    } from "../../api/dashboard.js";
    export default {
        data() {
            return {
                taskData: []
            }
        },
        created() {
            this.getTaskData();
        },
        methods: {
            getTaskData() {
                getTodoListData().then(res => {
                    this.taskData = res.data;
                })
            },
            addTask() {
                this.$prompt("添加新的待办事项:", "", {
                    inputPlaceholder: "请输入待办事项",
                    inputValidator(value) {
                        if (!value) {
                            return "内容不能为空！"
                        }
                    },

                }).then(res => {
                    this.taskData.unshift({
                        isCompleted: false,
                        content: res.value
                    })
                })
            },
            editTask(index) {
                this.$prompt("修改待办事项", "", {
                    inputPlaceholder: "请输入待办事项",
                    inputValidator(value) {
                        if (!value) {
                            return "内容不能为空！"
                        }
                    },
                }).then(res => {
                    this.taskData[index].content = res.value;
                })
            },
            deleteTask(index) {
                this.taskData.splice(index, 1);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .task-card {
        .task-card__header {
            font-size: 16px;
        }

        .button--add {
            float: right;
            padding: 3px 0;
        }

        .del {
            text-decoration: line-through;
            color: rgba(0, 0, 0, .4);
        }
    }
</style>
<style lang="scss">
    .task-card {
        .el-card__body {
            padding-top: 0px;
        }

        .el-table__header-wrapper {
            display: none;
        }
    }
</style>
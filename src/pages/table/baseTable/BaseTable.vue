<template>
    <el-table :data="tableData" border highlight-current-row max-height="800">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" :filters="genderList" :filter-method="filter"></el-table-column>
        <el-table-column prop="address" label="地区"></el-table-column>
    </el-table>
</template>

<script>
    import Mock from "mockjs";
    export default {
        data() {
            return {
                tableData: [],
                genderList: [{
                    text: "男",
                    value: "男"
                }, {
                    text: "女",
                    value: "女"
                }],
            }
        },
        created() {
            this.simulateData();
        },
        methods: {
            simulateData() {
                const data = Mock.mock({
                    "tableData|20": [{
                        id: "@lower(@guid)",
                        date: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        name: "@cname",
                        age: "@natural(20,40)",
                        address: "@region",
                        gender: '@pick(["男", "女"])',
                    }],
                })
                this.tableData = data.tableData;
            },
            filter(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
        }
    }
</script>
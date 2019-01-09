<template>
    <div>
        <export-excel :before-export="beforeExport" :file-name="fileName" :data="tableData">导出excel</export-excel>
        <el-input style="width: 320px;" v-model="fileName" placeholder="请输入要导出的文件的名称，默认为“数据”。"></el-input>
        <el-table border highlight-current-row :data="tableData">
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="age" label="年龄"> </el-table-column>
            <el-table-column prop="gender" label="性别"> </el-table-column>
            <el-table-column prop="mobilePhone" label="手机号"> </el-table-column>
            <el-table-column prop="email" label=电子邮箱> </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import ExportExcel from "../../components/ExportExcel/ExportExcel.vue";
    export default {
        components: {
            ExportExcel
        },
        data() {
            return {
                fileName: "",
                tableData: [{
                    name: "张三",
                    age: 21,
                    gender: "男",
                    mobilePhone: "15999999991",
                    email: "1234@qq.com"
                }, {
                    name: "赵六",
                    age: 20,
                    gender: "男",
                    mobilePhone: "15999999992",
                    email: "1235@qq.com"
                }, {
                    name: "李四",
                    age: 30,
                    gender: "女",
                    mobilePhone: "15999999939",
                    email: "1236@qq.com"
                }, {
                    name: "王五",
                    age: 28,
                    gender: "男",
                    mobilePhone: "15999999996",
                    email: "1238@qq.com"
                }],
                //如有必要，需要将key转换成中文
                // tableHeader: ["姓名", "年龄", "性别", "手机号码", "电子邮箱" ]
            }
        },
        methods: {
            beforeExport(){
                
            }
        }
    }
</script>
<style scoped>
    .el-table {
        margin-top: 20px;
    }
</style>
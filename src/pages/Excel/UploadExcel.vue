<template>
    <div>
        <upload-excel :before-upload="beforeUpload" :on-success="onSuccess"></upload-excel>
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
            <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item" />
        </el-table>
    </div>
</template>
<script>
    import UploadExcel from "../../components/UploadExcel/UploadExcel.vue";
    export default {
        components: {
            UploadExcel
        },
        data() {
            return {
                tableData:[],
                tableHeader:[]
            }
        },
        methods: {
            beforeUpload() {

            },
            onSuccess(header,result) {
                this.tableHeader = header;
                this.tableData = result;

            }
        }
    }
</script>
<style scoped>


</style>
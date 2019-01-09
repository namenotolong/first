<template>
    <div>
        <input style="display:none" type="file" ref="fileInput" @change="selectFile">
        <el-button type="primary" round :loading="uploadLoading" @click="fileInputClick">点击浏览文件</el-button>

    </div>
</template>
<script>
    import XLSX from 'xlsx';
    export default {
        props: {
            beforeUpload: Function,
            onSuccess: Function
        },
        data() {
            return {
                uploadLoading: false,
            }
        },
        methods: {
            fileInputClick() {
                this.$refs.fileInput.click();
            },
            selectFile() {

            },
            renderData(e) {
                this.uploadLoading = true;
                const fileReader = new FileReader();
                fileReader.onload = ev => {
                    const data = ev.target.result;
                    // 以二进制流方式读取得到整份excel表格对象
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    // 只读取第一个sheet中的数据
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const header = this.getHeaderRow(worksheet);
                    const result = XLSX.utils.sheet_to_json(worksheet);
                    this.onSuccess(header, result);
                    this.uploadLoading = false;
                };
                // 以二进制方式打开文件
                const files = e.target.files;
                fileReader.readAsBinaryString(files[0]);
            },
            // 获取表头
            getHeaderRow(sheet) {
                const header = [];
                const range = XLSX.utils.decode_range(sheet['!ref']);
                const R = range.s.r;
                for (let C = range.s.c; C <= range.e.c; C++) {
                    const cell = sheet[XLSX.utils.encode_cell({
                        c: C,
                        r: R
                    })]
                    let hdr = "UNKNOWN" + (C + 1); //设置表头不存在时的默认值
                    if (cell && cell.t) {
                        hdr = XLSX.utils.format_cell(cell);
                    }
                    header.push(hdr);
                }
                return header;
            },
        }
    }
</script>
<style scoped>


</style>
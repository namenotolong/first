<template>
    <el-button type="primary" round :loading="exportLoading" @click="exportExcel">
        <slot></slot>
    </el-button>
</template>
<script>
    import XLSX from 'xlsx';
    export default {
        props: {
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            fileName: {
                type: String,
                default: ""
            },
            beforeExport:Function
        },
        data() {
            return {
                exportLoading: false,
            }
        },
        methods: {
            exportExcel() {
                const sheet = XLSX.utils.json_to_sheet(this.data);
                const ws_name = "Sheet1";
                let wb = {
                    SheetNames: [],
                    Sheets: {},
                    Props: {}
                };
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = sheet;

                const wbout = XLSX.write(wb, {
                    bookType: 'xlsx',
                    bookSST: false,
                    type: 'binary'
                });
                const blob = new Blob([this.s2ab(wbout)], {
                    type: "application/octet-stream"
                });
                this.saveAs(this.fileName, blob);
            },
            s2ab(s) {
                let buffer = new ArrayBuffer(s.length);
                let view = new Uint8Array(buffer);
                for (let i = 0; i != s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return buffer;
            },
            saveAs(fileName, obj) {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(obj);
                fileName = fileName || "数据";
                link.download = fileName + ".xlsx";
                link.click();
                window.URL.revokeObjectURL(obj);
            }
        }
    }
</script>
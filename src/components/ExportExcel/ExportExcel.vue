<template>
    <el-button type="primary" round :loading="exportLoading" @click="exportExcel">
        <slot></slot>
    </el-button>
</template>
<script>
    import XLSX from 'xlsx';
    export default {
        props: {
            fileName: {
                type: String,
                default: ""
            },
            header: Array,
            transmitData: {
                required: true,
                type: Function,
            },

            autoWidth: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                exportLoading: false,
            }
        },
        methods: {
            exportExcel() {
                this.exportLoading = true;
                let data = this.transmitData();
                if(header){
                    this.setHeader(data);
                }
                var filterVal = ["name", "age", "gender", "mobilePhone", "email"]

                function formatJson(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => {
                        if (j === 'timestamp') {
                            return parseTime(v[j])
                        } else {
                            return v[j]
                        }
                    }))
                }
                data = formatJson(filterVal, data);
                data = [...data];
                let header = ["姓名", "年龄", "性别", "手机号码", "电子邮箱"];
                data.unshift(header);

                const ws_name = "Sheet1";
                let wb = {
                    SheetNames: [],
                    Sheets: {},
                    Props: {}
                };
                // let sheet = XLSX.utils.json_to_sheet(data);
                let sheet = this.sheet_from_array_of_arrays(data);


                this.autoWidth(data, sheet);

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
                this.exportLoading = false;
            },
            setHeader(){

            },
            //字符串转字符流
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
                //延时释放
                setTimeout(function () {
                    window.URL.revokeObjectURL(obj);
                }, 100);
            },
            autoWidth(data, sheet) {
                /*设置worksheet每列的最大宽度*/
                const colWidth = data.map(row => row.map(val => {
                    /*先判断是否为null/undefined*/
                    if (val == null) {
                        return {
                            'wch': 10
                        };
                    }
                    /*再判断是否为中文*/
                    else if (val.toString().charCodeAt(0) > 255) {
                        return {
                            'wch': val.toString().length * 2
                        };
                    } else {
                        return {
                            'wch': val.toString().length
                        };
                    }
                }))
                /*以第一行为初始值*/
                let result = colWidth[0];
                for (let i = 1; i < colWidth.length; i++) {
                    for (let j = 0; j < colWidth[i].length; j++) {
                        if (result[j]['wch'] < colWidth[i][j]['wch']) {
                            result[j]['wch'] = colWidth[i][j]['wch'];
                        }
                    }
                }
                sheet['!cols'] = result;
            },
            sheet_from_array_of_arrays(data) {
                var ws = {};
                var range = {
                    s: {
                        c: 10000000,
                        r: 10000000
                    },
                    e: {
                        c: 0,
                        r: 0
                    }
                };
                for (var R = 0; R != data.length; ++R) {
                    for (var C = 0; C != data[R].length; ++C) {
                        if (range.s.r > R) range.s.r = R;
                        if (range.s.c > C) range.s.c = C;
                        if (range.e.r < R) range.e.r = R;
                        if (range.e.c < C) range.e.c = C;
                        var cell = {
                            v: data[R][C]
                        };
                        if (cell.v == null) continue;
                        var cell_ref = XLSX.utils.encode_cell({
                            c: C,
                            r: R
                        });

                        if (typeof cell.v === 'number') cell.t = 'n';
                        else if (typeof cell.v === 'boolean') cell.t = 'b';
                        else if (cell.v instanceof Date) {
                            cell.t = 'n';
                            cell.z = XLSX.SSF._table[14];
                            cell.v = datenum(cell.v);
                        } else cell.t = 's';

                        ws[cell_ref] = cell;
                    }
                }
                if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
            }

        }
    }
</script>
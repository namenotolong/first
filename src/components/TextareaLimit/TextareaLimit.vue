<template>
    <div class="textarea-limit">
        <el-input type="textarea" :rows="rows" v-model="content" :maxlength="textLimit" @input.native="textareaLengthLimit"></el-input>
        <span class="textarea-length" :class="{'warning-text':content.length >= textLimit}" v-text="content.length + '/' + textLimit"></span>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String,
                default: ""
            },
            maxlength: {
                type: Number,
                required: true,
            },
            rows: {
                type: Number,
                default: 2
            }
        },
        data() {
            return {
                content: this.value,
                textLimit: this.maxlength
            }
        },
        watch: {
            value(val) {
                this.content = val;
            }
        },
        methods: {
            textareaLengthLimit() {
                this.$emit("input", this.content);
                if (this.content.length >= this.textLimit) {
                    this.$message({
                        type: "warning",
                        message: "已达到最大字数限制",
                    });
                }
            },
        }
    }
</script>
<style scoped>
    .textarea-limit {
        position: relative;
    }

    .textarea-length {
        position: absolute;
        right: 10px;
        bottom: 0px;
        font-size: 10px;
        color: #4a4a4a;
    }

    .warning-text {
        color: #e6a23c;
    }
</style>
<style>
    .textarea-limit .el-textarea__inner {
        padding-bottom: 25px;
    }
</style>
<template>
    <div>
        <!-- <el-input type="textarea" id="editor" v-loading="editorLoading"></el-input> -->
        <textarea id="editor"></textarea>
    </div>



</template>
<script>
    export default {
        data() {
            return {
                editorLoading: false
            }
        },
        mounted() {
            this.initTinymce();
        },
        beforeDestroy() {
            console.log("333");
            
            // if (tinymce.get("editor").getContent()) {
            //     this.$confirm("确认关闭该页面？","提示").then(() => {

            //     }).catch(() => {

            //     })
            // }
        },
        destroyed() {
            this.destoryTinymce();
        },
        activated() {
            this.initTinymce();
        },
        deactivated() {
            this.destoryTinymce();
        },
        methods: {
            initTinymce() {
                tinymce.init({
                    selector: `#editor`,
                    language: "zh_CN",
                    height: 400,
                    auto_focus: "editor",
                    plugins: "advlist autosave autolink charmap code colorpicker contextmenu emoticons fullscreen help hr image insertdatetime link lists media pagebreak paste preview print searchreplace table textcolor textpattern visualblocks visualchars wordcount",
                    toolbar: "restoredraft | undo redo | styleselect | bold italic underline forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link image media emoticons | searchreplace fullscreen preview code print",
                    contextmenu: "copy paste | link image inserttable",
                    setup: editor => {
                        this.editorLoading = true;
                    },
                    // init_instance_callback钩子如果不使用箭头函数，内部的this指向的是当前editor实例。
                    init_instance_callback: editor => {
                        this.editorLoading = false;
                        // 用户输入的时候触发，插入内容的时候触发(比如插入了表格，使用ctrl+v粘贴了内容)，节点改变的时候触发(比如上传了图片)
                        editor.on('setContent keyup nodeChange', () => {
                            this.$emit('input', editor.getContent())
                        })
                    }
                })
            },
            destoryTinymce() {
                // 关闭当前页面时，deactivated钩子会在destroyed之前执行，此时editor实例已经被销毁了。如果不判断在destroyed钩子中就会报错。
                if (tinymce.get("editor")) {
                    tinymce.get("editor").destroy();
                }
            }

        }
    }
</script>
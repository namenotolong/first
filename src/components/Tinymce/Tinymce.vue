<template>
    <div>
        <el-input type="textarea" :id="editorId" v-loading="editorLoading"></el-input>
        <!-- <textarea id="editor"></textarea> -->
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                editorId: 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
                editorLoading: false
            }
        },
        watch: {
            value(newVal) {
                tinymce.get(this.editorId).setContent(newVal);
            }
        },
        mounted() {
            this.editorLoading = true;
            this.initTinymce();
        },
        destroyed() {
            this.destoryTinymce();
        },
        //tiny无法被keep-alive缓存，在缓存的页面间切换时必须先销毁编辑器实例再重新初始化。编辑器的内容通过双向绑定被保存在父组件中，初始化后父组件又会把之前的内容通过过value传过来。
        // 创建文章页面可以使用组件的name进行缓存，而编辑文章页面不能使用。同时打开多个编辑页面如articleEdit/1,articleEdit/2，它们的组件name都是一样的，所以不能被缓存。在编辑页面使用localStorage来存储。
        activated() {
            this.editorLoading = true;
            this.initTinymce();
        },
        deactivated() {
            this.destoryTinymce();
        },
        methods: {
            initTinymce() {
                tinymce.init({
                    selector: `#${this.editorId}`,
                    language: "zh_CN",
                    height: 400,
                    plugins: "advlist autosave autolink charmap code colorpicker contextmenu emoticons fullscreen help hr image insertdatetime link lists media pagebreak paste preview print searchreplace table textcolor textpattern visualblocks visualchars wordcount",
                    toolbar: "restoredraft | undo redo | styleselect | bold italic underline forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link image media emoticons | searchreplace fullscreen preview code print",
                    contextmenu: "copy paste | link image inserttable",
                    setup: editor => {

                    },
                    // init_instance_callback钩子如果不使用箭头函数，内部的this指向的是当前editor实例。
                    init_instance_callback: editor => {
                        editor.setContent(this.value);
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
                if (tinymce.get(this.editorId)) {
                    tinymce.get(this.editorId).destroy();
                }
            }
        }
    }
</script>
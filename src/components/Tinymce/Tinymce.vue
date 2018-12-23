<template>
    <form>
        <textarea id="editor"></textarea>
    </form>

</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.initTinymce();
        },
        methods: {
            initTinymce() {
                tinymce.init({
                    selector: "#editor",
                    language: "zh_CN",
                    height:400,
                    plugins: "advlist autosave autolink charmap colorpicker emoticons fullscreen help hr image insertdatetime link lists media pagebreak paste preview print searchreplace table textcolor visualblocks visualchars wordcount",
                    toolbar:"restoredraft | undo redo | styleselect | bold italic underline forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table link image media emoticons | searchreplace fullscreen preview print"
                })
            }
        }
    }
</script>
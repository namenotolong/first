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
                    language:"zh_CN",
                    plugins:"fullscreen autosave"
                })
            }
        }
    }
</script>
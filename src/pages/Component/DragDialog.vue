<template>
    <div>
        <el-button type="primary" round @click="">点击打开Dialog</el-button>
        <dragDialog></dragDialog>

    </div>
</template>
<script>
    import DragDialog from "../../components/DragDialog/DragDialog.vue";
    export default {
        components: {
            DragDialog
        },
        data() {
            return {

            }
        },

    }
</script>
<template>
    <div>
        <grid-group></grid-group>


        <el-button type="success">成功</el-button>
        <el-button type="primary">成功</el-button>
    </div>
</template>
<script>
    import GridGroup from "./GridGroup.vue"
    export default {
        name: "dashboard",
        components: {
            GridGroup
        },
        data() {
            return {

            }
        },

        created() {

        },
        methods: {

        },

    }
</script>
<style scoped>

</style>
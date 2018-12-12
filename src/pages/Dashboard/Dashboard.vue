<template>
    <div>
        <grid-group></grid-group>
        <line-chart></line-chart>
        <el-row :gutter="20">
            <el-col :span="8">
                <todo-list></todo-list>
            </el-col>
            <el-col :span="8">
                <progress-bar></progress-bar>
            </el-col>
            <el-col :span="8">
                <new-goods></new-goods>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import GridGroup from "./GridGroup.vue";
    import LineChart from "./LineChart.vue";
    import TodoList from "./TodoList.vue";
    import ProgressBar from "./ProgressBar.vue";
    import NewGoods from "./NewGoods.vue";
    export default {
        name: "dashboard",
        components: {
            GridGroup,
            LineChart,
            TodoList,
            ProgressBar,
            NewGoods
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
    .el-row{
        margin-top: 20px;
    }
</style>
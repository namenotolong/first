<template>
    <div>
        <grid-group></grid-group>
        <line-chart></line-chart>
    </div>
</template>
<script>
    import GridGroup from "./GridGroup.vue";
    import LineChart from "./LineChart.vue";
    export default {
        name: "dashboard",
        components: {
            GridGroup,
            LineChart
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
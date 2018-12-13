<template>
    <div id="pieChart"></div>

</template>
<script>
    export default {
        data() {
            return {
                chartData:{

                }
            }
        },
        created() {

        },
        methods: {
            createChart() {
                let chart = new G2.Chart({
                    container: "pieChart",
                    forceFie: true,
                    height: 300,
                    background: {
                        fill: "#fff"
                    }
                });
                chart.source(this.chartData);
                chart.interval
                chart.render();
            }
        }
    }
</script>
<style scoped>
    #pieChart {
        width: 100%;
    }
</style>
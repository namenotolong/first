<template>
    <div :id="chartId"></div>
</template>

<script>
    import G2 from "@antv/g2";
    export default {
        props: {
            height: {
                type: Number,
                default: 360
            }
        },
        data() {
            return {
                chartId: "chart" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
                chartData: [{
                    year: "类型1",
                    value: 45
                }, {
                    year: "类型2",
                    value: 52
                }, {
                    year: "类型3",
                    value: 89
                }, {
                    year: "类型4",
                    value: 145
                }, {
                    year: "类型5",
                    value: 29
                }, {
                    year: "类型6",
                    value: 102
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData);
        },
        methods: {
            createChart(container, data) {
                let chart = new G2.Chart({
                    container: container,
                    forceFit: true,
                    height: this.height,
                    padding: [50, 50, 50, 50],
                    background: {
                        fill: "#fff"
                    }
                })
                chart.source(data);
                chart.scale('value', {
                    min: 0,
                    alias: "数量"
                });
                chart.interval().position('year*value').color("value").label("value");
                chart.render();
            },
        }
    }
</script>
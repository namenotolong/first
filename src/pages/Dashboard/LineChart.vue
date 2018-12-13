<template>
    <div>
        <p class="chart-title">周{{chartName}}趋势图</p>
        <div id="lineChart"></div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                chart: null,
                chartName: "访问量",
                visiteData: [{
                    day: 6,
                    value: 54
                }, {
                    day: 5,
                    value: 48
                }, {
                    day: 4,
                    value: 33
                }, {
                    day: 3,
                    value: 67
                }, {
                    day: 2,
                    value: 59
                }, {
                    day: 1,
                    value: 97
                }, {
                    day: 0,
                    value: 75
                }],
                userData: [{
                    day: 6,
                    value: 54
                }, {
                    day: 5,
                    value: 58
                }, {
                    day: 4,
                    value: 33
                }, {
                    day: 3,
                    value: 93
                }, {
                    day: 2,
                    value: 59
                }, {
                    day: 1,
                    value: 37
                }, {
                    day: 0,
                    value: 64
                }],
                goodsData: [{
                    day: 6,
                    value: 22
                }, {
                    day: 5,
                    value: 12
                }, {
                    day: 4,
                    value: 32
                }, {
                    day: 3,
                    value: 15
                }, {
                    day: 2,
                    value: 43
                }, {
                    day: 1,
                    value: 26
                }, {
                    day: 0,
                    value: 18
                }],
                commentData: [{
                    day: 6,
                    value: 11
                }, {
                    day: 5,
                    value: 15
                }, {
                    day: 4,
                    value: 21
                }, {
                    day: 3,
                    value: 43
                }, {
                    day: 2,
                    value: 38
                }, {
                    day: 1,
                    value: 27
                }, {
                    day: 0,
                    value: 31
                }],

            }
        },
        created() {
            this.$_bus.$on("changeData", name => {
                const DATA_MAP = {
                    "访问量": this.visiteData,
                    "用户数量": this.userData,
                    "商品数量": this.goodsData,
                    "评论数量": this.commentData
                }
                this.chartName = name;
                this.chart.changeData(DATA_MAP[name])

            })
        },
        mounted() {
            this.createChart();
        },
        methods: {
            createChart() {
                this.chart = new G2.Chart({
                    container: "lineChart",
                    forceFit: true,
                    height: 300,
                    padding: [30, 40, 40, 50],
                    background: {
                        fill: "#fff"
                    }
                });
                this.chart.source(this.visiteData);
                this.chart.scale({
                    day: {
                        range: [0, 1],
                        formatter: val => {
                            console.log(val);
                            
                            let currentDate = Date.now();
                            const ONE_DAY = 24 * 60 * 60 * 1000;
                            return this.$_util.formatDate(new Date((currentDate - ONE_DAY*val)), 'yyyy/MM/dd')
                        }
                    },
                    value: {
                        alias: "数量",
                        min: 0
                    }
                })

                this.chart.line().position("day*value").shape('smooth');
                this.chart.point().position('day*value').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });
                this.chart.render();
            }
        }
    };
</script>
<style scoped>
    #line_chart {
        width: 100%;
    }

    .chart-title {
        text-align: center;
        margin-bottom: 10px;
    }
</style>
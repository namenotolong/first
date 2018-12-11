<template>
    <div>
        <p class="chart-title">{{chartName}}周增长趋势图</p>
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
                    week: "星期一",
                    value: 54
                }, {
                    week: "星期二",
                    value: 48
                }, {
                    week: "星期三",
                    value: 33
                }, {
                    week: "星期四",
                    value: 67
                }, {
                    week: "星期五",
                    value: 59
                }, {
                    week: "星期六",
                    value: 97
                }, {
                    week: "星期天",
                    value: 75
                }],
                userData: [{
                    week: "星期一",
                    value: 54
                }, {
                    week: "星期二",
                    value: 58
                }, {
                    week: "星期三",
                    value: 33
                }, {
                    week: "星期四",
                    value: 93
                }, {
                    week: "星期五",
                    value: 59
                }, {
                    week: "星期六",
                    value: 37
                }, {
                    week: "星期天",
                    value: 64
                }],
                goodsData: [{
                    week: "星期一",
                    value: 22
                }, {
                    week: "星期二",
                    value: 12
                }, {
                    week: "星期三",
                    value: 32
                }, {
                    week: "星期四",
                    value: 15
                }, {
                    week: "星期五",
                    value: 43
                }, {
                    week: "星期六",
                    value: 26
                }, {
                    week: "星期天",
                    value: 18
                }],
                commentData: [{
                    week: "星期一",
                    value: 11
                }, {
                    week: "星期二",
                    value: 15
                }, {
                    week: "星期三",
                    value: 21
                }, {
                    week: "星期四",
                    value: 43
                }, {
                    week: "星期五",
                    value: 38
                }, {
                    week: "星期六",
                    value: 27
                }, {
                    week: "星期天",
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
                    padding: [30, 30, 40, 50],
                    background: {
                        fill: "#fff"
                    }
                });
                this.chart.source(this.visiteData);
                this.chart.scale({
                    week: {
                        range: [0, 1]
                    },
                    value: {
                        alias: "数量",
                        min: 0
                    }
                })

                this.chart.line().position("week*value").shape('smooth');
                this.chart.point().position('week*value').size(4).shape('circle').style({
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
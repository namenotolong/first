<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <p class="chart-title">周{{chartName}}增长趋势图</p>
            <div id="weekLineChart"></div>
        </el-col>

        <el-col :span="12">
            <p class="chart-title">月{{chartName}}增长趋势图</p>
            <div id="monthLineChart"></div>
        </el-col>

    </el-row>

</template>

<script>
    export default {
        data() {
            return {
                weekChart: null,
                chartName: "访问量",
                weekData: {
                    visiteData: [{
                        value: 54
                    }, {
                        value: 48
                    }, {
                        value: 33
                    }, {
                        value: 67
                    }, {
                        value: 59
                    }, {
                        day: 1,
                        value: 97
                    }, {
                        value: 75
                    }],
                    userData: [{
                        value: 54
                    }, {
                        value: 58
                    }, {
                        value: 33
                    }, {
                        value: 93
                    }, {
                        value: 59
                    }, {
                        value: 37
                    }, {
                        value: 64
                    }],
                    goodsData: [{
                        value: 22
                    }, {
                        value: 12
                    }, {
                        value: 32
                    }, {
                        value: 15
                    }, {
                        value: 43
                    }, {
                        value: 26
                    }, {
                        value: 18
                    }],
                    commentData: [{
                        value: 11
                    }, {
                        value: 15
                    }, {
                        value: 21
                    }, {
                        value: 43
                    }, {
                        value: 38
                    }, {
                        value: 27
                    }, {
                        value: 31
                    }]
                },
                monthData: {
                    visiteData: [{
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }],
                     userData: [{
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }],
                     goodsData: [{
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 32
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 43
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }],
                     commentData: [{
                        value: 12
                    }, {
                        value: 21
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 12
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }, {
                        value: 21
                    }]
                }
            };
        },
        created() {
            this.setDate();
            this.$_bus.$on("changeData", name => {
                const DATA_MAP = {
                    "访问量": "visiteData",
                    "用户数量": "userData",
                    "商品数量": "goodsData",
                    "评论数量": "commentData"
                };
                this.chartName = name;
                this.weekChart.changeData(this.weekData[DATA_MAP[name]]);
                this.monthChart.changeData(this.monthData[DATA_MAP[name]]);
            });
            this.$_bus.$on("collapse", () => {
                this.weekChart.render();
            })
        },
        mounted() {
            this.createChart("weekLineChart", this.weekData.visiteData, "weekChart");
            this.createChart("monthLineChart", this.monthData.visiteData, "monthChart");
        },
        methods: {
            // 设置日期
            setDate() {
                const currentDate = Date.now();
                const ONE_DAY = 24 * 60 * 60 * 1000;
                Object.values(this.weekData).forEach(item => {
                    item.forEach((item1, index) => {
                        const date = new Date(currentDate - (6 - index) * ONE_DAY);
                        item1.date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
                    })
                })
                Object.values(this.monthData).forEach(item => {
                    item.forEach((item1, index) => {
                        // 设置31天的数据，以满足每格显示5天。
                        const date = new Date(currentDate - (30 - index) * ONE_DAY);
                        item1.date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
                    })
                })
            },
            createChart(container, data, chartName) {
                let chart = new G2.Chart({
                    container: container,
                    forceFit: true,
                    height: 300,
                    padding: [30, 60, 50, 50],
                    background: {
                        fill: "#fff"
                    }
                });
                chart.source(data);
                chart.scale({
                    value: {
                        alias: "数量",
                        min: 0
                    }
                });
                chart
                    .line()
                    .position("date*value")
                    .shape("smooth");
                chart
                    .point()
                    .position("date*value")
                    .size(4)
                    .shape("circle")
                    .style({
                        stroke: "#fff",
                        lineWidth: 1
                    });
                chart.render();
                this[chartName] = chart;
            }
        }
    };
</script>
<style scoped>
    .chart-title {
        text-align: center;
        margin-bottom: 10px;
    }
</style>
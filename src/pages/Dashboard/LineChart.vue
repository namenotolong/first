<template>
    <el-row :gutter="30">
        <el-col :lg="12" :sm="24">
            <p class="chart-title">周{{chartName}}增长趋势图</p>
            <div id="weekLineChart"></div>
        </el-col>

        <el-col :lg="12" :sm="24">
            <p class="chart-title">月{{chartName}}增长趋势图</p>
            <div id="monthLineChart"></div>
        </el-col>
    </el-row>

</template>

<script>
    import bus from "../../utils/bus.js"
    import G2 from "@antv/g2";
    import {
        getLineChartData
    } from "../../api/dashboard.js"
    export default {
        data() {
            return {
                weekChart: null,
                monthChart: null,
                chartName: "访问量",
                weekData: null,
                monthData: null
            };
        },
        created() {
            this.getLineChartData();
            // 变更图表数据
            bus.$on("changeData", name => {
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
            // 折叠或展开菜单栏的时候，图表宽度不会跟着变，需要重建。
            // 这里监听menu的transitionend事件无效，用定时器解决。
            bus.$on("collapse", () => {
                setTimeout(() => {
                    this.weekChart.destroy();
                    this.monthChart.destroy();
                    this.createChart("weekLineChart", this.weekData.visiteData, "weekChart");
                    this.createChart("monthLineChart", this.monthData.visiteData, "monthChart");
                }, 350)
            })
        },
        mounted() {

        },
        methods: {
            // 获取图表数据
            getLineChartData() {
                let getWeekData = () => {
                    return getLineChartData({
                        type: "week"
                    })
                }
                let getMonthData = () => {
                    return getLineChartData({
                        type: "month"
                    })
                }
                this.$axios.all([getWeekData(), getMonthData()])
                    .then(this.$axios.spread((weekData, monthData) => {
                        this.weekData = weekData.data;
                        this.monthData = monthData.data;
                        this.setDate();
                        this.createChart("weekLineChart", this.weekData.visiteData, "weekChart");
                        this.createChart("monthLineChart", this.monthData.visiteData, "monthChart");
                    }))
            },
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
            // 创建图表
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
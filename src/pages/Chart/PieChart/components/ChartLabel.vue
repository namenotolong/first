<template>
    <div :id="chartId"></div>
</template>

<script>
    import G2 from "@antv/g2";
    import {
        DataSet
    } from '@antv/data-set';
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
                    type: '硕士',
                    value: 0.4
                }, {
                    type: '本科',
                    value: 0.21
                }, {
                    type: '博士',
                    value: 0.17
                }, {
                    type: '初中',
                    value: 0.009
                }, {
                    type: '专科',
                    value: 0.013
                }, {
                    type: '未知',
                    value: 0.08
                }],
            }
        },
        mounted() {
            this.createChart(this.chartId, this.chartData);
        },
        methods: {
            createChart(container, data) {
                let ds = new DataSet();
                let dv = ds.createView().source(data);
                dv.transform({
                    type: 'percent',
                    field: 'value',
                    dimension: 'type',
                    as: 'percent'
                });
                let chart = new G2.Chart({
                    container: container,
                    forceFit: true,
                    height: this.height,
                    padding: [50, 0],
                    background: {
                        fill: "#fff"
                    }
                })
                chart.source(dv);
                chart.tooltip({
                    showTitle:false
                })
                chart.coord('theta');
                chart.intervalStack().position('value').color('type', ['#2593fc', '#38c060', '#27c1c1', '#705dc8',
                    '#3b4771', '#f9cb34'
                ]).label('value', val => {
                    let offset = val > 0.02 ? -30 : 30;
                    let label_class = val > 0.02 ? "g2-label-item-inner" : "g2-label-item-outer";
                    return {
                        offset: offset,
                        useHtml: true,
                        htmlTemplate(text, item) {
                            let d = item.point;
                            let percent = String(parseInt(d.percent * 100)) + "%";
                            return '<div class=' + label_class + '>' + d.type + percent + '</div>';
                        }
                    };
                });
                chart.render();
            },
        }
    }
</script>
<style scope>
    .g2-label-item-inner {
        text-align: center;
        font-size: 12px;
        color: #fff!important;
    }

    .g2-label-item-outer {
        width: 60px;
        font-size: 12px;
        color: #595959!important;
    }
</style>
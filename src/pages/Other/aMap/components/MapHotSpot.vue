<template>
    <div id="hotSpot"></div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            if (window.AMap) {
                this.initMap();
            } else {
                window.initAMap = () => {
                    this.initMap();
                }
                const url =
                    "https://webapi.amap.com/maps?v=1.4.14&key=76a35d38522a828c1f825b535a5ae4bf&callback=initAMap";
                const scriptElem = document.createElement("script");
                scriptElem.src = url;
                document.head.appendChild(scriptElem);
            }
        },
        methods: {
            initMap() {
                var map = new AMap.Map('hotSpot', {
                    center: [116.397428, 39.90923],
                    zoom: 13,
                    isHotspot: true
                });

                //异步同时加载多个插件
                AMap.plugin(["AMap.PlaceSearch", "AMap.AdvancedInfoWindow"], () => {
                    var placeSearch = new AMap.PlaceSearch(); //构造地点查询类
                    var infoWindow = new AMap.AdvancedInfoWindow({});
                    map.on('hotspotover', function (result) {
                        placeSearch.getDetails(result.id, function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                placeSearch_CallBack(result);
                            }
                        });
                    });

                    //回调函数
                    function placeSearch_CallBack(data) { //infoWindow.open(map, result.lnglat);
                        var poiArr = data.poiList.pois;
                        var location = poiArr[0].location;
                        infoWindow.setContent(createContent(poiArr[0]));
                        infoWindow.open(map, location);
                    }

                    function createContent(poi) { //信息窗体内容
                        var s = [];
                        s.push('<div class="info-title">' + poi.name + '</div><div class="info-content">' +
                            "地址：" + poi
                            .address);
                        s.push("电话：" + poi.tel);
                        s.push("类型：" + poi.type);
                        s.push('<div>');
                        return s.join("<br>");
                    }
                });
            }
        },
    }
</script>
<style lang="scss">
    #hotSpot {
        height: 400px;

        .map {
            height: 100%;
            width: 100%;
            float: left;
        }

        .info-title {
            font-weight: bolder;
            color: #fff;
            font-size: 14px;
            line-height: 26px;
            padding: 0 0 0 6px;
            background: #25A5F7
        }

        .info-content {
            padding: 4px;
            color: #666666;
            line-height: 23px;
            font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
        }

        .info-content img {
            float: left;
            margin: 3px;
        }

        .amap-info-combo .keyword-input {
            height: auto;
        }

    }
</style>
<template>
    <div id="maker"></div>
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
                const map = new AMap.Map("maker", {
                    resizeEnable: true, //设置地图大小是否随屏幕大小而变化，默认为true，
                    zoom: 11, //设置地图的初始缩放级别。
                    center: [116.397428, 39.90923] //设置地图的初始中心点。
                });

                const marker = new AMap.Marker({
                    position: map.getCenter(),
                    icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                    offset: new AMap.Pixel(-13, -30)  //设置标记图标的偏移量
                });

                marker.setMap(map);

                // 设置鼠标划过点标记显示的文字提示
                marker.setTitle("故宫");

                // 设置label标签, label默认左上角显示，className为：amap-marker-label
                marker.setLabel({
                    offset: new AMap.Pixel(10, -10), //设置文本标注偏移量
                    content: "<div class='info'>故宫在这里</div>", //设置文本标注内容
                    direction: 'right' //设置文本标注方位
                });
            }
        },
    }
</script>
<style lang="scss">
    #maker {
        height: 400px;

        .amap-icon img {
            width: 25px;
            height: 34px;
        }

        .amap-marker-label {
            border-color: #409eff;
            border-radius: 4px;
            padding: 6px 10px;
        }


    }
</style>
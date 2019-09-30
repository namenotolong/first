<template>
    <div id="plugin"></div>
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
                const map = new AMap.Map("plugin", {
                    zoom: 11,
                    center: [116.397428, 39.90923]
                });

                AMap.plugin(["AMap.ToolBar", "AMap.Scale", "AMap.OverView"], function () {
                    var toolbar = new AMap.ToolBar();
                    var scale = new AMap.Scale();
                    var overView = new AMap.OverView();
                    map.addControl(toolbar);
                    map.addControl(scale);
                    map.addControl(overView);
                    overView.open();
                });

            }
        },
    }
</script>
<style lang="scss">
    #plugin {
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
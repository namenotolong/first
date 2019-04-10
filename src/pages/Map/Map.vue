<template>
    <div class="map">
        <section>
            <p>标记点</p>
            <map-maker></map-maker>
        </section>

        <section>
            <p>插件</p>
            <map-plugin></map-plugin>
        </section>

        <section>
            <p>地图热点</p>
            <map-hot-spot></map-hot-spot>
        </section>
    </div>
</template>
<script>
    import MapMaker from "./components/MapMaker.vue";
    import MapPlugin from "./components/MapPlugin.vue";
    import MapHotSpot from "./components/MapHotSpot.vue";
    export default {
        components: {
            MapMaker,
            MapPlugin,
            MapHotSpot
        },
        data() {
            return {

            }
        },


    }
</script>
<style lang="scss" scoped>
    .map {
        section {
            &+section{
                margin-top:20px;
            }
            p {
                font-size: 18px;
                line-height: 40px;
            }
        }

    }
</style>
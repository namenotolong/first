<template>
  <div class="map">
    <el-tabs type="border-card">
      <el-tab-pane label="标记点">
        <map-maker></map-maker>
      </el-tab-pane>
      <el-tab-pane label="插件">
        <map-plugin></map-plugin>
      </el-tab-pane>
      <el-tab-pane label="地图热点">
        <map-hot-spot></map-hot-spot>
      </el-tab-pane>
    </el-tabs>
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
    }
  }
</script>

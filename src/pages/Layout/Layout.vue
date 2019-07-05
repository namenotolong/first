<template>
  <div>
    <v-header></v-header>
    <v-menu></v-menu>
    <div class="container" :class="{collapse:isCollapse}">
      <v-tags></v-tags>
      <div class="page">
        <transition name="page" mode="out-in">
          <keep-alive :include="cachePages">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>

</template>
<script>
  import bus from "~/utils/bus.js";
  import VHeader from "./components/Header.vue";
  import VMenu from "./components/Menu.vue";
  import VTags from "./components/Tags.vue";
  export default {
    components: {
      VHeader,
      VMenu,
      VTags
    },
    data() {
      return {
        isCollapse: false,
        cachePages: []
      }
    },
    created() {
      bus.$on("collapse", msg => {
        this.isCollapse = msg;
      })
      bus.$on("cachePage", msg => {
        this.cachePages = msg;
      })
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    box-sizing: border-box;
    position: absolute;
    top: 62px;
    bottom: 0px;
    left: 220px;
    right: 0px;
    /* 查看element的menu.css源码可知transition的参数 */
    transition: left .3s ease-in-out;
    background-color: #f0f2f5;

    &.collapse {
      left: 65px;
    }

    .page {
      position: relative;
      box-sizing: border-box;
      height: calc(100% - 42px);
      padding: 20px;
      overflow-y: auto;

      &-enter,
      &-leave {
        opacity: 0;
      }

      &-enter-active,
      &-leave-active {
        transition: opacity .5s ease;
      }

      /deep/ p {
        color: #5e6d82;
      }
    }

  }
</style>

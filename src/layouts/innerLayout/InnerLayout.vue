<template>
  <div class="inner-layout">
    <side-bar></side-bar>

    <div class="inner-layout__main">
      <header-bar></header-bar>
      <nav-tag></nav-tag>
      <div class="inner-layout__page">
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
  import bus from '@/utils/bus';
  import { HeaderBar, SideBar, NavTag } from './components';

  export default {
    components: {
      HeaderBar,
      SideBar,
      NavTag
    },
    data() {
      return {
        cachePages: []
      }
    },
    created() {
      bus.$on('cachePage', msg => {
        this.cachePages = msg;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .inner-layout {
    display: flex;
    height: 100vh;
    overflow-y: hidden;

    .inner-layout__main {
      width: 100%;
      overflow-x: hidden;
      background-color: #f0f2f5;

      .inner-layout__page {
        position: relative;
        box-sizing: border-box;
        height: calc(100% - 102px);
        overflow-x: hidden;
        overflow-y: auto;
        padding: 1em;

        &-enter,
        &-leave {
          opacity: 0;
        }

        &-enter-active,
        &-leave-active {
          transition: opacity .5s ease;
        }
      }
    }
  }
</style>

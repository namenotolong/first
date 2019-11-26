<template>
  <div class="inner-layout">
    <!-- 侧边菜单 -->
    <side-bar />

    <div class="inner-layout__main">
      <!-- 顶部工具栏 -->
      <header-bar />
      <!--导航标签 -->
      <nav-tag v-show="tagVisible" />

      <div class="inner-layout__page" :class="{'with-navtag':tagVisible}">
        <!-- 路由页面 -->
        <transition name="page" mode="out-in">
          <keep-alive :include="cachePages">
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>

    <!-- 系统界面设置 -->
    <setting />

  </div>
</template>

<script>
  import { HeaderBar, SideBar, NavTag, Setting } from './components';
  import { mapGetters } from 'vuex';

  export default {
    components: { HeaderBar, SideBar, NavTag, Setting },
    computed: {
      ...mapGetters(['tagVisible', 'cachePages', ])
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
        height: calc(100vh - 60px);
        overflow-x: hidden;
        overflow-y: auto;
        padding: 1em;

        &.with-navtag {
          height: calc(100vh - 100px);
        }

        .page {

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
  }
</style>

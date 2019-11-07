<template>
  <div>

    <logo />

    <!-- 侧边导航菜单 -->
    <div class="nav-menu">
      <el-scrollbar>
        <el-menu
          :default-active="activePath"
          :collapse="sideCollapse"
          unique-opened
          router
          background-color="#545c64"
          text-color="#fff">
          <menu-item v-for="menu in menuList" :key="menu.path" :config="menu" />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import Logo from './Logo';
  import MenuItem from './MenuItem';

  export default {
    components: {
      Logo,
      MenuItem
    },
    data() {
      return {
        menuRouteMap: [],
        menuList: []
      }
    },
    computed: {
      sideCollapse() {
        return this.$store.getters.sideCollapse;
      },
      routeMap() {
        return this.$store.getters.routeMap
      },
      activePath() {
        const { meta, path } = this.$route;
        return meta.activePath ? meta.activePath : path;
      }
    },
    created() {
      this.menuRouteMap = this.getMenuRouteMap(this.routeMap);
      this.menuList = this.getMenu(this.menuRouteMap);
    },
    methods: {
      // 获取需要在侧边菜单显示的路由表
      getMenuRouteMap(routes) {
        const routeMap = routes.filter(route => {
          // 如果父路由设置了hiddenInMenu：true，则它以及它的子路由都不能通过菜单栏访问
          if (route.meta.hiddenInMenu) {
            return false;
          } else {
            if (route.children) {
              route.children = this.getMenuRouteMap(route.children);
              if (route.children.length === 0) {
                // 如果所有子路由都设置了hiddenInMenu：true，则父路由不显示
                return false;
              } else {
                return true;
              }
            } else {
              // 路由未设置hiddenInMenu：true，但是又不存在子路由的情况
              return true;
            }
          }
        })
        return routeMap;
      },
      getMenuItem(route) {
        // children不存在代表是最后一级路由，只有一个children代表只有第一级路由
        if (!route.children || route.children.length === 1) {
          return {
            title: route.meta.title,
            icon: route.meta.icon,
            path: route.path
          }
        } else {
          return {
            title: route.meta.title,
            icon: route.meta.icon,
            path: route.path,
            children: route.children.map(childrenRoute => this.getMenuItem(childrenRoute))
          }
        }
      },
      // 根据路由表生成导航菜单
      getMenu(routes) {
        return this.menuRouteMap.map(route => this.getMenuItem(route));
      }
    },
  }
</script>

<style lang="scss" scoped>
  .nav-menu {
    height: calc(100% - 60px);

    .el-menu {
      border-right: none;

      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }
</style>
<style lang="scss">
  .nav-menu {
    .el-scrollbar {
      height: 100%;
      background-color: #545c64;

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
</style>

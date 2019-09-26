<template>
  <el-menu class="menu" :default-active="$route.path" :collapse="isCollapse" unique-opened router background-color="#545c64" text-color="#fff">
    <menu-item v-for="menu in menuList" :key="menu.path" :config="menu" />
  </el-menu>
</template>

<script>
  import bus from "@/utils/bus";
  import MenuItem from './MenuItem';

  export default {
    components: {
      MenuItem
    },
    data() {
      return {
        isCollapse: false,
        menuRouteMap: [],
        menuList: []
      }
    },
    computed: {
      routeMap() {
        return this.$store.getters.routeMap
      }
    },
    created() {
      // 折叠侧边栏菜单
      bus.$on("collapse", (data) => {
        this.isCollapse = data;
      })
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
      },
    },
  }
</script>

<style lang="scss" scoped>
  .menu {
    position: absolute;
    top: 60px;
    bottom: 0;
    display: inline-block;
    z-index: 10;
    border-top: 2px solid #434a50;
    border-right: none;
    overflow-y: auto;

    .icon {
      vertical-align: middle;
      font-size: 18px;
    }
  }

  .menu::-webkit-scrollbar {
    width: 0;
  }

  .menu:not(.el-menu--collapse) {
    width: 220px;
  }
</style>

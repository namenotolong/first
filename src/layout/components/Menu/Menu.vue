<template>
  <el-menu class="menu" :default-active="$route.path" :collapse="isCollapse" unique-opened router background-color="#545c64" text-color="#fff">
    <menu-item v-for="menu in menuList" :key="menu.path" :config="menu" />
  </el-menu>

</template>
<script>
  import bus from "@/utils/bus";
  import MenuItem from './MenuItem';
  import { dynamicRouteMap } from '@/router';

  export default {
    components: {
      MenuItem
    },
    data() {
      return {
        isCollapse: false,
        menuList: []
      }
    },
    created() {
      // 折叠侧边栏菜单
      bus.$on("collapse", (data) => {
        this.isCollapse = data;
      })
      this.menuList = this.getMenu(dynamicRouteMap);
    },
    methods: {
      // 根据路由生成导航菜单
      getMenu(routes) {
        // todo 还要去除掉子路由中的
        const menuRoutes = routes.filter(route => !route.hiddenInMenu);
        return menuRoutes.map(route => this.getMenuItem(route));
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
      }
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
      // margin-left: 4px;
    }
  }

  .menu::-webkit-scrollbar {
    width: 0;
  }

  .menu:not(.el-menu--collapse) {
    width: 220px;
  }
</style>

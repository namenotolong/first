import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import config from '@/assets/config';

Vue.use(VueRouter);


import articleRoute from './modules/article';
import chartRoute from './modules/chart';
import dashboardRoute from './modules/dashboard';
import errorRoute from './modules/error';
import excelRoute from './modules/excel';
import formRoute from './modules/form';
import iconRoute from './modules/icon';
import loginRoute from './modules/login';
import mapRoute from './modules/map';
import mineRoute from './modules/mine';
import otherRoute from './modules/other';
import permissionRoute from './modules/permission';
import tabRoute from './modules/tab';
import tableRoute from './modules/table';
import userRoute from './modules/user';


// 不需要权限控制的路由
const staticRouteMap = [{
  path: '/',
  redirect: '/dashboard',
  meta: {
    hiddenInMenu: true
  }
},
  loginRoute,
  dashboardRoute,
  mineRoute,
]

// 需要通过角色动态控制的路由表
const dynamicRouteMap = [
  iconRoute,
  chartRoute,
  formRoute,
  tableRoute,
  excelRoute,
  tabRoute,
  mapRoute,
  errorRoute,
  permissionRoute,
  userRoute,
  articleRoute,
  otherRoute
]



const createRouter = () => new VueRouter({
  routes: staticRouteMap,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


// 退出登录的时候执行，防止重复注册路由
const resetRouter = () => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher
}

const router = createRouter();


// 从路由权限表中获取到角色可访问的路由名称
const getRouteNames = (roles, permission) => {
  let routeNames = [];
  roles.forEach(role => routeNames = [...new Set([...routeNames, ...permission[role]])]);
  return routeNames;
}

//根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames, routeMap) => {
  const acceptedRouteMap = [];
  routeMap.forEach(route => {
    // 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
    if (routeNames.includes(route.name)) {
      acceptedRouteMap.push(route)
    } else {
      // 如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
      if (route.children) {
        route.children = filterRouteMap(routeNames, route.children);
        // 如果有子路由可访问，再添加。
        if (route.children.length > 0) {
          acceptedRouteMap.push(route)
        }
      }
    }
  })
  return acceptedRouteMap;
}


// 导航守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (!token && to.path !== '/login') {
    next('/login');
  } else {
    if (token && store.getters.roles.length === 0) {
      store.dispatch('GetUserInfo').then(res => {
        const roles = res.roles;
        const routeNames = getRouteNames(roles, config.permission);
        const acceptedRouteMap = filterRouteMap(routeNames, dynamicRouteMap);
        // 动态注册路由
        router.addRoutes(acceptedRouteMap);
        store.commit('SET_ROUTE_MAP', [...staticRouteMap, ...acceptedRouteMap])
        //  中断当前导航，重新导航到当前路由。刷新页面之后，会重新注册路由，这样可以确保路由注册完毕后，再进入。
        // replace: true 是为了防止在history中留下之前中断的导航的记录。
        next({ path: to.path, replace: true });
      })
    } else {
      next();
    }
  }
})


export { resetRouter };

export default router;


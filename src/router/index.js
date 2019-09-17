import Vue from 'vue';
import VueRouter from 'vue-router';
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
export const staticRouteMap = [{
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


const router = new VueRouter({
  routes: staticRouteMap,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})


export { dynamicRouteMap };

export default router;


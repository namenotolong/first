import "babel-polyfill";
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';


import App from './App.vue';
import router from "./router.js";

import util from "./utils/util.js";
import bus from "./utils/bus.js";
import service from "./utils/service.js";

import 'element-ui/lib/theme-chalk/index.css';
import "./styles/app.scss";
import "./assets/fonts/iconfont.css";
import "./styles/custom-theme.scss";


Vue.use(ElementUI, {
    size: "medium"
});
Object.defineProperty(Vue.prototype, "$axios", {
    value: axios
})
Vue.prototype.$_util = util;
Vue.prototype.$_bus = bus;
Vue.prototype.$_service = service;
Vue.config.productionTip = false;

// 导航守卫，每次进行跳转时都会执行这个钩子
router.beforeEach((to, from, next) => {
    const role = sessionStorage.getItem("ms_username");
    if (!role && to.path !== "/login") {
        next("/login");
    } else {
        next();
    }
})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
})
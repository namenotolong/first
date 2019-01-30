import "babel-polyfill";
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';

import App from './App.vue';
import router from "./router.js";
import store from "./store";

import "element-ui/lib/theme-chalk/index.css";

import "./styles/app.scss";
import "./assets/fonts/iconfont.css";
import "./styles/custom-theme.scss";

// 全局注册的组件和指令
import "./components/component.js";
import "./directive/directive.js";

Vue.use(ElementUI, {
    size: "medium"
});
Object.defineProperty(Vue.prototype, "$axios", {
    value: axios
})
Vue.config.productionTip = false;

// 导航守卫，每次进行跳转时都会执行这个钩子
router.beforeEach((to, from, next) => {
    const userId = sessionStorage.getItem("userId"); //登录之后才会将userId存到本地
    if (!userId && to.path !== "/login") {
        next("/login");
    } else {
        if (userId && !store.state.sysUser.role) {
            // 获取用户信息
            store.dispatch("getUserInfo").then(res => {
                next();
            })
        } else {
            next();
        }
    }
})

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
})
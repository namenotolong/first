import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/app.scss';
import '@/assets/fonts/iconfont.css';

// mock数据
import './mock';

// 全局注册的组件和指令
import '@/components/component.js';
import '@/directive/directive.js';

import reminder from '@/components/Reminder/index.js'


Vue.use(ElementUI, {
  size: 'medium'
});

Object.defineProperty(Vue.prototype, '$axios', {
  value: axios
})
Object.defineProperty(Vue.prototype, '$reminder', {
  value: reminder
})

Vue.config.productionTip = false;

// 导航守卫，每次进行跳转时都会执行这个钩子
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (!token && to.path !== '/login') {
    next('/login');
  } else {
    if (token && !store.state.account.role) {
      // 获取用户信息
      store.dispatch('getUserInfo').then(res => {
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

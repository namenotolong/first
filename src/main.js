import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/styles/app.scss';
import '@/assets/fonts/iconfont.css';

// mock数据
import './mock';

// 全局注册的组件和指令
import '@/components';
import '@/directive';

import reminder from '@/components/Reminder/index.js'

// 权限
import '@/assets/permission';

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



new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
})

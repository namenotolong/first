import 'babel-polyfill';
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/styles/app.scss';


// mock数据
import './mock';

// 全局注册的组件和指令
import '@/components';
import '@/directive';

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



new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
})

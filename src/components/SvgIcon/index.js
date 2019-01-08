import Vue from 'vue';
import SvgIcon from './SvgIcon.vue';

// 全局注册图标组件
Vue.component('svg-icon', SvgIcon);


// 导入所有的svg文件
const importAll = function (requireContext) {
    requireContext.keys().forEach(requireContext);
}
const requireContext = require.context('./svg', false, /\.svg$/);

importAll(requireContext);
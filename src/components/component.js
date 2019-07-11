// 注册全局组件，这样使用的时候不用import。
import Vue from "vue";
import SvgIcon from './SvgIcon/SvgIcon.vue';

//按需引入svg图标
const requireContext = require.context('./SvgIcon/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(requireContext)

Vue.component('svg-icon', SvgIcon);



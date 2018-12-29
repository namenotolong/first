import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

import sysUser from './modules/sysUser.js'

const store = new Vuex.Store({
    modules:{
        sysUser,
    }
})

export default store;
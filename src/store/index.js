import Vue from "vue";
import Vuex from 'vuex';

import sysUser from './modules/sysUser.js'


Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        sysUser,
    }
})

export default store;
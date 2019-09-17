import Vue from 'vue';
import Vuex from 'vuex';

import account from './modules/account';

import getters from './getters'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    account,
  },
  getters
})

export default store;

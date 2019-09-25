import api from '@/api';


const account = {
  state: {
    token: sessionStorage.getItem('token'),
    roles: [],
    routes: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_ROUTE_MAP(state, routeMap) {
      state.routeMap = routeMap;
    }
  },
  actions: {
    // 登录获取token
    Login({ commit }, loginInfo) {
      const username = loginInfo.username.trim();
      const password = loginInfo.password;
      return new Promise((resolve, reject) => {
        api.account.login({
          username,
          password
        }).then(res => {
          const token = res.data.loginInfo.token;
          sessionStorage.setItem('token', token);
          commit('SET_TOKEN', token);
          resolve();
        }).catch((error) => {
          reject(error);
        })
      })
    },
    // 通过token获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.account.getUserInfo({
          token: state.token
        }).then(res => {
          const roles = res.data.userInfo.roles;
          commit('SET_ROLES', roles);
          resolve({ roles });
        }).catch((error) => {
          reject(error);
        })
      })
    },
    logout({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        api.account.logout({
          token: state.token
        }).then(res => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_ROUTE_MAP', []);
          resolve();
        }).catch((error) => {
          reject(error);
        })
      })
    }
  }
}
export default account;

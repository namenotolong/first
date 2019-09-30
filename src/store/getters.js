const getters = {
  token: state => state.account.token,
  roles: state => state.account.roles,
  routeMap: state => state.account.routeMap,
  theme: state => state.setting.theme
}

export default getters;

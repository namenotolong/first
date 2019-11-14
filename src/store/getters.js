const getters = {
  token: state => state.account.token,
  roles: state => state.account.roles,
  routeMap: state => state.account.routeMap,
  cachePages: state => state.cache.cachePages,
  theme: state => state.setting.theme,
  sideCollapse: state => state.setting.sideCollapse,
  tagVisible: state => state.setting.tagVisible,
  size: state => state.setting.size,
}

export default getters;

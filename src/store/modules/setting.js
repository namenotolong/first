

const setting = {
  state: {
    theme: localStorage.getItem('theme') || '#409eff'
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
  }
}
export default setting;

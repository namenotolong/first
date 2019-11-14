import config from '@/assets/config';

const setting = {
  state: {
    // 主题
    theme: localStorage.getItem('theme') || config.theme,
    // 是否折叠侧边菜单
    sideCollapse: localStorage.getItem('sideCollapse') ? !!+localStorage.getItem('sideCollapse') : config.sideCollapse, // Boolean(Number('1'))
    // 是否启用标签导航
    tagVisible: localStorage.getItem('tagVisible') ? !!+localStorage.getItem('tagVisible') : config.tagVisible,
    // 组件大小
    size: localStorage.getItem('size') || config.size,
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
    SET_SIDE_COLLAPSE(state, collapse) {
      state.sideCollapse = collapse;
      localStorage.setItem('sideCollapse', collapse ? '1' : '0');
    },
    SET_TAG_VISIBLE(state, visible) {
      state.tagVisible = visible;
      localStorage.setItem('tagVisible', visible ? '1' : '0');
    },
    SET_SIZE(state, size) {
      state.size = size;
      localStorage.setItem('size', size);
    },
  }
}
export default setting;

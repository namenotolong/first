import config from '@/assets/config';

const cache = {
  state: {
    // 需要缓存的页面
    cachePages: []
  },
  mutations: {
    SET_CACHE_PAGES(state, pages) {
      state.cachePages = pages;
    }
  }
}
export default cache;

const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const Mine = () => import( /* webpackChunkName:'mine' */ '@/pages/Mine/Mine');

const route = {
  path: '/mine',
  component: Layout,
  redirect: '/mine/index',
  meta: {
    title: '个人中心',
    hiddenInMenu: true
  },
  children: [{
    name: 'Mine',
    path: '/mine/index',
    component: Mine,
    meta: {
      title: '个人中心'
    },
  }]
}

export default route;

const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const AMap = () => import( /* webpackChunkName:'map' */ '@/pages/Map');

const route = {
  path: '/map',
  component: Layout,
  redirect: '/map/index',
  meta: {
    title: '地图',
    icon: 'map'
  },
  children: [{
    name: 'AMap',
    path: '/map/index',
    component: AMap,
    meta: {
      title: '地图',
    },
  }]
}

export default route;

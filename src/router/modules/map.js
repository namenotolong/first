const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const AMap = () => import( /* webpackChunkName:'map' */ '@/pages/map');

const route = {
  path: '/map',
  component: InnerLayout,
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
      activePath: '/map'
    },
  }]
}

export default route;

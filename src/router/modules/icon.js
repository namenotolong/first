const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const Svg = () => import( /* webpackChunkName:'svg' */ '@/pages/Icon/Svg');
const FontClass = () => import( /* webpackChunkName:'fontClass' */ '@/pages/Icon/FontClass');


const route = {
  name: 'Icon',
  path: '/icon',
  component: Layout,
  meta: {
    title: '图标',
    icon: 'icon'
  },
  children: [{
    name: 'Svg',
    path: '/icon/svg',
    component: Svg,
    meta: {
      title: 'svg图标',
    }
  }, {
    name: 'FontClass',
    path: '/icon/fontClass',
    component: FontClass,
    meta: {
      title: 'fontClass图标',
    }
  }]
}

export default route;

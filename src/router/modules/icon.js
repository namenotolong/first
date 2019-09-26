const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Svg = () => import( /* webpackChunkName:'svg' */ '@/pages/icon/Svg');
const FontClass = () => import( /* webpackChunkName:'fontClass' */ '@/pages/icon/FontClass');


const route = {
  name: 'Icon',
  path: '/icon',
  component: InnerLayout,
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

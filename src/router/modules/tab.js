const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const Tab = () => import( /* webpackChunkName:'tab' */ '@/pages/Tab/Tab');

const route = {
  path: '/tab',
  component: Layout,
  redirect: '/tab/index',
  meta: {
    title: 'Tab选项卡',
    icon: 'tab'
  },
  children: [{
    name: 'Tab',
    path: '/tab/index',
    component: Tab,
    meta: {
      title: 'Tab选项卡',
    },
  }]
}

export default route;

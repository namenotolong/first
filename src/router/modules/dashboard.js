const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const Dashboard = () => import( /* webpackChunkName:'dashboard' */ '@/pages/Dashboard/Dashboard');

const route = {
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  meta: {
    title: '首页',
    icon: 'home'
  },
  children: [{
    name: 'dashboard',
    path: '/dashboard/index',
    component: Dashboard,
    meta: {
      title: '首页',
    },
  }]
}

export default route;

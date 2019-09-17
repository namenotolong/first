const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const User = () => import( /* webpackChunkName:'user' */ '@/pages/User/UserList');

const route = {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [{
    name: 'User',
    path: '/user/index',
    component: User,
    meta: {
      title: '用户管理',
    },
  }]
}

export default route;

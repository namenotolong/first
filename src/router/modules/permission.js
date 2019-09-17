const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const Permission = () => import( /* webpackChunkName:'permission' */ '@/pages/Permission/Permission');

const route = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  meta: {
    title: '权限控制',
    icon: 'permission'
  },
  children: [{
    name: 'Permission',
    path: '/permission/index',
    component: Permission,
    meta: {
      title: '权限控制',
    },
  }]
}

export default route;

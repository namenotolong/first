const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const Forbidden = () => import( /* webpackChunkName:'403' */ '@/pages/Error/403');
const NotFound = () => import( /* webpackChunkName:'404' */ '@/pages/Error/404');


const route = {
  name: 'Error',
  path: '/error',
  component: Layout,
  meta: {
    title: '错误处理',
    icon: 'error'
  },
  children: [{
    name: 'Forbidden',
    path: '/error/forbidden',
    component: Forbidden,
    meta: {
      title: '403',
    }
  }, {
    name: 'NotFound',
    path: '/error/notFound',
    component: NotFound,
    meta: {
      title: '404',
    }
  }]
}

export default route;

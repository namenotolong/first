const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Forbidden = () => import( /* webpackChunkName:'403' */ '@/pages/error/forbbiden');
const NotFound = () => import( /* webpackChunkName:'404' */ '@/pages/error/notFound');


const route = {
  name: 'Error',
  path: '/error',
  component: InnerLayout,
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

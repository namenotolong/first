const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Kind = () => import( /* webpackChunkName:'user' */ '@/pages/kind');

const route = {
  path: '/kind',
  component: InnerLayout,
  redirect: '/kind/index',
  meta: {
    title: '分类管理',
    icon: 'pdf'
  },
  children: [{
    name: 'Kind',
    path: '/kind/index',
    component: Kind,
    meta: {
      title: '分类管理',
      activePath: '/kind'
    },
  }]
}

export default route;

const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Topic = () => import( /* webpackChunkName:'user' */ '@/pages/topic');

const route = {
  path: '/topic',
  component: InnerLayout,
  redirect: '/topic/index',
  meta: {
    title: '评论/回复管理',
    icon: 'topic'
  },
  children: [{
    name: 'Topic',
    path: '/topic/index',
    component: Topic,
    meta: {
      title: '评论/回复管理',
      activePath: '/topic'
    },
  }]
}

export default route;

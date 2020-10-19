const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Message = () => import( /* webpackChunkName:'user' */ '@/pages/message');

const route = {
  path: '/message',
  component: InnerLayout,
  redirect: '/message/index',
  meta: {
    title: '消息管理',
    icon: 'message'
  },
  children: [{
    name: 'Message',
    path: '/message/index',
    component: Message,
    meta: {
      title: '用户管理',
      activePath: '/message'
    },
  }]
}

export default route;

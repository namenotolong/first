const Login = () => import( /* webpackChunkName:'login' */ '@/pages/login');

const route = {
  name: 'Login',
  path: '/login',
  component: Login,
  meta: {
    title: '登录',
    hiddenInMenu: true
  }
}

export default route;

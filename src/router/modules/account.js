const OuterLayout = () => import( /* webpackChunkName:'outerLayout' */ '@/layouts/outerLayout');
const Login = () => import( /* webpackChunkName:'login' */ '@/pages/account/login');
const Register = () => import( /* webpackChunkName:'register' */ '@/pages/account/Register');


const route = {
  path: '/account',
  component: OuterLayout,
  meta: {
    title: 'Account',
    hiddenInMenu: true
  },
  children: [{
    name: 'Login',
    path: '/account/login',
    component: Login,
    meta: {
      title: '登录',
    }
  }, {
    name: 'Register',
    path: '/account/register',
    component: Register,
    meta: {
      title: '注册',
    }
  }]
}


export default route;

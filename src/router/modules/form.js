const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const BaseForm = () => import( /* webpackChunkName:'baseForm' */ '@/pages/Form/BaseForm');
const StepForm = () => import( /* webpackChunkName:'stepForm' */ '@/pages/Form/StepForm');
const DynamicForm = () => import( /* webpackChunkName:'dynamicForm' */ '@/pages/Form/DynamicForm');
const ValidForm = () => import( /* webpackChunkName:'validForm' */ '@/pages/Form/ValidForm');


const route = {
  name: 'Form',
  path: '/form',
  component: Layout,
  meta: {
    title: '表单',
    icon: 'form'
  },
  children: [{
    name: 'BaseForm',
    path: '/form/baseForm',
    component: BaseForm,
    meta: {
      title: '基础表单',
    }
  }, {
    name: 'StepForm',
    path: '/form/stepForm',
    component: StepForm,
    meta: {
      title: '步骤表单',
    }
  }, {
    name: 'DynamicForm',
    path: '/form/dynamicForm',
    component: DynamicForm,
    meta: {
      title: '动态表单',
    }
  }, {
    name: 'ValidForm',
    path: '/form/validForm',
    component: ValidForm,
    meta: {
      title: '自定义校验规则',
    }
  }]
}

export default route;

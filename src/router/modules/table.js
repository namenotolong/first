const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const BaseTable = () => import( /* webpackChunkName:'baseTable' */ '@/pages/Table/BaseTable');
const ComplexTable = () => import( /* webpackChunkName:'complexTable' */ '@/pages/Table/ComplexTable');


const route = {
  name:'Table',
  path: '/table',
  component: InnerLayout,
  meta: {
    title: '表格',
    icon: 'table'
  },
  children: [{
    name: 'BaseTable',
    path: '/table/baseTable',
    component: BaseTable,
    meta: {
      title: '基础表格',
    }
  }, {
    name: 'ComplexTable',
    path: '/table/complexTable',
    component: ComplexTable,
    meta: {
      title: '复杂表格',
    }
  }]
}

export default route;

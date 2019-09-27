const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Excel = () => import( /* webpackChunkName:'excel' */ '@/pages/excel');


const route = {
  path: '/excel',
  component: InnerLayout,
  redirect: '/excel/index',
  meta: {
    title: 'Excel',
    icon: 'excel'
  },
  children: [{
    name: 'Excel',
    path: '/excel/index',
    component: Excel,
    meta: {
      title: 'Excel',
    }
  }]
}

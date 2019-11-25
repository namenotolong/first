const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const Preview = () => import( /* webpackChunkName:'officePreview' */ '@/pages/office/preview');
const Edit = () => import( /* webpackChunkName:'officeEdit' */ '@/pages/office/edit');


const route = {
  name: 'Office',
  path: '/Office',
  component: InnerLayout,
  meta: {
    title: 'office-online',
    icon: 'office'
  },
  children: [{
    name: 'OfficePreview',
    path: '/office/preview',
    component: Preview,
    meta: {
      title: '在线预览',
    }
  }, {
    name: 'OfficeEdit',
    path: '/office/edit',
    component: Edit,
    meta: {
      title: '在线编辑',
    }
  }]
}

export default route;

const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const UploadExcel = () => import( /* webpackChunkName:'uploadExcel' */ '@/pages/Excel/UploadExcel');
const ExportExcel = () => import( /* webpackChunkName:'exportExcel' */ '@/pages/Excel/ExportExcel');


const route = {
  name: 'Excel',
  path: '/excel',
  component: Layout,
  meta: {
    title: 'Excel',
    icon: 'excel'
  },
  children: [{
    name: 'UploadExcel',
    path: '/excel/uploadExcel',
    component: UploadExcel,
    meta: {
      title: '导入Excel',
    }
  }, {
    name: 'ExportExcel',
    path: '/excel/exportExcel',
    component: ExportExcel,
    meta: {
      title: '导出Excel',
    }
  }]
}

export default route;

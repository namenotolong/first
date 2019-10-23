const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const PdfBase = () => import( /* webpackChunkName:'pdfBse' */ '@/pages/pdf/pdfBase');
const PdfBase64 = () => import( /* webpackChunkName:'pdfBase64' */ '@/pages/pdf/pdfBase64');
const PdfPagination = () => import( /* webpackChunkName:'pdfPagination' */ '@/pages/pdf/pdfPagination');
const PdfPerfect = () => import( /* webpackChunkName:'pdfPerfect' */ '@/pages/pdf/pdfPerfect');



const route = {
  name: 'Pdf',
  path: '/pdf',
  component: InnerLayout,
  meta: {
    title: 'pdf',
    icon: 'pdf'
  },
  children: [{
    name: 'PdfBase',
    path: '/pdf/base',
    component: PdfBase,
    meta: {
      title: '基本使用',
    }
  }, {
    name: 'PdfBase64',
    path: '/pdf/base64',
    component: PdfBase64,
    meta: {
      title: 'base64',
    }
  }, {
    name: 'PdfPagination',
    path: '/pdf/pagination',
    component: PdfPagination,
    meta: {
      title: '分页',
    }
  }, {
    name: 'PdfPerfect',
    path: '/pdf/perfect',
    component: PdfPerfect,
    meta: {
      title: '所有功能',
    }
  }]
}

export default route;

const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const BackToTop = () => import( /* webpackChunkName:'backToTop' */ '@/pages/Component/BackToTop');
const Print = () => import( /* webpackChunkName:'print' */ '@/pages/Component/Print');
const Html2canvas = () => import( /* webpackChunkName:'html2canvas' */ '@/pages/Component/html2canvas');
const DragDialog = () => import( /* webpackChunkName:'dragDialog' */ '@/pages/Component/DragDialog');
const Reminder = () => import( /* webpackChunkName:'reminder' */ '@/pages/Component/Reminder');
const Carousel = () => import( /* webpackChunkName:'carousel' */ '@/pages/Component/Carousel');

const route = {
  name: 'Other',
  path: '/other',
  component: Layout,
  meta: {
    title: '其他功能',
    icon: 'other'
  },
  children: [{
    name: 'BackToTop',
    path: '/other/backToTop',
    component: BackToTop,
    meta: {
      title: '返回顶部',
    }
  }, {
    name: 'Print',
    path: '/other/print',
    component: Print,
    meta: {
      title: '打印',
    }
  }, {
    name: 'Html2canvas',
    path: '/other/html2canvas',
    component: Html2canvas,
    meta: {
      title: 'html2canvas',
    }
  }, {
    name: 'DragDialog',
    path: '/other/dragDialog',
    component: DragDialog,
    meta: {
      title: '拖拽Dialog',
    }
  }, {
    name: 'Reminder',
    path: '/other/reminder',
    component: Reminder,
    meta: {
      title: '消息提示',
    }
  }, {
    name: 'Carousel',
    path: '/other/carousel',
    component: Carousel,
    meta: {
      title: '轮播图',
    }
  }]
}

export default route;

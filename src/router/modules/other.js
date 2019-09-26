const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const BackToTop = () => import( /* webpackChunkName:'backToTop' */ '@/pages/Other/BackToTop');
const Print = () => import( /* webpackChunkName:'print' */ '@/pages/Other/Print');
const Html2canvas = () => import( /* webpackChunkName:'html2canvas' */ '@/pages/Other/html2canvas');
const DragDialog = () => import( /* webpackChunkName:'dragDialog' */ '@/pages/Other/DragDialog');
const Reminder = () => import( /* webpackChunkName:'reminder' */ '@/pages/Other/Reminder');
const Carousel = () => import( /* webpackChunkName:'carousel' */ '@/pages/Other/Carousel');
const ComponentDemo = () => import( /* webpackChunkName:'componentDemo' */ '@/pages/Other/ComponentDemo');

const route = {
  name: 'Other',
  path: '/other',
  component: InnerLayout,
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
  }, {
    name: 'ComponentDemo',
    path: '/other/componentDemo',
    component: ComponentDemo,
    meta: {
      title: '小组件',
    }
  },]
}

export default route;

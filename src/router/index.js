import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);


const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');

const Login = () => import( /* webpackChunkName:'login' */ '@/pages/Login/Login');

const Dashboard = () => import( /* webpackChunkName:'dashboard' */ '@/pages/Dashboard/Dashboard');

// 图标
const Svg = () => import( /* webpackChunkName:'svg' */ '@/pages/Icon/Svg');
const FontClass = () => import( /* webpackChunkName:'fontClass' */ '@/pages/Icon/FontClass');


// 表单
const BaseForm = () => import( /* webpackChunkName:'baseForm' */ '@/pages/Form/BaseForm');
const StepForm = () => import( /* webpackChunkName:'stepForm' */ '@/pages/Form/StepForm');
const DynamicForm = () => import( /* webpackChunkName:'dynamicForm' */ '@/pages/Form/DynamicForm');
const ValidForm = () => import( /* webpackChunkName:'validForm' */ '@/pages/Form/ValidForm');

// 表格
const BaseTable = () => import( /* webpackChunkName:'baseTable' */ '@/pages/Table/BaseTable');
const ComplexTable = () => import( /* webpackChunkName:'complexTable' */ '@/pages/Table/ComplexTable');

// 图表
const LineChart = () => import( /* webpackChunkName:'lineChart' */ '@/pages/Chart/LineChart/LineChart');
const AreaChart = () => import( /* webpackChunkName:'areaChart' */ '@/pages/Chart/AreaChart/AreaChart');
const PillarChart = () => import( /* webpackChunkName:'pillarChart' */ '@/pages/Chart/PillarChart/PillarChart');
const BarChart = () => import( /* webpackChunkName:'barChart' */ '@/pages/Chart/BarChart/BarChart');
const PieChart = () => import( /* webpackChunkName:'pieChart' */ '@/pages/Chart/PieChart/PieChart');
const PointChart = () => import( /* webpackChunkName:'pointChart' */ '@/pages/Chart/PointChart/PointChart');

// 地图
const AMap = () => import( /* webpackChunkName:'map' */ '@/pages/Map/Map');

// tab
const Tab = () => import( /* webpackChunkName:'tab' */ '@/pages/Tab/Tab');

// excel
const UploadExcel = () => import( /* webpackChunkName:'uploadExcel' */ '@/pages/Excel/UploadExcel');
const ExportExcel = () => import( /* webpackChunkName:'exportExcel' */ '@/pages/Excel/ExportExcel');

// 权限控制
const Permission = () => import( /* webpackChunkName:'permission' */ '@/pages/Permission/Permission');

// 用户管理
const User = () => import( /* webpackChunkName:'user' */ '@/pages/User/UserList');

// 文章管理
const ArticleList = () => import( /* webpackChunkName:'articleList' */ '@/pages/Article/ArticleList');
const ArticleCreate = () => import( /* webpackChunkName:'articleCreate' */ '@/pages/Article/ArticleCreate');
const ArticleEdit = () => import( /* webpackChunkName:'articleEdit' */ '@/pages/Article/ArticleEdit');
const ArticleDraft = () => import( /* webpackChunkName:'articleDraft' */ '@/pages/Article/ArticleDraft');
const ArticleRubbish = () => import( /* webpackChunkName:'articleRubbish' */ '@/pages/Article/ArticleRubbish');

// 个人中心
const Mine = () => import( /* webpackChunkName:'mine' */ '@/pages/Mine/Mine');

// 错误处理
const Forbidden = () => import( /* webpackChunkName:'403' */ '@/pages/Error/403');
const NotFound = () => import( /* webpackChunkName:'404' */ '@/pages/Error/404');


// 其他功能
const BackToTop = () => import( /* webpackChunkName:'backToTop' */ '@/pages/Component/BackToTop');
const Print = () => import( /* webpackChunkName:'print' */ '@/pages/Component/Print');
const Html2canvas = () => import( /* webpackChunkName:'html2canvas' */ '@/pages/Component/html2canvas');
const DragDialog = () => import( /* webpackChunkName:'dragDialog' */ '@/pages/Component/DragDialog');
const Reminder = () => import( /* webpackChunkName:'reminder' */ '@/pages/Component/Reminder');
const Carousel = () => import( /* webpackChunkName:'carousel' */ '@/pages/Component/Carousel');


const staticRouteMap = [{
  path: '/',
  redirect: '/dashboard'
}, {
  path: '/login',
  component: Login
}, {
  path: '/layout',
  component: Layout,
}]

// 后端根据角色权限返回的路由
export const dynamicRouteMap = [{
  path: '/dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  meta: {
    title: '首页',
    icon: 'home'
  },
  children: [{
    path: '/dashboard/index',
    component: Dashboard,
    meta: {
      title: '首页',
    },
  }]
}, {
  path: '/icon',
  component: Layout,
  meta: {
    title: '图标',
    icon: 'icon'
  },
  children: [{
    path: '/icon/svg',
    component: Svg,
    meta: {
      title: 'svg图标',
    }
  }, {
    path: '/icon/fontClass',
    component: FontClass,
    meta: {
      title: 'fontClass图标',
    }
  }]
}, {
  path: '/form',
  component: Layout,
  meta: {
    title: '表单',
    icon: 'form'
  },
  children: [{
    path: '/form/baseForm',
    component: BaseForm,
    meta: {
      title: '基础表单',
    }
  }, {
    path: '/form/stepForm',
    component: StepForm,
    meta: {
      title: '步骤表单',
    }
  }, {
    path: '/form/dynamicForm',
    component: DynamicForm,
    meta: {
      title: '动态表单',
    }
  }, {
    path: '/form/validForm',
    component: ValidForm,
    meta: {
      title: '自定义校验规则',
    }
  }]
}, {
  path: '/table',
  component: Layout,
  meta: {
    title: '表格',
    icon: 'table'
  },
  children: [{
    path: '/table/baseTable',
    component: BaseTable,
    meta: {
      title: '基础表格',
    }
  }, {
    path: '/table/complexTable',
    component: ComplexTable,
    meta: {
      title: '复杂表格',
    }
  }]
}, {
  path: '/chart',
  component: Layout,
  meta: {
    title: '图表',
    icon: 'chart'
  },
  children: [{
    path: '/chart/lineChart',
    component: LineChart,
    meta: {
      title: '折线图',
    }
  }, {
    path: '/chart/areaChart',
    component: AreaChart,
    meta: {
      title: '面积图',
    }
  }, {
    path: '/chart/pillarChart',
    component: PillarChart,
    meta: {
      title: '柱状图',
    }
  }, {
    path: '/chart/barChart',
    component: BarChart,
    meta: {
      title: '条形图',
    }
  }, {
    path: '/chart/pieChart',
    component: PieChart,
    meta: {
      title: '饼状图',
    }
  }, {
    path: '/chart/pointChart',
    component: PointChart,
    meta: {
      title: '饼状图',
    }
  }]
}, {
  path: '/map',
  component: Layout,
  redirect: '/map/index',
  meta: {
    title: '地图',
    icon: 'map'
  },
  children: [{
    path: '/map/index',
    component: AMap,
  }]
}, {
  path: '/tab',
  component: Layout,
  redirect: '/tab/index',
  meta: {
    title: 'Tab选项卡',
    icon: 'tab'
  },
  children: [{
    path: '/tab/index',
    component: Tab,
    meta: {
      title: 'Tab选项卡',
    },
  }]
}, {
  path: '/excel',
  component: Layout,
  meta: {
    title: 'Excel',
    icon: 'excel'
  },
  children: [{
    path: '/excel/uploadExcel',
    component: UploadExcel,
    meta: {
      title: '导入Excel',
    }
  }, {
    path: '/excel/exportExcel',
    component: ExportExcel,
    meta: {
      title: '导出Excel',
    }
  }]
}, {
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  meta: {
    title: '权限控制',
    icon: 'permission'
  },
  children: [{
    path: '/permission/index',
    component: Permission,
    meta: {
      title: '权限控制',
    },
  }]
}, {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  meta: {
    title: '用户管理',
    icon: 'user'
  },
  children: [{
    path: '/user/index',
    component: User,
    meta: {
      title: '用户管理',
    },
  }]
}, {
  path: '/article',
  component: Layout,
  meta: {
    title: '文章管理',
    icon: 'article'
  },
  children: [{
    path: '/article/articleList',
    component: ArticleList,
    meta: {
      title: '文章列表',
    }
  }, {
    path: '/article/articleCreate',
    component: ArticleCreate,
    meta: {
      title: '创建文章',
    }
  }, {
    path: '/article/articleEdit/:articleId/:articleIndex',
    component: ArticleEdit,
    hiddenInMenu: true,
    meta: {
      title: '编辑文章',
    },
    props: true,
    beforeEnter: (to, from, next) => {
      to.meta.title = '编辑文章' + to.params.articleIndex;
      next();
    }
  }, {
    path: '/article/articleDraft',
    component: ArticleDraft,
    meta: {
      title: '草稿箱',
    }
  }, {
    path: '/article/articleRubbish',
    component: ArticleRubbish,
    meta: {
      title: '垃圾箱'
    }
  }]
}, {
  path: '/mine',
  component: Layout,
  redirect: '/mine/index',
  hiddenInMenu: true,
  meta: {
    title: '个人中心',
  },
  children: [{
    path: '/mine/index',
    component: Mine,
  }]
}, {
  path: '/error',
  component: Layout,
  meta: {
    title: '错误处理',
    icon: 'error'
  },
  children: [{
    path: '/error/Forbidden',
    component: Forbidden,
    meta: {
      title: '403',
    }
  }, {
    path: '/error/notFound',
    component: NotFound,
    meta: {
      title: '404',
    }
  }]
}, {
  path: '/other',
  component: Layout,
  meta: {
    title: '其他功能',
    icon: 'other'
  },
  children: [{
    path: '/other/backToTop',
    component: BackToTop,
    meta: {
      title: '返回顶部',
    }
  }, {
    path: '/other/print',
    component: Print,
    meta: {
      title: '打印',
    }
  }, {
    path: '/other/html2canvas',
    component: Html2canvas,
    meta: {
      title: 'html2canvas',
    }
  }, {
    path: '/other/dragDialog',
    component: DragDialog,
    meta: {
      title: '拖拽Dialog',
    }
  }, {
    path: '/other/reminder',
    component: Reminder,
    meta: {
      title: '消息提示',
    }
  }, {
    path: '/other/carousel',
    component: Carousel,
    meta: {
      title: '轮播图',
    }
  }]
}]




export default new VueRouter({
  routes: [...staticRouteMap, ...dynamicRouteMap],
  scrollBehavior: () => ({
    y: 0
  })
})



const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const LineChart = () => import( /* webpackChunkName:'lineChart' */ '@/pages/Chart/LineChart/LineChart');
const AreaChart = () => import( /* webpackChunkName:'areaChart' */ '@/pages/Chart/AreaChart/AreaChart');
const PillarChart = () => import( /* webpackChunkName:'pillarChart' */ '@/pages/Chart/PillarChart/PillarChart');
const BarChart = () => import( /* webpackChunkName:'barChart' */ '@/pages/Chart/BarChart/BarChart');
const PieChart = () => import( /* webpackChunkName:'pieChart' */ '@/pages/Chart/PieChart/PieChart');
const PointChart = () => import( /* webpackChunkName:'pointChart' */ '@/pages/Chart/PointChart/PointChart');


const route = {
  name: 'Chart',
  path: '/chart',
  component: Layout,
  meta: {
    title: '图表',
    icon: 'chart'
  },
  children: [{
    name: 'LineChart',
    path: '/chart/lineChart',
    component: LineChart,
    meta: {
      title: '折线图',
    }
  }, {
    name: 'AreaChart',
    path: '/chart/areaChart',
    component: AreaChart,
    meta: {
      title: '面积图',
    }
  }, {
    name: 'PillarChart',
    path: '/chart/pillarChart',
    component: PillarChart,
    meta: {
      title: '柱状图',
    }
  }, {
    name: 'BarChart',
    path: '/chart/barChart',
    component: BarChart,
    meta: {
      title: '条形图',
    }
  }, {
    name: 'PieChart',
    path: '/chart/pieChart',
    component: PieChart,
    meta: {
      title: '饼状图',
    }
  }, {
    name: 'PointChart',
    path: '/chart/pointChart',
    component: PointChart,
    meta: {
      title: '饼状图',
    }
  }]
}

export default route;

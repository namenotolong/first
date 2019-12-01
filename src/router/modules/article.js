const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const ArticleList = () => import( /* webpackChunkName:'articleList' */ '@/pages/article/articleList');
const ArticleEdit = () => import( /* webpackChunkName:'articleEdit' */ '@/pages/article/articleEdit');


const route = {
  name: 'Article',
  path: '/article',
  component: InnerLayout,
  redirect: '/article/list',
  meta: {
    title: '文章管理',
    icon: 'article'
  },
  children: [{
    name: 'ArticleList',
    path: '/article/list',
    component: ArticleList,
    meta: {
      title: '文章管理',
      activePath: '/article',
      noCache: true
    }
  }, {
    name: 'ArticleAdd',
    path: '/article/add',
    component: ArticleEdit,
    meta: {
      title: '新增文章',
      hiddenInMenu: true,
      noCache: true
    },
  }, {
    name: 'ArticleEdit',
    path: '/article/edit/:articleId/:articleIndex',
    component: ArticleEdit,
    meta: {
      title: '编辑文章',
      hiddenInMenu: true,
      noCache: true
    },
    props: true,
    beforeEnter: (to, from, next) => {
      to.meta.title = '编辑文章' + '-' + to.params.articleIndex;
      next();
    }
  }]
}

export default route;

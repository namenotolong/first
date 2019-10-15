const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const ArticleList = () => import( /* webpackChunkName:'articleList' */ '@/pages/article/ArticleList');
const ArticleCreate = () => import( /* webpackChunkName:'articleCreate' */ '@/pages/article/ArticleCreate');
const ArticleEdit = () => import( /* webpackChunkName:'articleEdit' */ '@/pages/article/ArticleEdit');


const route = {
  name: 'Article',
  path: '/article',
  component: InnerLayout,
  meta: {
    title: '文章管理',
    icon: 'article'
  },
  children: [{
    name: 'ArticleList',
    path: '/article/articleList',
    component: ArticleList,
    meta: {
      title: '文章列表',
    }
  }, {
    name: 'ArticleCreate',
    path: '/article/articleCreate',
    component: ArticleCreate,
    meta: {
      title: '创建文章',
    }
  }, {
    name: 'ArticleEdit',
    path: '/article/articleEdit/:articleId/:articleIndex',
    component: ArticleEdit,
    meta: {
      title: '编辑文章',
      hiddenInMenu: true
    },
    props: true,
    beforeEnter: (to, from, next) => {
      to.meta.title = '编辑文章' + to.params.articleIndex;
      next();
    }
  }]
}

export default route;

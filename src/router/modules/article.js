const Layout = () => import( /* webpackChunkName:'layout' */ '@/layout/Layout');
const ArticleList = () => import( /* webpackChunkName:'articleList' */ '@/pages/Article/ArticleList');
const ArticleCreate = () => import( /* webpackChunkName:'articleCreate' */ '@/pages/Article/ArticleCreate');
const ArticleEdit = () => import( /* webpackChunkName:'articleEdit' */ '@/pages/Article/ArticleEdit');
const ArticleDraft = () => import( /* webpackChunkName:'articleDraft' */ '@/pages/Article/ArticleDraft');
const ArticleRubbish = () => import( /* webpackChunkName:'articleRubbish' */ '@/pages/Article/ArticleRubbish');


const route = {
  name: 'Article',
  path: '/article',
  component: Layout,
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
      // hiddenInMenu: true
    }
  }, {
    name: 'ArticleCreate',
    path: '/article/articleCreate',
    component: ArticleCreate,
    meta: {
      title: '创建文章',
      hiddenInMenu: true
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
  }, {
    name: 'ArticleDraft',
    path: '/article/articleDraft',
    component: ArticleDraft,
    meta: {
      title: '草稿箱',
      hiddenInMenu: true
    }
  }, {
    name: 'ArticleRubbish',
    path: '/article/articleRubbish',
    component: ArticleRubbish,
    meta: {
      title: '垃圾箱',
      hiddenInMenu: true
    }
  }]
}

export default route;

const InnerLayout = () => import( /* webpackChunkName:'innerLayout' */ '@/layouts/innerLayout');
const ArticleList = () => import( /* webpackChunkName:'articleList' */ '@/pages/article/ArticleList');
const ArticleCreate = () => import( /* webpackChunkName:'articleCreate' */ '@/pages/article/ArticleCreate');
const ArticleEdit = () => import( /* webpackChunkName:'articleEdit' */ '@/pages/article/ArticleEdit');
const ArticleDraft = () => import( /* webpackChunkName:'articleDraft' */ '@/pages/article/ArticleDraft');
const ArticleRubbish = () => import( /* webpackChunkName:'articleRubbish' */ '@/pages/article/ArticleRubbish');


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
  }, {
    name: 'ArticleDraft',
    path: '/article/articleDraft',
    component: ArticleDraft,
    meta: {
      title: '草稿箱',
    }
  }, {
    name: 'ArticleRubbish',
    path: '/article/articleRubbish',
    component: ArticleRubbish,
    meta: {
      title: '垃圾箱',
    }
  }]
}

export default route;

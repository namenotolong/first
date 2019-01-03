import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


export default new VueRouter({
    routes: [{
        path: "/",
        redirect: "/dashboard"
    }, {
        path: "/login",
        component: () => import("./pages/Login/Login.vue")
    }, {
        path: "/layout",
        component: () => import("./pages/Layout/Layout.vue"),
        children: [{
            path: "/dashboard",
            component: () => import("./pages/Dashboard/Dashboard.vue"),
            meta: {
                title: "首页"
            }
        }, {
            path: "/table",
            component: () => import("./pages/Table/Table.vue"),
            meta: {
                title: "表格"
            }
        }, {
            path: "/lineChart",
            component: () => import("./pages/Chart/LineChart.vue"),
            meta: {
                title: "折线图"
            }
        }, {
            path: "/histogram",
            component: () => import("./pages/Chart/Histogram.vue"),
            meta: {
                title: "柱状图"
            }
        }, {
            path: "/pieChart",
            component: () => import("./pages/Chart/PieChart.vue"),
            meta: {
                title: "饼状图"
            }
        }, {
            path: "/user",
            component: () => import("./pages/User/UserList.vue"),
            meta: {
                title: "用户管理"
            }
        }, {
            path: "/articleList",
            component: () => import("./pages/Article/ArticleList.vue"),
            meta: {
                title: "文章列表"
            }
        }, {
            path: "/articleCreate",
            component: () => import("./pages/Article/ArticleCreate.vue"),
            meta: {
                title: "创建文章"
            }
        }, {
            path: "/articleEdit/:articleId/:articleIndex",
            component: () => import("./pages/Article/ArticleEdit.vue"),
            meta: {
                title: "编辑文章"
            },
            props: true,
            beforeEnter: (to, from, next) => {
                to.meta.title = "编辑文章" + to.params.articleIndex;
                next();
            }
        }, {
            path: "/articleDraft",
            component: () => import("./pages/Article/ArticleDraft.vue"),
            meta: {
                title: "草稿箱"
            }
        }, {
            path: "/articleRubbish",
            component: () => import("./pages/Article/ArticleRubbish.vue"),
            meta: {
                title: "垃圾箱"
            }
        }, {
            path: "/mine",
            component: () => import("./pages/Mine/Mine.vue"),
            meta: {
                title: "个人中心"
            }
        }, {
            path: "/403",
            component: () => import("./pages/Error/403.vue"),
            meta: {
                title: "403"
            }
        }, {
            path: "/404",
            component: () => import("./pages/Error/404.vue"),
            meta: {
                title: "404"
            }
        }]
    }]
})
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


export default new VueRouter({
    routes: [{
            path: "/",
            redirect:"/dashboard"
        },{
            path: "/login",
            component: () => import("./pages/Login/Login.vue")
        }, {
            path: "/layout",
            component: () => import("./pages/Layout/Layout.vue"),
            children: [{
                path: "/dashboard",
                component: () => import("./pages/Dashboard/Dashboard.vue"),
                meta: { title: "首页" }
            },{
                path: "/table",
                component: () => import("./pages/Table/Table.vue"),
                meta: { title: "表格" }
            },{
                path: "/chart",
                component: () => import("./pages/Chart/Chart.vue"),
                meta: { title: "图表" }
            },{
                path: "/articleList",
                component: () => import("./pages/Article/ArticleList.vue"),
                meta: { title: "文章管理" }
            },{
                path: "/articleCreate",
                component: () => import("./pages/Article/ArticleCreate.vue"),
                meta: { title: "创建文章" }
            },{
                path: "/articleEdit/:articleId",
                component: () => import("./pages/Article/ArticleEdit.vue"),
                meta: { title: "编辑文章" },
                props: true
            },{
                path: "/mine",
                component: () => import("./pages/Mine/Mine.vue"),
                meta: { title: "个人中心" }
            },{
                path: "/403",
                component: () => import("./pages/Error/403.vue"),
                meta: { title: "403" }
            },{
                path: "/404",
                component: () => import("./pages/Error/404.vue"),
                meta: { title: "404" }
            }]
        }
    ]
})

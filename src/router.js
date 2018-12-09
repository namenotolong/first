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
            path: "/home",
            component: () => import("./components/Home/Home.vue"),
            children: [{
                path: "/dashboard",
                name:"s",
                component: () => import("./pages/Dashboard/Dashboard.vue"),
                meta: { title: "首页" }
            },{
                path: "/users",
                component: () => import("./pages/Users/Users.vue"),
                meta: { title: "用户管理" }
            },{
                path: "/articles",
                component: () => import("./pages/Articles/Articles.vue"),
                meta: { title: "文章管理" }
            },{
                path: "/403",
                component: () => import("./pages/403/403.vue"),
                meta: { title: "403" }
            },{
                path: "/404",
                component: () => import("./pages/404/404.vue"),
                meta: { title: "404" }
            }]
        }
    ]
})

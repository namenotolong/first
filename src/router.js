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
                path: "/richTextEditor",
                component: () => import("./pages/RichTextEditor/RichTextEditor.vue"),
                meta: { title: "富文本编辑器" }
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

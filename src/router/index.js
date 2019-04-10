import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);


const router = new VueRouter({
    routes: [{
        path: "/",
        redirect: "/dashboard"
    }, {
        path: "/login",
        component: () => import("~/pages/Login/Login.vue")
    }, {
        path: "/layout",
        component: () => import("~/pages/Layout/Layout.vue"),
        children: [{
            path: "/dashboard",
            component: () => import("~/pages/Dashboard/Dashboard.vue"),
            meta: {
                title: "首页"
            }
        }, {
            path: "/svg",
            component: () => import("~/pages/Icon/Svg.vue"),
            meta: {
                title: "svg图标"
            }
        }, {
            path: "/fontClass",
            component: () => import("~/pages/Icon/FontClass.vue"),
            meta: {
                title: "fontClass图标"
            }
        }, {
            path: "/baseForm",
            component: () => import("~/pages/Form/BaseForm.vue"),
            meta: {
                title: "基础表单"
            }
        }, {
            path: "/stepForm",
            component: () => import("~/pages/Form/StepForm.vue"),
            meta: {
                title: "步骤表单"
            }
        }, {
            path: "/dynamicForm",
            component: () => import("~/pages/Form/DynamicForm.vue"),
            meta: {
                title: "动态表单"
            }
        }, {
            path: "/validForm",
            component: () => import("~/pages/Form/ValidForm.vue"),
            meta: {
                title: "自定义校验规则"
            }
        }, {
            path: "/baseTable",
            component: () => import("~/pages/Table/BaseTable.vue"),
            meta: {
                title: "基础表格"
            }
        }, {
            path: "/complexTable",
            component: () => import("~/pages/Table/ComplexTable.vue"),
            meta: {
                title: "复杂表格"
            }
        }, {
            path: "/lineChart",
            component: () => import("~/pages/Chart/LineChart/LineChart.vue"),
            meta: {
                title: "折线图"
            }
        }, {
            path: "/areaChart",
            component: () => import("~/pages/Chart/AreaChart/AreaChart.vue"),
            meta: {
                title: "面积图"
            }
        }, {
            path: "/pillarChart",
            component: () => import("~/pages/Chart/PillarChart/PillarChart.vue"),
            meta: {
                title: "柱状图"
            }
        }, {
            path: "/barChart",
            component: () => import("~/pages/Chart/BarChart/BarChart.vue"),
            meta: {
                title: "柱状图"
            }
        }, {
            path: "/pieChart",
            component: () => import("~/pages/Chart/PieChart/PieChart.vue"),
            meta: {
                title: "饼状图"
            }
        }, {
            path: "/pointChart",
            component: () => import("~/pages/Chart/PointChart/PointChart.vue"),
            meta: {
                title: "散点图"
            }
        }, {
            path: "/map",
            component: () => import("~/pages/Map/Map.vue"),
            meta: {
                title: "地图"
            }
        }, {
            path: "/tab",
            component: () => import("~/pages/Tab/Tab.vue"),
            meta: {
                title: "Tab选项卡"
            }
        }, {
            path: "/exportExcel",
            component: () => import("~/pages/Excel/ExportExcel.vue"),
            meta: {
                title: "导出Excel"
            }
        }, {
            path: "/uploadExcel",
            component: () => import("~/pages/Excel/UploadExcel.vue"),
            meta: {
                title: "上传Excel"
            }
        }, {
            path: "/permission",
            component: () => import("~/pages/Permission/Permission.vue"),
            meta: {
                title: "权限控制"
            }
        }, {
            path: "/user",
            component: () => import("~/pages/User/UserList.vue"),
            meta: {
                title: "用户管理"
            }
        }, {
            path: "/articleList",
            component: () => import("~/pages/Article/ArticleList.vue"),
            meta: {
                title: "文章列表"
            }
        }, {
            path: "/articleCreate",
            component: () => import("~/pages/Article/ArticleCreate.vue"),
            meta: {
                title: "创建文章"
            }
        }, {
            path: "/articleEdit/:articleId/:articleIndex",
            component: () => import("~/pages/Article/ArticleEdit.vue"),
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
            component: () => import("~/pages/Article/ArticleDraft.vue"),
            meta: {
                title: "草稿箱"
            }
        }, {
            path: "/articleRubbish",
            component: () => import("~/pages/Article/ArticleRubbish.vue"),
            meta: {
                title: "垃圾箱"
            }
        }, {
            path: "/mine",
            component: () => import("~/pages/Mine/Mine.vue"),
            meta: {
                title: "个人中心"
            }
        }, {
            path: "/403",
            component: () => import("~/pages/Error/403.vue"),
            meta: {
                title: "403"
            }
        }, {
            path: "/404",
            component: () => import("~/pages/Error/404.vue"),
            meta: {
                title: "404"
            }
        }, {
            path: "/backToTop",
            component: () => import("~/pages/Component/BackToTop.vue"),
            meta: {
                title: "返回顶部"
            }
        }, {
            path: "/print",
            component: () => import("~/pages/Component/Print.vue"),
            meta: {
                title: "打印"
            }
        }, {
            path: "/html2canvas",
            component: () => import("~/pages/Component/html2canvas.vue"),
            meta: {
                title: "html2canvas"
            }
        }, {
            path: "/dragDialog",
            component: () => import("~/pages/Component/DragDialog.vue"),
            meta: {
                title: "拖拽Dialog"
            }
        }]
    }]
})

export default router;
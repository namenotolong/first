<template>
    <el-menu class="menu" :default-active="$route.path" :collapse="isCollapse" unique-opened router background-color="#545c64"
        text-color="#fff">

        <el-menu-item index="/dashboard">
            <i class="iconfont icon-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="4">
            <template slot="title">
                <i class="iconfont icon-icon"></i>
                <span>图标</span>
            </template>
            <el-menu-item index="/svg">svg图标</el-menu-item>
            <el-menu-item index="/fontClass">fontClass图标</el-menu-item>
        </el-submenu>

        <el-submenu index="7">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>表单</span>
            </template>
            <el-menu-item index="/baseForm">基础表单</el-menu-item>
            <el-menu-item index="/validForm">自定义校验规则</el-menu-item>
        </el-submenu>

        <el-menu-item index="/table">
            <i class="iconfont icon-table"></i>
            <span slot="title">表格</span>
        </el-menu-item>



        <el-submenu index="1">
            <template slot="title">
                <i class="iconfont icon-chart"></i>
                <span>图表</span>
            </template>
            <el-menu-item index="/lineChart">折线图</el-menu-item>
            <el-menu-item index="/areaChart">面积图</el-menu-item>
            <el-menu-item index="/pillarChart">柱状图</el-menu-item>
            <el-menu-item index="/barChart">条形图</el-menu-item>
            <el-menu-item index="/pieChart">饼状图</el-menu-item>
            <el-menu-item index="/pointChart">散点图</el-menu-item>
        </el-submenu>

        <el-menu-item index="/user">
            <i class="iconfont icon-user"></i>
            <span slot="title">用户管理</span>
        </el-menu-item>

        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章管理</span>
            </template>
            <el-menu-item index="/articleCreate">创建文章</el-menu-item>
            <el-menu-item index="/articleList">文章列表</el-menu-item>
            <el-menu-item index="/articleDraft">草稿箱</el-menu-item>
            <el-menu-item index="/articleRubbish">垃圾箱</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-warning"></i>
                <span>错误处理</span>
            </template>
            <el-menu-item index="/403">403</el-menu-item>
            <el-menu-item index="/404">404</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-warning"></i>
                <span>组件</span>
            </template>
            <el-menu-item index="/403">403</el-menu-item>
            <el-menu-item index="/404">404</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
    import bus from "../../../utils/bus.js";
    export default {
        data() {
            return {
                isCollapse: false,
                // menuItem: [{
                //     index: "/dashboard",
                //     title: "首页",
                //     icon: "iconfont icon-home"
                // }, {
                //     index: "/table",
                //     title: "表格",
                //     icon: "iconfont icon-home"
                // }, {
                //     index: "/chart",
                //     title: "图表",
                //     icon: "el-icon-document"
                // }, {
                //     index: "/richTextEditor",
                //     title: "富文本编辑器",
                //     icon: "el-icon-document"
                // },{
                //     index: "1",
                //     title: "错误处理",
                //     icon: "el-icon-warning",
                //     subs: [{
                //         index: "/403",
                //         title: "403"
                //     }, {
                //         index: "/404",
                //         title: "404"
                //     }]
                // }]
            }
        },
        computed: {

        },
        created() {
            // 折叠侧边栏菜单
            bus.$on("collapse", (data) => {
                this.isCollapse = data;
            })
        },
        methods: {

        }
    }
</script>

<style scoped>
    .menu {
        position: absolute;
        top: 60px;
        bottom: 0;
        display: inline-block;
        z-index: 10;
        border-top: 2px solid #434a50;
        border-right: none;
        overflow-y: auto;
    }

    .menu::-webkit-scrollbar {
        width: 0;
    }

    .menu:not(.el-menu--collapse) {
        width: 220px;
    }

    .iconfont {
        margin-right: 10px;
        font-size: 18px;
        margin-left: 4px;
    }
</style>
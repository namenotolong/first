<template>
    <el-menu class="menu" :default-active="$route.path" :collapse="isCollapse" unique-opened router background-color="#545c64"
        text-color="#fff">

        <el-menu-item index="/dashboard">
            <i class="iconfont icon-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/table">
            <i class="iconfont icon-home"></i>
            <span slot="title">表格</span>
        </el-menu-item>

        <el-menu-item index="/chart">
            <i class="el-icon-document"></i>
            <span slot="title">图表</span>
        </el-menu-item>

        <el-menu-item index="/richTextEditor">
            <i class="el-icon-document"></i>
            <span slot="title">富文本编辑器</span>
        </el-menu-item>

        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-warning"></i>
                <span>错误处理</span>
            </template>
            <el-menu-item index="/403">403</el-menu-item>
            <el-menu-item index="/404">404</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
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
            this.$_bus.$on("collapse", (data) => {
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
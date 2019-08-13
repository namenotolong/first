<template>
  <el-menu class="menu" :default-active="$route.path" :collapse="isCollapse" unique-opened router background-color="#545c64" text-color="#fff">

    <el-menu-item index="/dashboard">
      <i class="iconfont icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont icon-icon"></i>
        <span>图标</span>
      </template>
      <el-menu-item index="/svg">svg图标</el-menu-item>
      <el-menu-item index="/fontClass">fontClass图标</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="iconfont icon-form"></i>
        <span>表单</span>
      </template>
      <el-menu-item index="/baseForm">基础表单</el-menu-item>
      <el-menu-item index="/stepForm">步骤表单</el-menu-item>
      <el-menu-item index="/dynamicForm">动态表单</el-menu-item>
      <el-menu-item index="/validForm">自定义校验规则</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="iconfont icon-table"></i>
        <span>表格</span>
      </template>
      <el-menu-item index="/baseTable">基础表格</el-menu-item>
      <el-menu-item index="/complexTable">复杂表格</el-menu-item>
    </el-submenu>

    <el-submenu index="4">
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

    <el-menu-item index="/map">
      <i class="el-icon-location-outline"></i>
      <span slot="title">地图</span>
    </el-menu-item>

    <el-menu-item index="/tab">
      <i class="iconfont icon-tab"></i>
      <span slot="title">Tab选项卡</span>
    </el-menu-item>

    <el-submenu index="5">
      <template slot="title">
        <i class="iconfont icon-excel"></i>
        <span>Excel</span>
      </template>
      <el-menu-item index="/exportExcel">导出Excel</el-menu-item>
      <el-menu-item index="/uploadExcel">上传Excel</el-menu-item>
    </el-submenu>

    <el-menu-item index="/permission">
      <i class="iconfont icon-quanxian"></i>
      <span slot="title">权限控制</span>
    </el-menu-item>

    <el-menu-item index="/user">
      <i class="iconfont icon-yonghu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>

    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>文章管理</span>
      </template>

      <el-menu-item index="/articleCreate">
        <i class="iconfont icon-bianji"></i>
        <span slot="title">创建文章</span>
      </el-menu-item>
      <el-menu-item index="/articleList">
        <i class="iconfont icon-liebiao"></i>
        <span slot="title">文章列表</span>
      </el-menu-item>
      <el-menu-item index="/articleDraft">
        <i class="iconfont icon-caogaoxiang"></i>
        <span slot="title">草稿箱</span>
      </el-menu-item>
      <el-menu-item index="/articleRubbish">
        <i class="iconfont icon-lajixiang"></i>
        <span slot="title">垃圾箱</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="7">
      <template slot="title">
        <i class="iconfont icon-jinggao"></i>
        <span>错误处理</span>
      </template>
      <el-menu-item index="/403">403</el-menu-item>
      <el-menu-item index="/404">404</el-menu-item>
    </el-submenu>

    <el-submenu index="8">
      <template slot="title">
        <i class="iconfont icon-zujian"></i>
        <span>其他功能</span>
      </template>
      <el-menu-item index="/backToTop">返回顶部</el-menu-item>
      <el-menu-item index="/print">打印</el-menu-item>
      <el-menu-item index="/html2canvas">html2canvas</el-menu-item>
      <el-menu-item index="/dragDialog">可拖拽Dialog</el-menu-item>
      <el-menu-item index="/reminder">消息提示</el-menu-item>
    </el-submenu>
  </el-menu>

</template>
<script>
  import bus from "@/utils/bus.js";
  export default {
    data() {
      return {
        isCollapse: false,
      }
    },
    created() {
      // 折叠侧边栏菜单
      bus.$on("collapse", (data) => {
        this.isCollapse = data;
      })
    },
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

## 项目简介

    基于Vue+ElementUI的通用后台管理系统

## 技术依赖
- 主体：Vue、ElementUI、webpack
- 图表：Antv/G2
- Excel：js-xlsx
- 富文本编辑器：Tinymce
- 数据：axios、Easy-Mock


## 功能

- 登录/退出
- 全屏浏览
- 一键换肤
- 个人中心
- 侧边菜单
- 标签快捷导航
- 图标
- 表格
- 表单
- 用户管理
- 文章管理
  - 创建文章
  - 文章列表
  - 草稿箱
  - 垃圾箱
- 图表
  - 折线图
  - 面积图
  - 柱状图
  - 条形图
  - 饼图
  - 散点图
- 上传
  - 头像上传
  - 文件上传
- 错误处理
  - 403
  - 404



## 目录结构

```
|-- dist								webpack构建目录
|-- shortcut							项目截图
|-- src									源码目录
|	|-- api									接口
|	|-- assets								静态资源文件，会被webpack解析为模块依赖
|		|-- img									图片
|		|-- fonts								字体
|	|-- components                      	公共组件
|	|-- mock								模拟数据
|	|-- pages								页面级组件	
|	|--	styles								公共样式
|	|-- utils								工具函数	
|	|-- App.vue								根组件
|	|-- main.js								入口文件，加载各种组件
|	|-- router.js							路由管理	
|	|-- store.js							状态管理
|-- static								第三方纯静态资源，不被webpcak构建
|-- .babelrc							babel-loader 配置
|-- .gitignore							git提交时忽略的文件
|-- .favicon.ico   					    favicon
|-- index.html							html模板
|--	package.json						项目基本信息
|-- README.md							项目说明
|-- webpack.config.js					webpack配置文件
```


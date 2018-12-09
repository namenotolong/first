## 项目简介

    基于Vue+ElementUI的通用后台管理系统

## 功能

- 登录/退出
- 全屏浏览
- 一键换肤
- 侧边菜单
- 标签快捷导航
- 富文本编辑
- 错误处理
  - 403
  - 404

- 表格
  - 
- 上传
  - 头像上传
  - 文件上传

- 图表


## 目录结构

```
|-- build								webpack构建目录
|	|-- build.js							生产环境构建脚本
|	|-- webpack.base.conf.js				webpack基础配置
|	|-- webpack.dev.conf.js					webpack开发环境配置
|	|-- webpack.prod.conf.js				webpack生产环境配置
|-- config								项目环境配置
|	|-- dev.env.js							开发环境变量
|	|-- index.js							项目配置文件
|	|-- prod.env.js							生产环境变量
|	|-- test.env.js							测试环境变量
|-- src									源码目录
|	|-- assets								静态资源文件，会被webpack解析为模块依赖
|		|--images								图片资源
|	|-- components                       	组件
|		|-- common								公共组件
|		|-- page								页面级组件
|	|--css									全局样式
|		|--common.css							
|	|--js									全局脚本
|		|--common.js				
|	|-- App.vue								根组件
|	|-- main.js								入口文件，加载各种组件
|	|-- router.js							路由管理	
|	|-- store.js							状态管理
|-- static								第三方纯静态资源，不被webpcak构建
|-- .babelrc							babel-loader 配置
|-- .gitignore							git提交时忽略的文件
|-- index.html							html模板
|--	package.json						项目基本信息
|-- README.md							项目说明
```


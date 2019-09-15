<template>
  <el-submenu v-if="config.children" :index="config.path">
    <template slot="title">
      <svg-icon v-if="config.icon" :icon-name="config.icon" icon-class="icon" />
      <span>{{config.title}}</span>
    </template>

    <menu-item v-for="menu in config.children" :key="menu.path" :config="menu" />
  </el-submenu>

  <el-menu-item v-else :index="config.path">
    <svg-icon v-if="config.icon" :icon-name="config.icon" icon-class="icon" />
    <span slot="title">{{config.title}}</span>
  </el-menu-item>

</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      config: {
        required: true,
        default: {}
      },
    },
  }
</script>

<style lang="scss" scoped>
  .icon {
    vertical-align: middle;
    font-size: 18px;
  }
</style>

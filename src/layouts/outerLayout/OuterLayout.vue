<template>
  <div class="outer-layout">
    <div class="logo">
      <svg-icon icon-name="logo"/>
      <span>后台管理系统</span>
    </div>

    <div class="page">
      <router-view />
    </div>

    <theme-picker class="theme-picker" />

  </div>
</template>

<script>
  import ThemePicker from '@/components/themePicker';

  export default {
    components: {
      ThemePicker
    }
  }
</script>

<style lang="scss" scoped>
  .outer-layout {
    min-height: 100vh;
    background: url(~@/assets/images/login/login-bg.jpg) no-repeat fixed center;
    background-size: cover;

    .logo {
      padding-top: 60px;
      text-align: center;
      font-size: 32px;
      color: #fff;
    }

    .page {
      width: 440px;
      margin: 0 auto;
      margin-top: 60px;
    }

    .theme-picker {
      display: none;
    }
  }
</style>

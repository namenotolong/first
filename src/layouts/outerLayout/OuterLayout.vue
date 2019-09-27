<template>
  <div class="outer-layout">
    <div class="logo">
      <svg-icon icon-name="logo"></svg-icon>
      <span>后台管理系统</span>
    </div>

    <div class="page">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {

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
      width: 500px;
      margin: 0 auto;
      margin-top: 60px;
    }
  }
</style>

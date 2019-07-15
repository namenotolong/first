<template>
  <div class="header">
    <div class="header__logo" @click="toHome">
      <i class="iconfont icon-system"></i>
      <span>后台管理系统</span>
    </div>

    <i class="iconfont icon-menu" @click="changeCollapse"></i>

    <div class="header__menu">
      <full-screen></full-screen>

      <theme-picker></theme-picker>

      <el-dropdown @command="handleCommand">
        <img class="header__menu__portrait" :src="avatar" alt="">
        <el-dropdown-menu slot="dropdown">
          <router-link to="/mine">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>

</template>


<script>
  import bus from "@/utils/bus.js";
  import FullScreen from "@/components/FullScreen/FullScreen.vue";
  import ThemePicker from "@/components/ThemePicker/ThemePicker.vue";
  import { getUserInfo } from "@/api/account.js";

  export default {
    components: {
      FullScreen,
      ThemePicker
    },
    data() {
      return {
        isCollapse: false,
        avatar: ""
      }
    },
    created() {
      this.getAvatar();
    },
    methods: {
      toHome() {
        this.$router.push('/dashboard')
      },
      changeCollapse() {
        this.isCollapse = !this.isCollapse
        bus.$emit('collapse', this.isCollapse)
      },
      handleCommand(command) {
        if (command === 'logout') {
          this.$store.dispatch("logout").then(() => {
            this.$router.push('/login');
          })
        }
      },
      getAvatar() {
        getUserInfo({
          username: sessionStorage.getItem("userId")
        }).then(res => {
          this.avatar = res.data.userInfo.avatar;
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    height: 60px;
    line-height: 60px;
    padding-right: 30px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);

    .header__logo {
      display: inline-block;
      width: 220px;
      background-color: #545c64;
      font-weight: normal;
      font-size: 24px;
      color: #fff;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #434a50;
      }
    }

    .icon-system {
      font-size: 24px;
      margin-right: 10px;
    }

    .icon-menu {
      color: #fff;
      font-size: 20px;
      margin-left: 16px;
      cursor: pointer;

      &:hover {
        color: #4a4a4a;
      }
    }

    .el-color-picker {
      transform: translate(-10px, -4px);
    }

    .header__menu {
      float: right;
      height: 40px;
      padding: 10px;

      .el-dropdown {
        height: 40px;
      }

      .header__menu__portrait {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div class="header-bar">
    <i class="header-bar__collapse" :class="sideCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleCollapse"></i>
    <div class="header-bar__menu">
      <full-screen />
      <theme-picker />
      <el-dropdown @command="handleCommand">
        <img class="avatar" :src="avatar" alt />
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
  import FullScreen from '@/components/fullScreen';
  import ThemePicker from '@/components/themePicker';
  import api from '@/api';
  import { resetRouter } from '@/router';

  export default {
    components: {
      FullScreen,
      ThemePicker
    },
    data() {
      return {
        avatar: ''
      };
    },
    computed: {
      sideCollapse() {
        return this.$store.getters.sideCollapse;
      }
    },
    created() {
      this.getAvatar();
    },
    methods: {
      //折叠侧边栏
      handleCollapse() {
        this.$store.commit('SET_SIDE_COLLAPSE', !this.sideCollapse);
      },
      // 退出登录
      handleCommand(command) {
        if (command === 'logout') {
          this.$store.dispatch('logout').then(() => {
            resetRouter();
            sessionStorage.clear();
            this.$router.replace('/account/login');
          });
        }
      },
      getAvatar() {
        api.account.getUserInfo({
          username: sessionStorage.getItem('userId')
        }).then(res => {
          this.avatar = res.data.userInfo.avatar;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header-bar {
    height: 60px;
    line-height: 60px;
    padding-right: 30px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
    background-color: var(--theme);

    .header-bar__collapse {
      color: #fff;
      font-size: 24px;
      margin-left: 16px;
      cursor: pointer;

      &:hover {
        color: $auxiliary-text-color;
      }
    }

    .el-color-picker {
      transform: translate(-10px, -4px);
    }

    .header-bar__menu {
      float: right;
      height: 40px;
      padding: 10px;

      .el-dropdown {
        height: 40px;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
</style>

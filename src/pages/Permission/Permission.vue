<template>
  <div>
    <p>指令权限通过自定义指令来进行DOM级的控制，DOM不渲染，那么需要通过该DOM元素进行的一系列操作就无法进行。</p>
    <p>比如某个信息页面，员工可以查看，领导也可以查看，但是领导还可以审核，那么只需要在这个审核按钮标签上设置指令v-permission="['leader'],就可以只对领导显示。</p>
    <br>
    <div>
      当前角色为：
      <span v-for="(role,index) in roles" :key="role">
        {{codeMng.getNameById('role',role)}}
        <span v-if="index < roles.length-1">、</span>
      </span>
    </div>
    <br />

    <span>点击设置角色：</span>
    <el-radio-group v-model="currentRoles" @change="handleChange">
      <el-radio-button :label="['admin']">管理员</el-radio-button>
      <el-radio-button :label="['editor']">编辑</el-radio-button>
      <el-radio-button :label="['guest']">游客</el-radio-button>
    </el-radio-group>

    <div :key="key">
      <br />
      <p v-permission="['admin']">
        只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到。
      </p>
      <p v-permission="['guest','editor']">
        游客和编辑都可以看到，游客和编辑都可以看到，游客和编辑都可以看到，游客和编辑都可以看到，游客和编辑都可以看到，游客和编辑都可以看到。
      </p>
    </div>
    <br />
    <br />
    <br />
    <p>路由权限通过router.addRoutes动态注册路由实现</p>
    <p>查看路由权限效果，可以使用账号:admin，以管理员身份登录；账号：guest，以游客身份登录；账号：editor，以编辑身份登录。</p>

  </div>
</template>

<script>
  import codeMng from '@/assets/codeMng';

  export default {
    data() {
      return {
        codeMng,
        key: 1
      };
    },
    computed: {
      roles() {
        return this.$store.state.account.roles;
      },
      currentRoles: {
        get() {
          return this.roles;
        },
        set(val) {
          this.$store.commit('SET_ROLES', val);
          this.key++; //重新渲染DOM
        }
      }
    },

    methods: {
      handleChange(val) {},

    }
  };
</script>

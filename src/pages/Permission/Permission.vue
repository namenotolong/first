<template>
    <div>
        <p>指令权限通过自定义指令来进行DOM级的控制，DOM不渲染，那么需要通过该元素进行的一系列操作当然也就无法进行。</p>
        <br>

        <div>当前角色为：{{role}}</div>
        <br>
        <span>点击切换角色：</span>
        <el-radio-group v-model="currentRole">
            <el-radio-button label="管理员"></el-radio-button>
            <el-radio-button label="其他人员"></el-radio-button>
        </el-radio-group>

        <div v-permission="['管理员']">只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，</div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                role: this.$store.state.sysUser.role,
                currentRole:"管理员"
            }
        },
        computed: {
            role() {

            }
        },
        created() {


        },
        methods: {
            setAdmin() {
                this.$store.commit("setRole", "管理员");
            }
        }
    }
</script>
<template>
    <div>
        <p>指令权限通过自定义指令来进行DOM级的控制，DOM不渲染，那么需要通过该DOM元素进行的一系列操作当然也就无法进行。</p>
        <br>

        <div>当前角色为：{{role}}</div>
        <br>

        <span>点击切换角色：</span>
        <el-radio-group v-model="currentRole" @change="handleChange">
            <el-radio-button label="管理员"></el-radio-button>
            <el-radio-button :label="defaultRole"></el-radio-button>
        </el-radio-group>

        <div :key="key">
            <br>
            <p v-permission="['管理员']">
                只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到，只有管理员才能看得到。
            </p>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                defaultRole: "",
                key: 1
            };
        },
        computed: {
            role() {
                return this.$store.state.account.role;
            },
            currentRole: {
                get() {
                    return this.role;
                },
                set(val) {
                    if (val == "管理员") {
                        this.$store.commit("setRole", "管理员");
                    } else {
                        this.$store.commit("setRole", this.defaultRole);
                    }
                    this.key++; //重新渲染DOM
                }
            }
        },
        created() {
            this.defaultRole = this.role;
            console.log(this.role);
        },
        methods: {
            handleChange(val) {}
        }
    };
</script>

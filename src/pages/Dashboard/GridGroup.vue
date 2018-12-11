<template>
    <el-row :gutter="30">
        <el-col :lg="6" :sm="12" v-for="grid in grids" :key="grid.name">
            <div class="grid clearfix" :class="grid.gridBackground" @click="handleChart(grid.name)">
                <i class="iconfont grid-icon" :class="grid.icon"></i>
                <div class=" grid-right fr">
                    <p class="grid-name" v-text="grid.name"></p>
                    <p class="grid-value" v-text="grid.value"></p>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                grids: [{
                    gridBackground: "grid--red",
                    icon: "icon-visite",
                    name: "访问量",
                    value: 23230,
                }, {
                    gridBackground: "grid--blue",
                    icon: "icon-user",
                    name: "用户数量",
                    value: 1092,
                }, {
                    gridBackground: "grid--green",
                    icon: "icon-goods",
                    name: "商品数量",
                    value: 2714,
                }, {
                    gridBackground: "grid--yellow",
                    icon: "icon-comment",
                    name: "评论数量",
                    value: 261,
                }]
            }
        },
        methods: {
            handleChart(name) {
                this.$_bus.$emit("changeData", name);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .grid {
        position: relative;
        margin-bottom: 24px;
        color: #fff;
        box-shadow: 0px 0px 10px rgba(100, 100, 100, .5);
        cursor: pointer;

        &--green {
            background-color: #06d6a0;
        }

        &--yellow {
            background-color: #ffd166;
        }

        &--blue {
            background-color: #06aed5;
        }

        &--red {
            background-color: #ef476f;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0px;
            height: 100%;
            width: 100px;
            background-color: rgba(0, 0, 0, 0.05);
            -webkit-transition: all 0.95s;
            transition: width 0.5s;
        }

        &:hover::before {
            width: 100%;
            box-sizing: border-box;
        }

        .grid-icon {
            display: inline-block;
            font-size: 48px;
            width: 100px;
            text-align: center;
            line-height: 108px;
        }

        .grid-right {
            padding: 16px;
            p{
                color: #fff!important;
            }
            .grid-name {
                font-size: 20px;
                margin-bottom: 10px;
            }

            .grid-value {
                font-size: 30px;
            }
        }

    }
</style>